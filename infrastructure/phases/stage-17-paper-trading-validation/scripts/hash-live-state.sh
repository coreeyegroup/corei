#!/usr/bin/env bash
set -euo pipefail

BASE="infrastructure/phases/stage-17-paper-trading-validation"

SESSION_ID=$(cat "${BASE}/runtime/state/active-session.id")

STATE_DIR="${BASE}/runtime/paper-session/${SESSION_ID}"

LIVE_STATE="${STATE_DIR}/live-portfolio-state.json"

HASH_FILE="${STATE_DIR}/live-state.sha256"

echo "======================================================"
echo "LIVE STATE HASHING"
echo "======================================================"

sha256sum "${LIVE_STATE}" | awk '{print $1}' > "${HASH_FILE}"

echo "[PASS] Live state hash generated"

cat "${HASH_FILE}"
