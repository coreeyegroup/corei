#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

LOG_FILE="${ROOT_DIR}/logs/recovery-test-04.log"

exec > >(tee -a "${LOG_FILE}") 2>&1

START_TIME="$(date +%s)"

echo "=================================================="
echo "STAGE-19 RECOVERY TEST 04 — BROKER RECONNECT"
echo "=================================================="

echo "[STEP-1] VALIDATE PRE-RECONNECT EXECUTION HEALTH"

bash "${ROOT_DIR}/scripts/validate-execution-health.sh"

echo "[STEP-2] DISCONNECT EMS"

bash "${ROOT_DIR}/scripts/disconnect-ems.sh"

echo "[STEP-3] RESTORE EMS"

bash "${ROOT_DIR}/scripts/restore-ems.sh"

echo "[STEP-4] VALIDATE OMS CONTINUITY"

bash "${ROOT_DIR}/scripts/validate-oms-continuity.sh"

echo "[STEP-5] VALIDATE EXECUTION HEALTH"

bash "${ROOT_DIR}/scripts/validate-execution-health.sh"

END_TIME="$(date +%s)"

echo "[STEP-6] MEASURE BROKER RECONNECT"

bash "${ROOT_DIR}/scripts/measure-broker-reconnect.sh" \
  "${START_TIME}" \
  "${END_TIME}"

echo "=================================================="
echo "RECOVERY TEST 04 COMPLETE"
echo "=================================================="
