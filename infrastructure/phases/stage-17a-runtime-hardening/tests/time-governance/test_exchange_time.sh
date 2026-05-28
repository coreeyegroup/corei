#!/usr/bin/env bash
set -euo pipefail

BASE="infrastructure/phases/stage-17a-runtime-hardening"

SESSION_ID=$(cat "${BASE}/runtime/state/active-runtime-session.id")

CLOCK_DIR="${BASE}/runtime/clock-domain"

REPORT_FILE="${BASE}/reports/exchange-time-validation.txt"

echo "======================================================"
echo "EXCHANGE TIME GOVERNANCE VALIDATION"
echo "======================================================"

DRIFT_MS=$(cat "${CLOCK_DIR}/${SESSION_ID}.drift.ms")

RESULT=$(python3 - <<INNER_PY
drift=float("${DRIFT_MS}")
print("PASS" if drift < 100 else "FAIL")
INNER_PY
)

cat > "${REPORT_FILE}" <<INNER_EOF
DRIFT_MS=${DRIFT_MS}
TIME_AUTHORITY=EXCHANGE
RESULT=${RESULT}
INNER_EOF

if [ "${RESULT}" = "PASS" ]; then

    echo "[PASS] Exchange-authoritative time governance validated"
    exit 0

else

    echo "[FAIL] Exchange time drift exceeded threshold"
    exit 1
fi
