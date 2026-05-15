#!/usr/bin/env bash

set -euo pipefail

echo "========================================="
echo "TIMESCALEDB MIGRATION EXECUTION"
echo "========================================="

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/../../.." && pwd)"

MIGRATIONS_DIR="${ROOT_DIR}/infrastructure/migrations/timescaledb"

for file in $(ls "${MIGRATIONS_DIR}"/*.sql | sort); do
    echo "[INFO] Applying migration: $(basename "$file")"

    kubectl exec -i timescaledb-0 -n storage -- \
        psql -U postgres -d marketdb < "$file"

    echo "[PASS] Applied: $(basename "$file")"
done

echo "========================================="
echo "[PASS] TimescaleDB migrations complete"
echo "========================================="
