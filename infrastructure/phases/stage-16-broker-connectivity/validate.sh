#!/usr/bin/env bash
set -euo pipefail

echo "=================================================="
echo "STAGE-16 — BROKER CONNECTIVITY VALIDATION"
echo "=================================================="

PASS_COUNT=0

check_dir() {
  local DIR="$1"

  if [ -d "${DIR}" ]; then
    echo "[PASS] ${DIR}"
    PASS_COUNT=$((PASS_COUNT + 1))
  else
    echo "[FAIL] ${DIR}"
    exit 1
  fi
}

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

check_dir infrastructure/phases/stage-16-broker-connectivity
check_dir infrastructure/components/smart-order-router
check_dir infrastructure/components/oms
check_dir infrastructure/components/ems
check_dir infrastructure/components/broker-adapter
check_dir infrastructure/components/fill-handler
check_dir infrastructure/components/reconciliation
check_dir infrastructure/components/copy-trade-engine
check_dir kubernetes/execution
check_dir kubernetes/trading-infra

check_file infrastructure/phases/stage-16-broker-connectivity/README.md
check_file infrastructure/phases/stage-16-broker-connectivity/EXECUTION-GOVERNANCE.md
check_file infrastructure/phases/stage-16-broker-connectivity/DEFERRED-HARDENING.md
check_file infrastructure/phases/stage-16-broker-connectivity/setup.sh

echo "=================================================="
echo "TOTAL CHECKS PASSED: ${PASS_COUNT}"
echo "STAGE-16 STEP-01 VALIDATION PASSED"
echo "=================================================="
