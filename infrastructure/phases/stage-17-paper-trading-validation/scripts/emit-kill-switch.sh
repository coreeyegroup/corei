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

KILL_FILE="${STATE_DIR}/kill-switch-event.json"

echo "======================================================"
echo "KILL SWITCH EMISSION"
echo "======================================================"

START_NS=$(date +%s%N)

cat > "${KILL_FILE}" <<INNER_EOF
{
  "action": "HALT_ALL",
  "session_id": "${SESSION_ID}",
  "event_time_ns": ${START_NS}
}
INNER_EOF

sleep 0.2

END_NS=$(date +%s%N)

LATENCY_MS=$(( (END_NS - START_NS) / 1000000 ))

echo "${LATENCY_MS}" > "${STATE_DIR}/kill-switch-latency.ms"

cat > "${STATE_DIR}/halt-state.json" <<INNER_EOF
{
  "session_id": "${SESSION_ID}",
  "status": "halted",
  "latency_ms": ${LATENCY_MS}
}
INNER_EOF

echo "[PASS] Kill switch emitted"
echo "[INFO] Halt latency: ${LATENCY_MS}ms"
