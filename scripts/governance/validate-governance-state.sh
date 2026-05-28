#!/usr/bin/env bash

set -euo pipefail

ROOT="${HOME}/corei"

FAILURES=0

echo "=================================================="
echo "VALIDATING GOVERNANCE STATE"
echo "=================================================="

validate_path() {
  local path="$1"

  if [[ -e "${ROOT}/${path}" ]]; then
    echo "[PASS] ${path}"
  else
    echo "[FAIL] ${path}"
    FAILURES=$((FAILURES+1))
  fi
}

echo
echo "[1/4] Governance state validation..."

validate_path "state/governance/install"
validate_path "state/governance/lifecycle"
validate_path "state/governance/activation"
validate_path "state/governance/release"
validate_path "state/governance/recovery"
validate_path "state/governance/validation"

echo
echo "[2/4] Runtime state validation..."

validate_path "state/runtime/execution"
validate_path "state/runtime/replay"
validate_path "state/runtime/reconciliation"
validate_path "state/runtime/streams"

echo
echo "[3/4] Install governance validation..."

validate_path "state/governance/install/install.state"

echo
echo "[4/4] Runtime lineage validation..."

validate_path "state/runtime/execution/runtime-execution"
validate_path "state/runtime/replay/runtime-replay"

echo
echo "=================================================="

if [[ ${FAILURES} -eq 0 ]]; then
  echo "GOVERNANCE STATE VALIDATION PASSED"
else
  echo "GOVERNANCE STATE VALIDATION FAILED"
fi

echo "=================================================="
