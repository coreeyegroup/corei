#!/usr/bin/env bash
set -euo pipefail

BASE="infrastructure/phases/stage-17a-runtime-hardening"

REPORT_DIR="${BASE}/reports"

FINAL_REPORT="${REPORT_DIR}/final-hardening-gate-report.txt"

INSTALL_STATE="state/install.state"

mkdir -p state

echo "======================================================"
echo "STAGE-17A FINAL HARDENING GATE"
echo "======================================================"

FAILURES=0

validate_report () {

    FILE="$1"
    NAME="$2"

    if grep -q "RESULT=PASS" "${FILE}"; then

        echo "[PASS] ${NAME}"

    else

        echo "[FAIL] ${NAME}"

        FAILURES=$((FAILURES+1))
    fi
}

validate_report \
"${REPORT_DIR}/runtime-stream-validation.txt" \
"RUNTIME STREAM GOVERNANCE"

validate_report \
"${REPORT_DIR}/real-replay-validation.txt" \
"REAL REPLAY CERTIFICATION"

validate_report \
"${REPORT_DIR}/randomized-stream-validation.txt" \
"RANDOMIZED STREAM VALIDATION"

validate_report \
"${REPORT_DIR}/real-fixed-point-validation.txt" \
"REAL FIXED-POINT CERTIFICATION"

validate_report \
"${REPORT_DIR}/real-kill-switch-validation.txt" \
"REAL KILL-SWITCH PROPAGATION"

validate_report \
"${REPORT_DIR}/real-reconciliation-validation.txt" \
"REAL RECONCILIATION ENGINE"

validate_report \
"${REPORT_DIR}/exchange-time-validation.txt" \
"EXCHANGE TIME GOVERNANCE"

validate_report \
"${REPORT_DIR}/forensic-chain-validation.txt" \
"FORENSIC AUDIT CHAIN"

if [ "${FAILURES}" -eq 0 ]; then

    RESULT="PASS"

    echo ""
    echo "[PASS] ALL RUNTIME HARDENING LAYERS VALIDATED"

    echo "STAGE_17A_RUNTIME_HARDENING=PASSED|$(date --iso-8601=seconds)" \
    >> "${INSTALL_STATE}"

else

    RESULT="FAIL"

    echo ""
    echo "GATE BLOCKED — FAILURES=${FAILURES}"

fi

cat > "${FINAL_REPORT}" <<INNER_EOF
FINAL_GATE_RESULT=${RESULT}
FAILURES=${FAILURES}
INNER_EOF

if [ "${RESULT}" = "PASS" ]; then
    exit 0
else
    exit 1
fi
