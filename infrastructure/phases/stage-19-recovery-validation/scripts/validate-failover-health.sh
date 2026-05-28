#!/usr/bin/env bash

set -euo pipefail

echo "========================================="
echo "VALIDATE FAILOVER HEALTH"
echo "========================================="

echo "[Failover] Checking EMS rollout"

kubectl rollout status deployment/ems \
  -n trading-infra \
  --timeout=120s

echo "[Failover] Checking OMS rollout"

kubectl rollout status deployment/oms \
  -n trading-infra \
  --timeout=120s

echo "[Failover] Checking smart-order-router rollout"

kubectl rollout status deployment/smart-order-router \
  -n execution \
  --timeout=120s

echo "[PASS] Failover health validation successful"

echo "========================================="
