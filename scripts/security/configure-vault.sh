#!/usr/bin/env bash

set -euo pipefail

echo "========================================="
echo "Configuring Vault"
echo "========================================="

STATE_DIR="$HOME/corei/infrastructure/state/stage-06/vault"

mkdir -p "$STATE_DIR"

VAULT_POD=$(kubectl get pods -n vault \
-l app.kubernetes.io/name=vault \
-o jsonpath="{.items[0].metadata.name}")

echo
echo "Detected Vault pod:"
echo "$VAULT_POD"

STATUS_JSON=$(kubectl exec -n vault "$VAULT_POD" -- \
vault status -format=json 2>/dev/null || true)

INITIALIZED=$(echo "$STATUS_JSON" | jq -r '.initialized')

LATEST_INIT_FILE=$(find "$STATE_DIR" \
-name "vault-init-*.json" 2>/dev/null \
| sort | tail -n 1)

if [ "$INITIALIZED" != "true" ]; then

echo
echo "Vault not initialized."
echo "Starting cryptographic bootstrap..."

TIMESTAMP=$(date +%Y%m%d-%H%M%S)

INIT_FILE="$STATE_DIR/vault-init-$TIMESTAMP.json"

kubectl exec -n vault "$VAULT_POD" -- \
vault operator init -format=json \
> "$INIT_FILE"

if [ ! -f "$INIT_FILE" ]; then

echo
echo "ERROR: Vault init artifact missing."
exit 1

fi

echo
echo "Vault init artifact created:"
echo "$INIT_FILE"

UNSEAL_KEY_1=$(jq -r '.unseal_keys_b64[0]' "$INIT_FILE")
UNSEAL_KEY_2=$(jq -r '.unseal_keys_b64[1]' "$INIT_FILE")
UNSEAL_KEY_3=$(jq -r '.unseal_keys_b64[2]' "$INIT_FILE")

ROOT_TOKEN=$(jq -r '.root_token' "$INIT_FILE")

echo
echo "Unsealing Vault..."

kubectl exec -n vault "$VAULT_POD" -- \
vault operator unseal "$UNSEAL_KEY_1"

kubectl exec -n vault "$VAULT_POD" -- \
vault operator unseal "$UNSEAL_KEY_2"

kubectl exec -n vault "$VAULT_POD" -- \
vault operator unseal "$UNSEAL_KEY_3"

echo
echo "Verifying Vault status..."

kubectl exec -n vault "$VAULT_POD" -- \
vault status

echo
echo "Vault initialized and unsealed."

echo
echo "SAVE THIS FILE TO OFFLINE STORAGE:"
echo "$INIT_FILE"

else

echo
echo "Vault already initialized."

INIT_FILE="$LATEST_INIT_FILE"

if [ -z "$INIT_FILE" ]; then

echo
echo "ERROR: No persisted Vault init artifact found."
exit 1

fi

if [ ! -f "$INIT_FILE" ]; then

echo
echo "ERROR: Vault init artifact missing."
exit 1

fi

echo
echo "Using persisted init artifact:"
echo "$INIT_FILE"

ROOT_TOKEN=$(jq -r '.root_token' "$INIT_FILE")

UNSEAL_KEY_1=$(jq -r '.unseal_keys_b64[0]' "$INIT_FILE")
UNSEAL_KEY_2=$(jq -r '.unseal_keys_b64[1]' "$INIT_FILE")
UNSEAL_KEY_3=$(jq -r '.unseal_keys_b64[2]' "$INIT_FILE")

SEALED=$(kubectl exec -n vault "$VAULT_POD" -- \
vault status -format=json | jq -r '.sealed')

if [ "$SEALED" = "true" ]; then

echo
echo "Vault is sealed."
echo "Starting automated unseal..."

kubectl exec -n vault "$VAULT_POD" -- \
vault operator unseal "$UNSEAL_KEY_1"

kubectl exec -n vault "$VAULT_POD" -- \
vault operator unseal "$UNSEAL_KEY_2"

kubectl exec -n vault "$VAULT_POD" -- \
vault operator unseal "$UNSEAL_KEY_3"

fi

fi

echo
echo "Authenticating to Vault..."

kubectl exec -n vault "$VAULT_POD" -- \
vault login "$ROOT_TOKEN"

echo
echo "Enabling KV v2 secrets engine..."

kubectl exec -n vault "$VAULT_POD" -- \
vault secrets enable -path=secret kv-v2 || true

echo
echo "Enabling Kubernetes auth backend..."

kubectl exec -n vault "$VAULT_POD" -- \
vault auth enable kubernetes || true

echo
echo "Applying Vault policies..."

kubectl cp \
"$HOME/corei/infrastructure/components/vault/policies/trading-policy.hcl" \
vault/"$VAULT_POD":/tmp/trading-policy.hcl

kubectl exec -n vault "$VAULT_POD" -- \
vault policy write trading-policy \
/tmp/trading-policy.hcl

echo
echo "Verifying Vault operational status..."

kubectl exec -n vault "$VAULT_POD" -- \
vault status

echo
echo "Vault authority bootstrap completed successfully."
