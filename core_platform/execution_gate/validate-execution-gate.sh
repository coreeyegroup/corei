#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")"/../.. && pwd)"

echo "=================================================="
echo "EXECUTION GATE VALIDATION"
echo "=================================================="

required_paths=(
    "reconciliation/platform_reconciliation.py"
    "certification/execution_certifier.py"
    "validation/governance_validator.py"
)

for path in "${required_paths[@]}"
do

    FULL_PATH="${ROOT_DIR}/core_platform/execution_gate/${path}"

    if [ -f "${FULL_PATH}" ]; then
        echo "[PASS] ${FULL_PATH}"
    else
        echo "[FAIL] ${FULL_PATH}"
        exit 1
    fi

done

echo
echo "EXECUTION GATE VALIDATION PASSED"
