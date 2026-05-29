#!/usr/bin/env bash

set -euo pipefail

ROOT_TOKEN=$(jq -r '.root_token' \
state/security/vault/init.json)

echo "====================================="
echo "ENABLE DATABASE ENGINE"
echo "====================================="

kubectl exec -n vault vault-0 -- sh -c "
export VAULT_TOKEN=${ROOT_TOKEN}

vault secrets list -format=json \
| jq -e 'has(\"database/\")' >/dev/null
" && {
    echo "[INFO] Database engine already enabled"
    exit 0
}

kubectl exec -n vault vault-0 -- sh -c "
export VAULT_TOKEN=${ROOT_TOKEN}
vault secrets enable database
"

echo
echo "[PASS] Database engine enabled"
