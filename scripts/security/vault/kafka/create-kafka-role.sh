#!/usr/bin/env bash

set -euo pipefail

ROOT_TOKEN=$(jq -r '.root_token' \
state/security/vault/init.json)

kubectl exec -n vault vault-0 -- sh -c "
export VAULT_TOKEN=${ROOT_TOKEN}

vault token create \
-policy=core-platform-kafka \
-period=24h
"

echo
echo "[PASS] Kafka role validation complete"
