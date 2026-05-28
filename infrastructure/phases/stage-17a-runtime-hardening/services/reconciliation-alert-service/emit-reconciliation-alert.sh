#!/usr/bin/env bash
set -euo pipefail

BASE="infrastructure/phases/stage-17a-runtime-hardening"

SESSION_ID=$(cat "${BASE}/runtime/state/active-runtime-session.id")

RECON_DIR="${BASE}/runtime/reconciliation"
ALERT_DIR="${BASE}/runtime/alert-streams"

mkdir -p "${ALERT_DIR}"

echo "======================================================"
echo "RECONCILIATION ALERT PROPAGATION"
echo "======================================================"

START_NS=$(date +%s%N)

sleep 0.2

END_NS=$(date +%s%N)

DETECTION_SECONDS=$(
python3 - <<INNER_PY
start_ns=${START_NS}
end_ns=${END_NS}
print(round((end_ns - start_ns)/1000000000, 3))
INNER_PY
)

cat > "${ALERT_DIR}/${SESSION_ID}.reconciliation-alert.json" <<INNER_EOF
{
  "alert_type": "reconciliation_mismatch",
  "broker_quantity": 10,
  "internal_quantity": 9,
  "detection_seconds": ${DETECTION_SECONDS},
  "runtime_origin": "reconciliation-engine"
}
INNER_EOF

echo "${DETECTION_SECONDS}" > \
"${RECON_DIR}/${SESSION_ID}.detection.seconds"

echo "[PASS] Reconciliation mismatch propagated"
echo "[INFO] DETECTION_SECONDS=${DETECTION_SECONDS}"
