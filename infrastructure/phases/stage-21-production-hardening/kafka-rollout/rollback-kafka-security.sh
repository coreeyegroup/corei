#!/usr/bin/env bash

set -euo pipefail

echo "====================================="
echo "KAFKA SECURITY ROLLBACK"
echo "====================================="

kubectl apply \
-f state/security/kafka/recovery/kafka-statefulset-pre-sasl.yaml

kubectl rollout status \
statefulset/kafka \
-n kafka

echo
echo "[PASS] Rollback completed"
