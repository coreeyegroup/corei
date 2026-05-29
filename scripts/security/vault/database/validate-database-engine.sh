#!/usr/bin/env bash

set -euo pipefail

ROOT_TOKEN=$(jq -r '.root_token' \
state/security/vault/init.json)

echo "====================================="
echo "DATABASE ENGINE VALIDATION"
echo "====================================="

kubectl exec -n vault vault-0 -- sh -c "
export VAULT_TOKEN=${ROOT_TOKEN}

vault read database/config/core-timescaledb
"

kubectl exec -n vault vault-0 -- sh -c "
export VAULT_TOKEN=${ROOT_TOKEN}

vault read database/roles/core-platform
"

echo
echo "[PASS] Database engine validation passed"
