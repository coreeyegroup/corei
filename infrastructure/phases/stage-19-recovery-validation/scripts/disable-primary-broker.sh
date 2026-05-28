#!/usr/bin/env bash

set -euo pipefail

echo "========================================="
echo "DISABLE PRIMARY BROKER"
echo "========================================="

echo "[Failover-Test] Scaling broker-adapter-service to 0"

kubectl scale deployment broker-adapter-service \
  -n trading-infra \
  --replicas=0

echo "[Failover-Test] Waiting for broker adapter shutdown"

sleep 10

echo "[Failover-Test] Primary broker disabled"

echo "========================================="
