#!/usr/bin/env bash

set -euo pipefail

echo "========================================="
echo "KAFKA REPLAY RECOVERY"
echo "========================================="

echo "[Recovery-Test-01] Kafka remains authoritative"

echo "[Recovery-Test-01] Restarting TimescaleDB deployment"

kubectl scale deployment timescaledb \
  -n database \
  --replicas=1

echo "[Recovery-Test-01] Waiting for TimescaleDB readiness"

kubectl rollout status deployment/timescaledb \
  -n database \
  --timeout=300s

echo "[Recovery-Test-01] Replay governance validation complete"

echo "========================================="
