#!/usr/bin/env bash

set -euo pipefail

ROOT="${HOME}/corei"

FAILURES=0

echo "=================================================="
echo "VALIDATING FREEZE GOVERNANCE"
echo "=================================================="

#
# Repository convergence
#

if [[ -z "$(git -C "${ROOT}" status --short)" ]]; then
  echo "[PASS] Repository convergence clean"
else
  echo "[FAIL] Repository convergence dirty"
  FAILURES=$((FAILURES+1))
fi

#
# Governance install-state
#

if [[ -f "${ROOT}/state/governance/install/install.state" ]]; then
  echo "[PASS] Governance install-state present"
else
  echo "[FAIL] Governance install-state missing"
  FAILURES=$((FAILURES+1))
fi

#
# Runtime isolation
#

if [[ -d "${ROOT}/state/runtime" ]]; then
  echo "[PASS] Runtime isolation present"
else
  echo "[FAIL] Runtime isolation missing"
  FAILURES=$((FAILURES+1))
fi

#
# Artifact isolation
#

if [[ -d "${ROOT}/artifacts/runtime-images" ]]; then
  echo "[PASS] Artifact isolation present"
else
  echo "[FAIL] Artifact isolation missing"
  FAILURES=$((FAILURES+1))
fi

#
# Telemetry isolation
#

if [[ -d "${ROOT}/telemetry" ]]; then
  echo "[PASS] Telemetry isolation present"
else
  echo "[FAIL] Telemetry isolation missing"
  FAILURES=$((FAILURES+1))
fi

echo
echo "=================================================="

if [[ ${FAILURES} -eq 0 ]]; then
  echo "FREEZE GOVERNANCE VALIDATION PASSED"
else
  echo "FREEZE GOVERNANCE VALIDATION FAILED"
fi

echo "=================================================="

exit ${FAILURES}
