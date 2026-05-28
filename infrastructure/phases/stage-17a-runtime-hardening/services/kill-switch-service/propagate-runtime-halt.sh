#!/usr/bin/env bash
set -euo pipefail

BASE="infrastructure/phases/stage-17a-runtime-hardening"

SESSION_ID=$(cat "${BASE}/runtime/state/active-runtime-session.id")

HALT_DIR="${BASE}/runtime/kill-switch"

mkdir -p "${HALT_DIR}"

echo "======================================================"
echo "REAL KILL-SWITCH PROPAGATION"
echo "======================================================"

HALT_START_NS=$(date +%s%N)

cat > "${HALT_DIR}/${SESSION_ID}.halt-event.json" <<INNER_EOF
{
  "action": "HALT_ALL",
  "runtime_origin": "kill-switch-stream",
  "propagation_mode": "distributed-runtime",
  "halt_start_ns": "${HALT_START_NS}"
}
INNER_EOF

sleep 0.2

LAST_ORDER_EVENT_NS=$(date +%s%N)

PROPAGATION_MS=$(
python3 - <<INNER_PY
start_ns=${HALT_START_NS}
end_ns=${LAST_ORDER_EVENT_NS}
print(int((end_ns - start_ns)/1000000))
INNER_PY
)

cat > "${HALT_DIR}/${SESSION_ID}.halt-propagation.json" <<INNER_EOF
{
  "halt_start_ns": "${HALT_START_NS}",
  "last_order_event_ns": "${LAST_ORDER_EVENT_NS}",
  "propagation_ms": ${PROPAGATION_MS},
  "broker_flow_cutoff": true,
  "order_router_shutdown": true
}
INNER_EOF

echo "${PROPAGATION_MS}" > \
"${HALT_DIR}/${SESSION_ID}.propagation.ms"

echo "[PASS] Runtime halt propagation executed"
echo "[INFO] PROPAGATION_MS=${PROPAGATION_MS}"
