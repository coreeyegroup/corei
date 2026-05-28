#!/usr/bin/env bash

set -euo pipefail

ROOT="${HOME}/corei"

FAILURES=0

echo "=================================================="
echo "VALIDATING RUNTIME CONTAMINATION"
echo "=================================================="

check_absent() {
  local path="$1"

  if [[ -e "${ROOT}/${path}" ]]; then
    echo "[FAIL] Runtime contamination detected: ${path}"
    FAILURES=$((FAILURES+1))
  else
    echo "[PASS] ${path} isolated"
  fi
}

check_absent "runtime/images"
check_absent "runtime/snapshots"
check_absent "runtime/exports"

echo
echo "=================================================="

if [[ ${FAILURES} -eq 0 ]]; then
  echo "RUNTIME CONTAMINATION VALIDATION PASSED"
else
  echo "RUNTIME CONTAMINATION VALIDATION FAILED"
fi

echo "=================================================="

exit ${FAILURES}
