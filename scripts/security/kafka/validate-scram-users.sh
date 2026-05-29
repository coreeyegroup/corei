#!/usr/bin/env bash

set -euo pipefail

echo "====================================="
echo "SCRAM USER VALIDATION"
echo "====================================="

kubectl exec -n kafka kafka-0 -- \
/opt/kafka/bin/kafka-configs.sh \
--bootstrap-server localhost:9092 \
--describe \
--entity-type users

echo
echo "[PASS] Validation complete"
