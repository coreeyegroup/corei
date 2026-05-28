#!/usr/bin/env bash

set -euo pipefail

echo "========================================="
echo "VALIDATE PLATFORM HEALTH"
echo "========================================="

echo "[Health] Checking TimescaleDB deployment"

kubectl rollout status deployment/timescaledb \
  -n database \
  --timeout=120s

echo "[Health] Checking pod status"

kubectl get pods -n database

echo "[PASS] Platform health validation successful"

echo "========================================="
