#!/usr/bin/env bash

set -euo pipefail

ROOT="${HOME}/corei"

echo "=================================================="
echo "VALIDATING REPOSITORY GOVERNANCE"
echo "=================================================="

FAILURES=0

validate_clean_git() {
  if [[ -z "$(git -C "${ROOT}" status --short)" ]]; then
    echo "[PASS] Repository clean"
  else
    echo "[FAIL] Repository not clean"
    FAILURES=$((FAILURES+1))
  fi
}

validate_gitignore() {
  if [[ -f "${ROOT}/.gitignore" ]]; then
    echo "[PASS] .gitignore present"
  else
    echo "[FAIL] .gitignore missing"
    FAILURES=$((FAILURES+1))
  fi
}

validate_clean_git
validate_gitignore

echo
echo "=================================================="

if [[ ${FAILURES} -eq 0 ]]; then
  echo "REPOSITORY GOVERNANCE VALIDATION PASSED"
else
  echo "REPOSITORY GOVERNANCE VALIDATION FAILED"
fi

echo "=================================================="
