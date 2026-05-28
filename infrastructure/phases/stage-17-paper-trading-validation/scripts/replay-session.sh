#!/usr/bin/env bash
set -euo pipefail

BASE="infrastructure/phases/stage-17-paper-trading-validation"

ACTIVE_FILE="${BASE}/runtime/state/active-session.id"

if [ ! -f "${ACTIVE_FILE}" ]; then
  echo "[FAIL] No active session"
  exit 1
fi

SESSION_ID=$(cat "${ACTIVE_FILE}")

SESSION_DIR="${BASE}/runtime/paper-session/${SESSION_ID}"

REPLAY_FILE="${SESSION_DIR}/replay/replay-window.log"

echo "======================================================"
echo "REPLAY GOVERNANCE"
echo "======================================================"

echo "[INFO] Session ID: ${SESSION_ID}"

echo "[INFO] Registering replay window..."

echo "replay_window_start=$(date --iso-8601=seconds)" >> "${REPLAY_FILE}"
echo "replay_source=KAFKA_CAPTURE" >> "${REPLAY_FILE}"
echo "replay_mode=DETERMINISTIC" >> "${REPLAY_FILE}"

echo "[PASS] Replay governance initialized"
