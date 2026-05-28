#!/usr/bin/env bash

set -euo pipefail

START_TIME="$1"
END_TIME="$2"

FAILOVER_SECONDS=$((END_TIME - START_TIME))

echo "========================================="
echo "FAILOVER TIME MEASUREMENT"
echo "========================================="

echo "[Failover] Recovery Time (seconds): ${FAILOVER_SECONDS}"

if [[ "${FAILOVER_SECONDS}" -lt 10 ]]; then
  echo "[PASS] Failover SLA satisfied (<10 seconds)"
else
  echo "[WARN] Failover exceeded target"
fi

echo "========================================="
