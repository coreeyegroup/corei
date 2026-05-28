#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

BACKUP_DIR="${ROOT_DIR}/state/pre-recovery/postgres"

echo "========================================="
echo "VERIFY POSTGRES BACKUP"
echo "========================================="

LATEST_BACKUP="$(find "${BACKUP_DIR}" -type f -name '*.sql' | sort | tail -n 1)"

if [[ -z "${LATEST_BACKUP}" ]]; then
  echo "[FAIL] No PostgreSQL backup artifact found"
  exit 1
fi

echo "[PASS] PostgreSQL backup artifact located"

echo "${LATEST_BACKUP}"

echo "========================================="
