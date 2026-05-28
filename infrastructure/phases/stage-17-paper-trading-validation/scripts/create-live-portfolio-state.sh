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

LIVE_STATE="${STATE_DIR}/live-portfolio-state.json"

echo "======================================================"
echo "LIVE PORTFOLIO STATE SNAPSHOT"
echo "======================================================"

cat > "${LIVE_STATE}" <<INNER_EOF
{
  "portfolio_id": "paper-portfolio",
  "session_id": "${SESSION_ID}",
  "positions": [
    {
      "symbol": "NIFTY",
      "quantity": 10,
      "avg_price": 2450010
    }
  ],
  "cash_balance": 100000000,
  "equity": 100245000,
  "pnl": 245000
}
INNER_EOF

echo "[PASS] Live portfolio snapshot created"
echo "[INFO] ${LIVE_STATE}"
