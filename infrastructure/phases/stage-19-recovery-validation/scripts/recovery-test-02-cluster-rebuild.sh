#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

LOG_FILE="${ROOT_DIR}/logs/recovery-test-02.log"

exec > >(tee -a "${LOG_FILE}") 2>&1

START_TIME="$(date +%s)"

echo "=================================================="
echo "STAGE-19 RECOVERY TEST 02 — DISASTER RECOVERY"
echo "=================================================="

echo "[STEP-1] CREATE DISASTER BACKUP"

bash "${ROOT_DIR}/scripts/create-disaster-backup.sh"

echo "[STEP-2] DESTROY PLATFORM WORKLOADS"

bash "${ROOT_DIR}/scripts/destroy-platform-workloads.sh"

echo "[STEP-3] RESTORE PLATFORM WORKLOADS"

bash "${ROOT_DIR}/scripts/restore-platform-workloads.sh"

echo "[STEP-4] VALIDATE PLATFORM HEALTH"

bash "${ROOT_DIR}/scripts/validate-platform-health.sh"

END_TIME="$(date +%s)"

echo "[STEP-5] MEASURE RTO"

bash "${ROOT_DIR}/scripts/measure-rto.sh" \
  "${START_TIME}" \
  "${END_TIME}"

echo "=================================================="
echo "RECOVERY TEST 02 COMPLETE"
echo "=================================================="
