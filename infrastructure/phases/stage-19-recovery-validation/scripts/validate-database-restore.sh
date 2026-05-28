#!/usr/bin/env bash

set -euo pipefail

echo "========================================="
echo "VALIDATE DATABASE RESTORE"
echo "========================================="

echo "[Validate] Checking TimescaleDB deployment"

kubectl rollout status deployment/timescaledb \
  -n database \
  --timeout=120s

echo "[Validate] Checking database pod"

kubectl get pods -n database

echo "[Validate] Waiting for PostgreSQL readiness"

MAX_RETRIES=30
RETRY_DELAY=5

for ((i=1; i<=MAX_RETRIES; i++)); do

  if kubectl exec -n database deployment/timescaledb -- \
      pg_isready -U coreeye >/dev/null 2>&1; then

    echo "[PASS] PostgreSQL readiness probe succeeded"

    break
  fi

  echo "[WAIT] PostgreSQL not ready yet (${i}/${MAX_RETRIES})"

  sleep "${RETRY_DELAY}"

  if [[ "${i}" -eq "${MAX_RETRIES}" ]]; then
    echo "[FAIL] PostgreSQL readiness probe failed"
    exit 1
  fi

done

echo "[PASS] Database restore validation successful"

echo "========================================="
