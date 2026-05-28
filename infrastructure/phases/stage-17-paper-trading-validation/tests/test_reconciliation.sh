#!/usr/bin/env bash
set -euo pipefail

BASE="infrastructure/phases/stage-17-paper-trading-validation"

SESSION_ID=$(cat "${BASE}/runtime/state/active-session.id")

STATE_DIR="${BASE}/runtime/paper-session/${SESSION_ID}"

RECON_DIR="${STATE_DIR}/reconciliation"

REPORT_FILE="${BASE}/reports/reconciliation-report.txt"

echo "======================================================"
echo "TEST-6 RECONCILIATION DETECTION VALIDATION"
echo "======================================================"

if [ ! -f "${RECON_DIR}/detection-seconds.txt" ]; then
  echo "[FAIL] Detection evidence missing"
  exit 1
fi

DETECTION_SECONDS=$(cat "${RECON_DIR}/detection-seconds.txt")

echo "DETECTION_SECONDS=${DETECTION_SECONDS}" > "${REPORT_FILE}"

if [ "${DETECTION_SECONDS}" -lt 30 ]; then

    echo "RESULT=PASS" >> "${REPORT_FILE}"

    echo "[PASS] Reconciliation mismatch detected < 30s"

    exit 0

else

    echo "RESULT=FAIL" >> "${REPORT_FILE}"

    echo "[FAIL] Reconciliation detection exceeded threshold"

    exit 1
fi
