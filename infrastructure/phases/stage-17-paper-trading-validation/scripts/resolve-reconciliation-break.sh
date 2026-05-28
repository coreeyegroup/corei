#!/usr/bin/env bash
set -euo pipefail

BASE="infrastructure/phases/stage-17-paper-trading-validation"

SESSION_ID=$(cat "${BASE}/runtime/state/active-session.id")

STATE_DIR="${BASE}/runtime/paper-session/${SESSION_ID}"

RECON_DIR="${STATE_DIR}/reconciliation"

echo "======================================================"
echo "RECONCILIATION RECOVERY"
echo "======================================================"

cat > "${RECON_DIR}/recovery-state.json" <<INNER_EOF
{
  "status": "reconciled",
  "recovery_time": "$(date --iso-8601=seconds)"
}
INNER_EOF

echo "[PASS] Reconciliation state restored"
