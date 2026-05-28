#!/usr/bin/env bash

set -euo pipefail

echo "========================================="
echo "DESTROY MATERIALIZED STATE"
echo "========================================="

echo "[Recovery-Test-01] Scaling TimescaleDB deployment to 0"

kubectl scale deployment timescaledb \
  -n database \
  --replicas=0

echo "[Recovery-Test-01] Waiting for TimescaleDB shutdown"

kubectl wait \
  --for=delete pod \
  -l app=timescaledb \
  -n database \
  --timeout=120s || true

echo "[Recovery-Test-01] Materialized state shutdown complete"

echo "========================================="
