#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

LOG_FILE="${ROOT_DIR}/logs/recovery-test-06.log"

exec > >(tee -a "${LOG_FILE}") 2>&1

START_TIME="$(date +%s)"

echo "=================================================="
echo "STAGE-19 RECOVERY TEST 06 — FAILOVER VALIDATION"
echo "=================================================="

echo "[STEP-1] VALIDATE FAILOVER HEALTH"

bash "${ROOT_DIR}/scripts/validate-failover-health.sh"

echo "[STEP-2] DISABLE PRIMARY BROKER"

bash "${ROOT_DIR}/scripts/disable-primary-broker.sh"

echo "[STEP-3] VALIDATE SMART ORDER ROUTER CONTINUITY"

bash "${ROOT_DIR}/scripts/validate-sor-continuity.sh"

echo "[STEP-4] RESTORE PRIMARY BROKER"

bash "${ROOT_DIR}/scripts/restore-primary-broker.sh"

echo "[STEP-5] VALIDATE FAILOVER HEALTH"

bash "${ROOT_DIR}/scripts/validate-failover-health.sh"

END_TIME="$(date +%s)"

echo "[STEP-6] MEASURE FAILOVER TIME"

bash "${ROOT_DIR}/scripts/measure-failover-time.sh" \
  "${START_TIME}" \
  "${END_TIME}"

echo "=================================================="
echo "RECOVERY TEST 06 COMPLETE"
echo "=================================================="
