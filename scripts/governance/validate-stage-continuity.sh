#!/usr/bin/env bash

set -euo pipefail

ROOT="${HOME}/corei"

FAILURES=0

echo "=================================================="
echo "VALIDATING STAGE CONTINUITY"
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

#
# Core institutional stages
#

validate_path "state/stage-10a"
validate_path "state/stage-11"
validate_path "state/stage-12"

#
# Governance stages
#

validate_path "state/governance"
validate_path "state/runtime"

echo
echo "=================================================="

if [[ ${FAILURES} -eq 0 ]]; then
  echo "STAGE CONTINUITY VALIDATION PASSED"
else
  echo "STAGE CONTINUITY VALIDATION FAILED"
fi

echo "=================================================="

exit ${FAILURES}
