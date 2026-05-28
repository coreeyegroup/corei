#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

LOG_FILE="${ROOT_DIR}/logs/recovery-test-03.log"

exec > >(tee -a "${LOG_FILE}") 2>&1

BACKUP_TIMESTAMP="$(date +%s)"

echo "=================================================="
echo "STAGE-19 RECOVERY TEST 03 — DATABASE RESTORE"
echo "=================================================="

echo "[STEP-1] VERIFY DATABASE BACKUP"

bash "${ROOT_DIR}/scripts/verify-postgres-backup.sh"

echo "[STEP-2] STOP DATABASE"

bash "${ROOT_DIR}/scripts/stop-database.sh"

echo "[STEP-3] RESTORE DATABASE"

bash "${ROOT_DIR}/scripts/restore-database.sh"

echo "[STEP-4] VALIDATE DATABASE RESTORE"

bash "${ROOT_DIR}/scripts/validate-database-restore.sh"

echo "[STEP-5] MEASURE RPO"

bash "${ROOT_DIR}/scripts/measure-rpo.sh" \
  "${BACKUP_TIMESTAMP}"

echo "=================================================="
echo "RECOVERY TEST 03 COMPLETE"
echo "=================================================="
