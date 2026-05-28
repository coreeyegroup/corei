#!/usr/bin/env bash
set -euo pipefail

BASE="infrastructure/phases/stage-17a-runtime-hardening"

SAMPLE_DIR="${BASE}/runtime/samples"

REPORT_FILE="${BASE}/reports/runtime-stream-validation.txt"

echo "======================================================"
echo "RUNTIME STREAM VALIDATION"
echo "======================================================"

TOPICS=(
ticks
signals
risk_events
orders
fills
portfolio_state
alerts
copy_trade_events
kill_switch_stream
)

FAILURES=0
VALIDATED=0

for topic in "${TOPICS[@]}"; do

    SAMPLE_FILE="${SAMPLE_DIR}/${topic}.sample.log"

    if [ -s "${SAMPLE_FILE}" ]; then

        VALIDATED=$((VALIDATED + 1))

        echo "[PASS] ${topic}"

    else

        FAILURES=$((FAILURES + 1))

        echo "[FAIL] ${topic}"
    fi
done

cat > "${REPORT_FILE}" <<INNER_EOF
VALIDATED_TOPICS=${VALIDATED}
FAILURES=${FAILURES}
RESULT=$( [ "${FAILURES}" -eq 0 ] && echo PASS || echo FAIL )
INNER_EOF

if [ "${FAILURES}" -eq 0 ]; then
    echo "[PASS] Runtime stream governance validated"
    exit 0
else
    echo "[FAIL] Runtime stream governance failed"
    exit 1
fi
