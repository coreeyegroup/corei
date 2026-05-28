#!/usr/bin/env bash
set -euo pipefail

BASE="infrastructure/phases/stage-17a-runtime-hardening"

SESSION_ID=$(cat "${BASE}/runtime/state/active-runtime-session.id")

HALT_DIR="${BASE}/runtime/kill-switch"

REPORT_FILE="${BASE}/reports/real-kill-switch-validation.txt"

echo "======================================================"
echo "REAL KILL-SWITCH VALIDATION"
echo "======================================================"

PROPAGATION_MS=$(cat "${HALT_DIR}/${SESSION_ID}.propagation.ms")

if [ "${PROPAGATION_MS}" -lt 1000 ]; then

    RESULT="PASS"

    echo "[PASS] Distributed halt propagation validated"

else

    RESULT="FAIL"

    echo "[FAIL] Halt propagation exceeded threshold"

fi

cat > "${REPORT_FILE}" <<INNER_EOF
PROPAGATION_MS=${PROPAGATION_MS}
RESULT=${RESULT}
INNER_EOF

if [ "${RESULT}" = "PASS" ]; then
    exit 0
else
    exit 1
fi
