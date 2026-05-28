#!/usr/bin/env bash
set -euo pipefail

BASE="infrastructure/phases/stage-17-paper-trading-validation"

ACTIVE_FILE="${BASE}/runtime/state/active-session.id"

if [ ! -f "${ACTIVE_FILE}" ]; then
  echo "[FAIL] No active session"
  exit 1
fi

SESSION_ID=$(cat "${ACTIVE_FILE}")

STATE_DIR="${BASE}/runtime/paper-session/${SESSION_ID}"

echo "======================================================"
echo "PAPER SESSION RECOVERY"
echo "======================================================"

cat > "${STATE_DIR}/resume-state.json" <<INNER_EOF
{
  "session_id": "${SESSION_ID}",
  "status": "running",
  "resume_time": "$(date --iso-8601=seconds)"
}
INNER_EOF

echo "[PASS] Paper session resumed"
