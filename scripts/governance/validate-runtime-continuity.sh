#!/usr/bin/env bash

set -euo pipefail

ROOT="${HOME}/corei"

FAILURES=0

echo "=================================================="
echo "VALIDATING RUNTIME CONTINUITY"
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

validate_path "runtime/events"
validate_path "runtime/portfolio"
validate_path "runtime/state"
validate_path "state/runtime"

echo
echo "=================================================="

if [[ ${FAILURES} -eq 0 ]]; then
  echo "RUNTIME CONTINUITY VALIDATION PASSED"
else
  echo "RUNTIME CONTINUITY VALIDATION FAILED"
fi

echo "=================================================="

exit ${FAILURES}
