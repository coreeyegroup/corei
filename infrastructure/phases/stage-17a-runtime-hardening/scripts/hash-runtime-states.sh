#!/usr/bin/env bash
set -euo pipefail

BASE="infrastructure/phases/stage-17a-runtime-hardening"

SESSION_ID=$(cat "${BASE}/runtime/state/active-runtime-session.id")

LIVE_FILE="${BASE}/runtime/live-state/${SESSION_ID}.live.json"
REPLAY_FILE="${BASE}/runtime/replay-state/${SESSION_ID}.replay.json"

RESULT_DIR="${BASE}/runtime/replay-results"

mkdir -p "${RESULT_DIR}"

echo "======================================================"
echo "BITWISE REPLAY CERTIFICATION"
echo "======================================================"

LIVE_HASH=$(sha256sum "${LIVE_FILE}" | awk '{print $1}')
REPLAY_HASH=$(sha256sum "${REPLAY_FILE}" | awk '{print $1}')

cat > "${RESULT_DIR}/${SESSION_ID}.hashes" <<INNER_EOF
LIVE_HASH=${LIVE_HASH}
REPLAY_HASH=${REPLAY_HASH}
INNER_EOF

echo "[PASS] Runtime replay hashes generated"
echo "[INFO] LIVE_HASH=${LIVE_HASH}"
echo "[INFO] REPLAY_HASH=${REPLAY_HASH}"
