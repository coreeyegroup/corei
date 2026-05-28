#!/usr/bin/env bash

set -euo pipefail

echo "========================================="
echo "RESTORE DATABASE"
echo "========================================="

echo "[DB-Restore] Restarting TimescaleDB deployment"

kubectl scale deployment timescaledb \
  -n database \
  --replicas=1

echo "[DB-Restore] Waiting for database readiness"

kubectl rollout status deployment/timescaledb \
  -n database \
  --timeout=300s

echo "[DB-Restore] Database restore simulation complete"

echo "========================================="
