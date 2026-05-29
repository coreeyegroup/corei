#!/usr/bin/env bash

set -euo pipefail

kubectl apply \
-f state/security/kafka/recovery/kafka-config-pre-sasl.yaml

kubectl apply \
-f state/security/kafka/recovery/kafka-statefulset-pre-sasl.yaml

kubectl rollout restart statefulset kafka \
-n kafka

echo
echo "[PASS] Rollback executed"
