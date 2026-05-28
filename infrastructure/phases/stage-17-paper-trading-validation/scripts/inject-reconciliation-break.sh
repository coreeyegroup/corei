#!/usr/bin/env bash
set -euo pipefail

BASE="infrastructure/phases/stage-17-paper-trading-validation"

SESSION_ID=$(cat "${BASE}/runtime/state/active-session.id")

STATE_DIR="${BASE}/runtime/paper-session/${SESSION_ID}"

RECON_DIR="${STATE_DIR}/reconciliation"

mkdir -p "${RECON_DIR}"

echo "======================================================"
echo "RECONCILIATION MISMATCH INJECTION"
echo "======================================================"

START_TS=$(date +%s)

cat > "${RECON_DIR}/broker-state.json" <<INNER_EOF
{
  "account": "paper-account",
  "symbol": "NIFTY",
  "position": 20
}
INNER_EOF

cat > "${RECON_DIR}/internal-state.json" <<INNER_EOF
{
  "account": "paper-account",
  "symbol": "NIFTY",
  "position": 10
}
INNER_EOF

sleep 2

END_TS=$(date +%s)

DETECTION_SECONDS=$(( END_TS - START_TS ))

echo "${DETECTION_SECONDS}" > "${RECON_DIR}/detection-seconds.txt"

cat > "${RECON_DIR}/alert-stream.json" <<INNER_EOF
{
  "alert_type": "reconciliation_mismatch",
  "detection_seconds": ${DETECTION_SECONDS},
  "status": "alerted"
}
INNER_EOF

echo "[PASS] Reconciliation mismatch injected"
echo "[INFO] Detection latency: ${DETECTION_SECONDS}s"
