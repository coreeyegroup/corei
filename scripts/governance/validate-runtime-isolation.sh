#!/usr/bin/env bash

set -euo pipefail

ROOT="${HOME}/corei"

FAILURES=0

echo "=================================================="
echo "VALIDATING RUNTIME ISOLATION"
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
echo "[1/3] Runtime topology validation..."

validate_path "runtime/events"
validate_path "runtime/execution"
validate_path "runtime/replay"
validate_path "runtime/streams"

echo
echo "[2/3] State topology validation..."

validate_path "state/governance"
validate_path "state/runtime"

echo
echo "[3/3] Governance install-state validation..."

validate_path "state/governance/install.state"

echo
echo "=================================================="

if [[ ${FAILURES} -eq 0 ]]; then
  echo "RUNTIME ISOLATION VALIDATION PASSED"
else
  echo "RUNTIME ISOLATION VALIDATION FAILED"
fi

echo "=================================================="
