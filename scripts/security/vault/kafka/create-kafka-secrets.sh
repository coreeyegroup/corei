#!/usr/bin/env bash

set -euo pipefail

ROOT_TOKEN=$(jq -r '.root_token' \
state/security/vault/init.json)

echo "====================================="
echo "KAFKA SECRET GOVERNANCE"
echo "====================================="

kubectl exec -n vault vault-0 -- sh -c "
export VAULT_TOKEN=${ROOT_TOKEN}

vault kv put secret/kafka/core-platform \
bootstrap_server='kafka.kafka.svc.cluster.local:9092' \
security_protocol='PLAINTEXT'
"

echo
echo "[PASS] Kafka secret path created"
