#!/usr/bin/env bash
set -euo pipefail

BASE="infrastructure/phases/stage-17-paper-trading-validation"

SESSION_ID=$(cat "${BASE}/runtime/state/active-session.id")

STATE_DIR="${BASE}/runtime/paper-session/${SESSION_ID}"

LIVE_HASH=$(cat "${STATE_DIR}/live-state.sha256")
REPLAY_HASH=$(cat "${STATE_DIR}/replay-state.sha256")

REPORT="${BASE}/reports/determinism-report.txt"

echo "======================================================"
echo "TEST-1 DETERMINISM VALIDATION"
echo "======================================================"

echo "LIVE_HASH=${LIVE_HASH}" > "${REPORT}"
echo "REPLAY_HASH=${REPLAY_HASH}" >> "${REPORT}"

if [ "${LIVE_HASH}" = "${REPLAY_HASH}" ]; then
    echo "[PASS] Replay determinism validated"

    echo "RESULT=PASS" >> "${REPORT}"

    exit 0
else
    echo "[FAIL] Replay determinism violation"

    echo "RESULT=FAIL" >> "${REPORT}"

    exit 1
fi
