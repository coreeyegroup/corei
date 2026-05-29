#!/usr/bin/env bash

set -euo pipefail

echo "====================================="
echo "STAGE-21D-D KAFKA SECRET GOVERNANCE"
echo "====================================="

bash scripts/security/vault/kafka/create-kafka-secrets.sh

bash scripts/security/vault/kafka/create-kafka-policy.sh

bash scripts/security/vault/kafka/create-kafka-role.sh

bash scripts/security/vault/kafka/validate-kafka-governance.sh

echo
echo "[PASS] Stage-21D-D completed"
