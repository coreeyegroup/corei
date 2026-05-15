#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/../../.." && pwd)"

echo "=================================================="
echo "STAGE-08 STORAGE FOUNDATION"
echo "PHASE-02 STORAGE SUBSTRATE FOUNDATION"
echo "=================================================="

echo "[INFO] Creating storage namespace..."

kubectl apply -f "${ROOT_DIR}/infrastructure/kubernetes/storage/namespace.yaml"

echo "[INFO] Creating bootstrap secrets..."

kubectl apply -f "${ROOT_DIR}/infrastructure/kubernetes/storage/postgres-secret.yaml"

kubectl apply -f "${ROOT_DIR}/infrastructure/kubernetes/storage/timescaledb-secret.yaml"

echo "[INFO] Deploying PostgreSQL..."
bash "${ROOT_DIR}/infrastructure/components/postgres/install.sh"

echo "[INFO] Deploying TimescaleDB..."
bash "${ROOT_DIR}/infrastructure/components/timescaledb/install.sh"

echo "[INFO] Deploying Redis..."
bash "${ROOT_DIR}/infrastructure/components/redis/install.sh"

echo "[INFO] Deploying PgBouncer..."
bash "${ROOT_DIR}/infrastructure/components/pgbouncer/install.sh"

echo "=================================================="
echo "[PASS] Stage-08 storage substrate foundation complete"
echo "=================================================="
