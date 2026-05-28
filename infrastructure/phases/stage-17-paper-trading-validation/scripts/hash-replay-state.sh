#!/usr/bin/env bash
set -euo pipefail

BASE="infrastructure/phases/stage-17-paper-trading-validation"

SESSION_ID=$(cat "${BASE}/runtime/state/active-session.id")

STATE_DIR="${BASE}/runtime/paper-session/${SESSION_ID}"

REPLAY_STATE="${STATE_DIR}/replay-portfolio-state.json"

HASH_FILE="${STATE_DIR}/replay-state.sha256"

echo "======================================================"
echo "REPLAY STATE HASHING"
echo "======================================================"

sha256sum "${REPLAY_STATE}" | awk '{print $1}' > "${HASH_FILE}"

echo "[PASS] Replay state hash generated"

cat "${HASH_FILE}"
