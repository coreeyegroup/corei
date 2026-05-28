#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

OUTPUT_DIR="${ROOT_DIR}/state/pre-recovery/postgres"

mkdir -p "${OUTPUT_DIR}"

TIMESTAMP="$(date -u +%Y%m%dT%H%M%SZ)"

POSTGRES_NAMESPACE="database"
POSTGRES_DEPLOYMENT="timescaledb"

echo "[Snapshot] Capturing PostgreSQL/TimescaleDB state"

kubectl exec -n "${POSTGRES_NAMESPACE}" \
  deployment/"${POSTGRES_DEPLOYMENT}" -- \
  pg_dumpall -U coreeye \
  > "${OUTPUT_DIR}/postgres-${TIMESTAMP}.sql"

echo "[Snapshot] PostgreSQL snapshot captured"
