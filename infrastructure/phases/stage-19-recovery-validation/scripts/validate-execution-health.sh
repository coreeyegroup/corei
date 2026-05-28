#!/usr/bin/env bash

set -euo pipefail

echo "========================================="
echo "VALIDATE EXECUTION HEALTH"
echo "========================================="

echo "[Execution] Checking EMS rollout"

kubectl rollout status deployment/ems \
  -n trading-infra \
  --timeout=120s

echo "[Execution] Checking broker adapter rollout"

kubectl rollout status deployment/broker-adapter-service \
  -n trading-infra \
  --timeout=120s

echo "[Execution] Checking smart-order-router rollout"

kubectl rollout status deployment/smart-order-router \
  -n execution \
  --timeout=120s

echo "[PASS] Execution recovery validation successful"

echo "========================================="
