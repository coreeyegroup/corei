#!/usr/bin/env bash

set -euo pipefail

ROOT_TOKEN=$(jq -r '.root_token' \
state/security/vault/init.json)

LEASE_ID=$(jq -r '.lease_id' \
state/security/vault/latest-lease.json)

kubectl exec -n vault vault-0 -- sh -c "
export VAULT_TOKEN=${ROOT_TOKEN}
vault lease revoke ${LEASE_ID}
"

echo
echo "[PASS] Lease revoked"
