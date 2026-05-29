#!/usr/bin/env bash

set -euo pipefail

STATE_DIR="state/security/vault"

mkdir -p "${STATE_DIR}"

echo "====================================="
echo "VAULT INITIALIZATION"
echo "====================================="

STATUS_JSON=$(kubectl exec -n vault vault-0 -- \
vault status -format=json 2>/dev/null || true)

INITIALIZED=$(echo "${STATUS_JSON}" | jq -r '.initialized // false')

if [ "${INITIALIZED}" = "true" ]; then

    echo "[INFO] Vault already initialized"

    exit 0

fi

kubectl exec -n vault vault-0 -- \
vault operator init \
-key-shares=5 \
-key-threshold=3 \
-format=json \
> "${STATE_DIR}/init.json"

chmod 600 "${STATE_DIR}/init.json"

echo
echo "[PASS] Vault initialized"
echo "[PASS] Initialization state written:"
echo "${STATE_DIR}/init.json"
