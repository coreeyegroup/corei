#!/bin/bash

set -e

TIMESTAMP=$(date +%Y%m%d-%H%M%S)

BACKUP_DIR=~/corei/infrastructure/backups/timescaledb

mkdir -p "${BACKUP_DIR}"

echo "========================================="
echo "TIMESCALEDB BACKUP"
echo "========================================="

kubectl exec -n storage timescaledb-0 -- \
pg_dump -U postgres marketdb \
> "${BACKUP_DIR}/marketdb-${TIMESTAMP}.sql"

echo "[PASS] TimescaleDB backup completed"

ls -lh "${BACKUP_DIR}"
