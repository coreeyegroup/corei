#!/usr/bin/env bash
set -euo pipefail

BACKUP_DIR="infrastructure/backups/stage-16"
TIMESTAMP=$(date +%Y%m%d-%H%M%S)

mkdir -p "${BACKUP_DIR}"

OUTPUT_FILE="${BACKUP_DIR}/backup-${TIMESTAMP}.txt"

{
  echo "STAGE-16 BACKUP RECORD"
  echo "TIMESTAMP=${TIMESTAMP}"

  echo
  echo "INCLUDED GOVERNANCE:"
  echo "- topology"
  echo "- manifests"
  echo "- lifecycle scripts"
  echo "- governance documents"

} > "${OUTPUT_FILE}"

echo "Backup record created:"
echo "${OUTPUT_FILE}"
