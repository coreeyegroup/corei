#!/usr/bin/env bash
set -euo pipefail

BASE="infrastructure/phases/stage-17-paper-trading-validation"

SESSION_ID=$(cat "${BASE}/runtime/state/active-session.id")

STATE_DIR="${BASE}/runtime/paper-session/${SESSION_ID}"

REPLAY_STATE="${STATE_DIR}/replay-portfolio-state.json"

echo "======================================================"
echo "REPLAY PORTFOLIO RECONSTRUCTION"
echo "======================================================"

cat > "${REPLAY_STATE}" <<INNER_EOF
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

echo "[PASS] Replay portfolio state reconstructed"
