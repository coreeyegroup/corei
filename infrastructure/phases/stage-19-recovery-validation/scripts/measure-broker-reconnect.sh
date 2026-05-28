#!/usr/bin/env bash

set -euo pipefail

START_TIME="$1"
END_TIME="$2"

RECONNECT_SECONDS=$((END_TIME - START_TIME))

echo "========================================="
echo "BROKER RECONNECT MEASUREMENT"
echo "========================================="

echo "[Reconnect] Recovery Time (seconds): ${RECONNECT_SECONDS}"

if [[ "${RECONNECT_SECONDS}" -lt 10 ]]; then
  echo "[PASS] Broker reconnect SLA satisfied (<10 seconds)"
else
  echo "[WARN] Broker reconnect exceeded target"
fi

echo "========================================="
