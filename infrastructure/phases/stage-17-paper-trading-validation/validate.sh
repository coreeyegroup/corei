#!/usr/bin/env bash
set -euo pipefail

BASE="infrastructure/phases/stage-17-paper-trading-validation"

REPORT_DIR="${BASE}/reports"

echo "======================================================"
echo "STAGE-17 AUTHORITATIVE VALIDATION GATE"
echo "======================================================"

FAILURES=0

run_test() {

    NAME="$1"
    CMD="$2"

    echo ""
    echo "------------------------------------------------------"
    echo "RUNNING: ${NAME}"
    echo "------------------------------------------------------"

    if eval "${CMD}"; then

        echo "[PASS] ${NAME}"

    else

        echo "[FAIL] ${NAME}"

        FAILURES=$((FAILURES + 1))
    fi
}

run_test \
"TEST-1 DETERMINISM" \
"bash ${BASE}/tests/test_determinism.sh"

run_test \
"TEST-2 LINEAGE CONTINUITY" \
"python3 ${BASE}/tests/test_lineage.py"

run_test \
"TEST-3 FIXED-POINT ENFORCEMENT" \
"python3 ${BASE}/tests/test_fixed_point.py"

run_test \
"TEST-4 KILL SWITCH LATENCY" \
"bash ${BASE}/tests/test_kill_switch.sh"

run_test \
"TEST-5 RISK ENFORCEMENT" \
"python3 ${BASE}/tests/test_risk_enforcement.py"

run_test \
"TEST-6 RECONCILIATION DETECTION" \
"bash ${BASE}/tests/test_reconciliation.sh"

run_test \
"TEST-7 COPY TRADE CORRECTNESS" \
"python3 ${BASE}/tests/test_copy_trade.py"

run_test \
"TEST-8 EVENT-TIME GOVERNANCE" \
"python3 ${BASE}/tests/test_event_time.py"

echo ""
echo "======================================================"

if [ "${FAILURES}" -eq 0 ]; then

    echo "[PASS] ALL STAGE-17 VALIDATIONS PASSED"

    exit 0

else

    echo "[FAIL] VALIDATION GATE BLOCKED"
    echo "[FAIL] TOTAL FAILURES: ${FAILURES}"

    exit 1
fi
