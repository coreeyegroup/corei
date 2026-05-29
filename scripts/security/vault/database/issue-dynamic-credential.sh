#!/usr/bin/env bash

set -euo pipefail

ROOT_TOKEN=$(jq -r '.root_token' \
state/security/vault/init.json)

mkdir -p state/security/vault

kubectl exec -n vault vault-0 -- sh -c "
export VAULT_TOKEN=${ROOT_TOKEN}
vault read -format=json \
database/creds/core-platform
" \
> state/security/vault/latest-lease.json

echo
echo "[PASS] Dynamic credential issued"
