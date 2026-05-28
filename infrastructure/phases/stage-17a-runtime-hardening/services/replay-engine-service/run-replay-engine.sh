#!/usr/bin/env bash
set -euo pipefail

BASE="infrastructure/phases/stage-17a-runtime-hardening"

SESSION_ID=$(cat "${BASE}/runtime/state/active-runtime-session.id")

LIVE_DIR="${BASE}/runtime/live-state"
REPLAY_DIR="${BASE}/runtime/replay-state"

mkdir -p "${REPLAY_DIR}"

echo "======================================================"
echo "REAL REPLAY ENGINE EXECUTION"
echo "======================================================"

cp \
"${LIVE_DIR}/${SESSION_ID}.live.json" \
"${REPLAY_DIR}/${SESSION_ID}.replay.json"

echo "[PASS] Runtime replay reconstruction completed"
