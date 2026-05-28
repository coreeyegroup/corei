#!/usr/bin/env bash

set -euo pipefail

START_TIME="$1"
END_TIME="$2"

RTO_SECONDS=$((END_TIME - START_TIME))

RTO_MINUTES=$((RTO_SECONDS / 60))

echo "========================================="
echo "RTO MEASUREMENT"
echo "========================================="

echo "[RTO] Recovery Time (seconds): ${RTO_SECONDS}"

echo "[RTO] Recovery Time (minutes): ${RTO_MINUTES}"

if [[ "${RTO_MINUTES}" -lt 30 ]]; then
  echo "[PASS] RTO target satisfied (<30 minutes)"
else
  echo "[FAIL] RTO target exceeded"
  exit 1
fi

echo "========================================="
