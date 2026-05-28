#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")"/../.. && pwd)"

echo "=================================================="
echo "RESILIENCE FOUNDATION VALIDATION"
echo "=================================================="

required_paths=(
    "circuit_breakers/circuit_breaker_engine.py"
    "retry/retry_orchestrator.py"
    "fallback/fallback_manager.py"
    "recovery/recovery_engine.py"
    "lineage/resilience_lineage.py"
    "validation/resilience_validator.py"
)

for path in "${required_paths[@]}"
do

    FULL_PATH="${ROOT_DIR}/core_platform/resilience_runtime/${path}"

    if [ -f "${FULL_PATH}" ]; then
        echo "[PASS] ${FULL_PATH}"
    else
        echo "[FAIL] ${FULL_PATH}"
        exit 1
    fi

done

echo
echo "RESILIENCE FOUNDATION VALIDATION PASSED"
