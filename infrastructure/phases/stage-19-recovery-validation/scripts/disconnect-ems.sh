#!/usr/bin/env bash

set -euo pipefail

echo "========================================="
echo "EMS DISCONNECT SIMULATION"
echo "========================================="

echo "[Reconnect-Test] Scaling EMS deployment to 0"

kubectl scale deployment ems \
  -n trading-infra \
  --replicas=0

echo "[Reconnect-Test] Waiting for EMS shutdown"

sleep 10

echo "[Reconnect-Test] EMS disconnect simulation complete"

echo "========================================="
