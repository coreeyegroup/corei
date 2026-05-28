#!/usr/bin/env bash

set -euo pipefail

echo "========================================="
echo "RESTORE PRIMARY BROKER"
echo "========================================="

echo "[Failover-Test] Restoring broker-adapter-service"

kubectl scale deployment broker-adapter-service \
  -n trading-infra \
  --replicas=1

echo "[Failover-Test] Waiting for broker adapter rollout"

kubectl rollout status deployment/broker-adapter-service \
  -n trading-infra \
  --timeout=300s

echo "[Failover-Test] Primary broker restored"

echo "========================================="
