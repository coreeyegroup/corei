#!/usr/bin/env bash

set -euo pipefail

STATE_DIR="state/security/vault"

INIT_FILE="${STATE_DIR}/init.json"

if [ ! -f "${INIT_FILE}" ]; then

    echo "[FAIL] Missing init.json"

    exit 1

fi

echo "====================================="
echo "VAULT UNSEAL"
echo "====================================="

KEY1=$(jq -r '.unseal_keys_b64[0]' "${INIT_FILE}")
KEY2=$(jq -r '.unseal_keys_b64[1]' "${INIT_FILE}")
KEY3=$(jq -r '.unseal_keys_b64[2]' "${INIT_FILE}")

kubectl exec -n vault vault-0 -- \
vault operator unseal "${KEY1}"

kubectl exec -n vault vault-0 -- \
vault operator unseal "${KEY2}"

kubectl exec -n vault vault-0 -- \
vault operator unseal "${KEY3}"

echo
echo "[PASS] Unseal sequence completed"
