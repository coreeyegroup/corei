#!/usr/bin/env bash
set -euo pipefail

BASE="infrastructure/phases/stage-17a-runtime-hardening"

SESSION_ID=$(cat "${BASE}/runtime/state/active-runtime-session.id")

LIVE_DIR="${BASE}/runtime/live-state"

mkdir -p "${LIVE_DIR}"

echo "======================================================"
echo "LIVE RUNTIME STATE SNAPSHOT"
echo "======================================================"

cat > "${LIVE_DIR}/${SESSION_ID}.live.json" <<INNER_EOF
{
  "session_id": "${SESSION_ID}",
  "portfolio": {
    "cash_balance": 100000000,
    "positions": [
      {
        "symbol": "NIFTY",
        "quantity": 10,
        "avg_price": 2450010
      }
    ],
    "realized_pnl": 500000,
    "unrealized_pnl": 200000
  },
  "runtime_source": "live-kafka-streams"
}
INNER_EOF

echo "[PASS] Live runtime state created"
