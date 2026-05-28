#!/usr/bin/env bash

set -euo pipefail

ROOT="${HOME}/corei"

EXCLUSIONS="${ROOT}/governance/repository-governance/semantic-freeze-exclusions.txt"

TMP_STATUS=$(mktemp)

FAILURES=0

echo "=================================================="
echo "VALIDATING SEMANTIC FREEZE GOVERNANCE"
echo "=================================================="

git -C "${ROOT}" status --short > "${TMP_STATUS}"

FILTERED=$(mktemp)

cp "${TMP_STATUS}" "${FILTERED}"

while read -r line; do

  [[ -z "${line}" ]] && continue
  [[ "${line}" =~ ^# ]] && continue

  sed -i "\|${line}|d" "${FILTERED}"

done < "${EXCLUSIONS}"

if [[ ! -s "${FILTERED}" ]]; then
  echo "[PASS] Repository convergence semantically clean"
else
  echo "[FAIL] Non-governed repository divergence detected"
  echo
  cat "${FILTERED}"
  FAILURES=$((FAILURES+1))
fi

#
# Governance integrity
#

validate_path() {
  local path="$1"

  if [[ -e "${ROOT}/${path}" ]]; then
    echo "[PASS] ${path}"
  else
    echo "[FAIL] ${path}"
    FAILURES=$((FAILURES+1))
  fi
}

validate_path "state/governance/install/install.state"
validate_path "runtime"
validate_path "artifacts"
validate_path "telemetry"

echo
echo "=================================================="

if [[ ${FAILURES} -eq 0 ]]; then
  echo "SEMANTIC FREEZE GOVERNANCE VALIDATION PASSED"
else
  echo "SEMANTIC FREEZE GOVERNANCE VALIDATION FAILED"
fi

echo "=================================================="

exit ${FAILURES}
