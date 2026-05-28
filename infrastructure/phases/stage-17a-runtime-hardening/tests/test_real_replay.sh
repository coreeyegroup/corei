#!/usr/bin/env bash
set -euo pipefail

BASE="infrastructure/phases/stage-17a-runtime-hardening"

SESSION_ID=$(cat "${BASE}/runtime/state/active-runtime-session.id")

RESULT_FILE="${BASE}/runtime/replay-results/${SESSION_ID}.hashes"

REPORT_FILE="${BASE}/reports/real-replay-validation.txt"

echo "======================================================"
echo "REAL REPLAY ENGINE VALIDATION"
echo "======================================================"

source "${RESULT_FILE}"

echo "LIVE_HASH=${LIVE_HASH}" > "${REPORT_FILE}"
echo "REPLAY_HASH=${REPLAY_HASH}" >> "${REPORT_FILE}"

if [ "${LIVE_HASH}" = "${REPLAY_HASH}" ]; then

    echo "RESULT=PASS" >> "${REPORT_FILE}"

    echo "[PASS] Bitwise replay equivalence validated"

    exit 0

else

    echo "RESULT=FAIL" >> "${REPORT_FILE}"

    echo "[FAIL] Replay determinism violation"

    exit 1
fi
