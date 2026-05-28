#!/usr/bin/env bash

set -euo pipefail

echo "========================================="
echo "RESTORE EMS"
echo "========================================="

echo "[Reconnect-Test] Restoring EMS deployment"

kubectl scale deployment ems \
  -n trading-infra \
  --replicas=1

echo "[Reconnect-Test] Waiting for EMS rollout"

kubectl rollout status deployment/ems \
  -n trading-infra \
  --timeout=300s

echo "[Reconnect-Test] EMS restoration complete"

echo "========================================="
