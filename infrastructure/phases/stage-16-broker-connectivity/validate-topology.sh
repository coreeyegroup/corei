#!/usr/bin/env bash
set -euo pipefail

echo "=================================================="
echo "STAGE-16 — TOPOLOGY VALIDATION"
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

check_file kubernetes/execution/namespace.yaml
check_file kubernetes/trading-infra/namespace.yaml

check_file kubernetes/execution/kustomization.yaml
check_file kubernetes/trading-infra/kustomization.yaml

check_file kubernetes/trading-infra/values/values-dev.yaml
check_file kubernetes/execution/values/values-dev.yaml

for component in \
smart-order-router \
oms \
ems \
broker-adapter \
fill-handler \
reconciliation \
copy-trade-engine
do
  check_dir infrastructure/components/${component}

  check_file infrastructure/components/${component}/README.md
  check_file infrastructure/components/${component}/scripts/install.sh
  check_file infrastructure/components/${component}/scripts/validate.sh
done

check_file infrastructure/phases/stage-16-broker-connectivity/TOPOLOGY-INVENTORY.md

echo "=================================================="
echo "TOTAL CHECKS PASSED: ${PASS_COUNT}"
echo "STAGE-16 STEP-03 VALIDATION PASSED"
echo "=================================================="
