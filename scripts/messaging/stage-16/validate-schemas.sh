#!/usr/bin/env bash
set -euo pipefail

echo "=================================================="
echo "STAGE-16 — SCHEMA VALIDATION"
echo "=================================================="

PASS_COUNT=0

SCHEMAS=(
  broker_dispatch_v1.json
  broker_fill_v1.json
  reconciliation_event_v1.json
)

for schema in "${SCHEMAS[@]}"; do

  if [ -f "schemas/stage-16/${schema}" ]; then
    echo "[PASS] ${schema}"
    PASS_COUNT=$((PASS_COUNT + 1))
  else
    echo "[FAIL] ${schema}"
    exit 1
  fi

done

echo
echo "=================================================="
echo "TOTAL SCHEMAS VALIDATED: ${PASS_COUNT}"
echo "STAGE-16 SCHEMA VALIDATION PASSED"
echo "=================================================="
