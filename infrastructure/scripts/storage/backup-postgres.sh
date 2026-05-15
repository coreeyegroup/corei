#!/bin/bash

set -e

TIMESTAMP=$(date +%Y%m%d-%H%M%S)

BACKUP_DIR=~/corei/infrastructure/backups/postgres

mkdir -p "${BACKUP_DIR}"

echo "========================================="
echo "POSTGRESQL BACKUP"
echo "========================================="

kubectl exec -n storage postgres-0 -- \
pg_dump -U postgres coredb \
> "${BACKUP_DIR}/coredb-${TIMESTAMP}.sql"

echo "[PASS] PostgreSQL backup completed"

ls -lh "${BACKUP_DIR}"
