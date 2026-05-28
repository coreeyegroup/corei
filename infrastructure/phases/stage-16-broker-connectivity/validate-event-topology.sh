#!/usr/bin/env bash
set -euo pipefail

echo "=================================================="
echo "STAGE-16 — EVENT TOPOLOGY GOVERNANCE VALIDATION"
echo "=================================================="

PASS_COUNT=0

check_file() {
  local FILE="$1"

  if [ -f "${FILE}" ]; then
    echo "[PASS] ${FILE}"
    PASS_COUNT=$((PASS_COUNT + 1))
  else
    echo "[FAIL] ${FILE}"
    exit 1
  fi
}

check_file infrastructure/phases/stage-16-broker-connectivity/EVENT-TOPOLOGY.md
check_file kubernetes/messaging/stage-16/topics.yaml

check_file schemas/stage-16/broker_dispatch_v1.json
check_file schemas/stage-16/broker_fill_v1.json
check_file schemas/stage-16/reconciliation_event_v1.json

check_file scripts/messaging/stage-16/setup-topics.sh
check_file scripts/messaging/stage-16/validate-topics.sh
check_file scripts/messaging/stage-16/validate-schemas.sh

echo
echo "=================================================="
echo "TOTAL CHECKS PASSED: ${PASS_COUNT}"
echo "STAGE-16 STEP-05 VALIDATION PASSED"
echo "=================================================="
