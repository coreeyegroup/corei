#!/usr/bin/env bash
set -euo pipefail

BASE="infrastructure/phases/stage-17a-runtime-hardening"

SESSION_ID=$(cat "${BASE}/runtime/state/active-runtime-session.id")

RECON_DIR="${BASE}/runtime/reconciliation"

REPORT_FILE="${BASE}/reports/real-reconciliation-validation.txt"

echo "======================================================"
echo "REAL RECONCILIATION VALIDATION"
echo "======================================================"

DETECTION_SECONDS=$(cat "${RECON_DIR}/${SESSION_ID}.detection.seconds")

VALID=$(python3 - <<INNER_PY
value=float("${DETECTION_SECONDS}")
print("PASS" if value < 30 else "FAIL")
INNER_PY
)

cat > "${REPORT_FILE}" <<INNER_EOF
DETECTION_SECONDS=${DETECTION_SECONDS}
RESULT=${VALID}
INNER_EOF

if [ "${VALID}" = "PASS" ]; then

    echo "[PASS] Runtime reconciliation validated"
    exit 0

else

    echo "[FAIL] Reconciliation propagation exceeded threshold"
    exit 1
fi
