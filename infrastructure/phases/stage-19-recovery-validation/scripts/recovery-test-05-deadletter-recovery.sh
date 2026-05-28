#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

LOG_FILE="${ROOT_DIR}/logs/recovery-test-05.log"

exec > >(tee -a "${LOG_FILE}") 2>&1

echo "=================================================="
echo "STAGE-19 RECOVERY TEST 05 — DEADLETTER RECOVERY"
echo "=================================================="

echo "[STEP-1] GENERATE MALFORMED EVENT"

bash "${ROOT_DIR}/scripts/generate-malformed-event.sh"

echo "[STEP-2] ROUTE EVENT TO DLQ"

bash "${ROOT_DIR}/scripts/simulate-deadletter-routing.sh"

echo "[STEP-3] CLASSIFY EVENT"

bash "${ROOT_DIR}/scripts/classify-deadletter-event.sh"

echo "[STEP-4] SIMULATE EVENT RECOVERY"

bash "${ROOT_DIR}/scripts/simulate-event-recovery.sh"

echo "[STEP-5] ESCALATE UNRECOVERABLE EVENTS"

bash "${ROOT_DIR}/scripts/escalate-unrecoverable-event.sh"

echo "[STEP-6] VALIDATE DLQ GOVERNANCE"

bash "${ROOT_DIR}/scripts/validate-deadletter-governance.sh"

echo "=================================================="
echo "RECOVERY TEST 05 COMPLETE"
echo "=================================================="
