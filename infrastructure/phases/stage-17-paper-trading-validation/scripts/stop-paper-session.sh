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

echo "======================================================"
echo "STAGE-17 PAPER SESSION STOP"
echo "======================================================"

echo "[INFO] Session ID: ${SESSION_ID}"

if [ ! -d "${SESSION_DIR}" ]; then
  echo "[FAIL] Missing session directory"
  exit 1
fi

echo "[INFO] Finalizing session state..."

cat > "${SESSION_DIR}/session-finalization.json" <<INNER_EOF
{
  "session_id": "${SESSION_ID}",
  "status": "completed",
  "end_time": "$(date --iso-8601=seconds)"
}
INNER_EOF

rm -f "${ACTIVE_FILE}"

echo "[PASS] Paper trading session finalized"

echo "======================================================"
echo "SESSION CLOSED"
echo "======================================================"
