#!/usr/bin/env bash
set -euo pipefail

BASE="infrastructure/phases/stage-17-paper-trading-validation"

SESSION_ID=$(cat "${BASE}/runtime/state/active-session.id")

STATE_DIR="${BASE}/runtime/paper-session/${SESSION_ID}"

LATENCY_FILE="${STATE_DIR}/kill-switch-latency.ms"

REPORT_FILE="${BASE}/reports/kill-switch-report.txt"

echo "======================================================"
echo "TEST-4 KILL SWITCH LATENCY VALIDATION"
echo "======================================================"

if [ ! -f "${LATENCY_FILE}" ]; then
  echo "[FAIL] Missing latency file"
  exit 1
fi

LATENCY=$(cat "${LATENCY_FILE}")

echo "LATENCY_MS=${LATENCY}" > "${REPORT_FILE}"

if [ "${LATENCY}" -lt 1000 ]; then

    echo "RESULT=PASS" >> "${REPORT_FILE}"

    echo "[PASS] Full halt < 1000ms"

    exit 0

else

    echo "RESULT=FAIL" >> "${REPORT_FILE}"

    echo "[FAIL] Halt latency exceeded threshold"

    exit 1
fi
