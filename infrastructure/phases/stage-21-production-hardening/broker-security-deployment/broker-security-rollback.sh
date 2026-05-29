#!/usr/bin/env bash

set -euo pipefail

echo "====================================="
echo "BROKER SECURITY ROLLBACK"
echo "====================================="

kubectl apply \
-f state/security/kafka/recovery/kafka-statefulset-pre-sasl.yaml

echo
echo "[PASS] Rollback manifest applied"

kubectl rollout status \
statefulset/kafka \
-n kafka

echo
echo "[PASS] Rollback completed"
