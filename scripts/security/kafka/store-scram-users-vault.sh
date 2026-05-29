#!/usr/bin/env bash

set -euo pipefail

ROOT_TOKEN=$(jq -r '.root_token' \
state/security/vault/init.json)

ADMIN_PASSWORD=$(cat \
state/security/kafka/users/kafka-admin.password)

SERVICE_PASSWORD=$(cat \
state/security/kafka/users/kafka-service.password)

kubectl exec -n vault vault-0 -- sh -c "
export VAULT_TOKEN=${ROOT_TOKEN}

vault kv put secret/kafka/admin \
username='kafka-admin' \
password='${ADMIN_PASSWORD}'
"

kubectl exec -n vault vault-0 -- sh -c "
export VAULT_TOKEN=${ROOT_TOKEN}

vault kv put secret/kafka/service \
username='kafka-service' \
password='${SERVICE_PASSWORD}'
"

echo
echo "[PASS] Vault storage completed"
