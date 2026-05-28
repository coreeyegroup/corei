#!/usr/bin/env bash

set -euo pipefail

echo "========================================="
echo "STOP DATABASE"
echo "========================================="

echo "[DB-Restore] Scaling TimescaleDB deployment to 0"

kubectl scale deployment timescaledb \
  -n database \
  --replicas=0

echo "[DB-Restore] Waiting for database shutdown"

sleep 15

echo "[DB-Restore] Database shutdown complete"

echo "========================================="
