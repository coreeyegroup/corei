#!/usr/bin/env bash

set -euo pipefail

echo "========================================="
echo "POSTGRESQL MIGRATION EXECUTION"
echo "========================================="

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/../../.." && pwd)"

MIGRATIONS_DIR="${ROOT_DIR}/infrastructure/migrations/postgres"

for file in $(ls "${MIGRATIONS_DIR}"/*.sql | sort); do
    echo "[INFO] Applying migration: $(basename "$file")"

    kubectl exec -i postgres-0 -n storage -- \
        psql -U postgres -d coredb < "$file"

    echo "[PASS] Applied: $(basename "$file")"
done

echo "========================================="
echo "[PASS] PostgreSQL migrations complete"
echo "========================================="
