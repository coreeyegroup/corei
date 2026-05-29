#!/usr/bin/env bash

set -euo pipefail

ROOT_TOKEN=$(jq -r '.root_token' \
state/security/vault/init.json)

kubectl exec -n vault vault-0 -- sh -c "
cat > /tmp/core-platform-kafka.hcl <<POLICY
path \"secret/data/kafka/*\" {
  capabilities = [\"read\"]
}
POLICY

export VAULT_TOKEN=${ROOT_TOKEN}

vault policy write \
core-platform-kafka \
/tmp/core-platform-kafka.hcl
"

echo
echo "[PASS] Kafka policy created"
