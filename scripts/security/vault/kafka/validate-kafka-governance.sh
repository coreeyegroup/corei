#!/usr/bin/env bash

set -euo pipefail

ROOT_TOKEN=$(jq -r '.root_token' \
state/security/vault/init.json)

echo "====================================="
echo "KAFKA GOVERNANCE VALIDATION"
echo "====================================="

kubectl exec -n vault vault-0 -- sh -c "
export VAULT_TOKEN=${ROOT_TOKEN}
vault kv get secret/kafka/core-platform
"

kubectl exec -n vault vault-0 -- sh -c "
export VAULT_TOKEN=${ROOT_TOKEN}
vault policy read core-platform-kafka
"

echo
echo "[PASS] Kafka governance validation passed"
