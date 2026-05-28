#!/usr/bin/env bash
set -euo pipefail

BASE="infrastructure/phases/stage-17a-runtime-hardening"

SESSION_ID=$(cat "${BASE}/runtime/state/active-runtime-session.id")

CAPTURE_DIR="${BASE}/runtime/captures"
SAMPLE_DIR="${BASE}/runtime/samples"

mkdir -p "${SAMPLE_DIR}"

echo "======================================================"
echo "RUNTIME TOPIC SAMPLING"
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

for topic in "${TOPICS[@]}"; do

    SOURCE_FILE="${CAPTURE_DIR}/${topic}/${SESSION_ID}.capture.log"

    SAMPLE_FILE="${SAMPLE_DIR}/${topic}.sample.log"

    tail -n 1 "${SOURCE_FILE}" > "${SAMPLE_FILE}"

    echo "[PASS] Sampled topic: ${topic}"

done

echo "[PASS] Runtime stream sampling completed"
