#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")"/../.. && pwd)"

echo "=================================================="
echo "OPERATIONS FOUNDATION VALIDATION"
echo "=================================================="

required_paths=(
    "alerts/alert_router.py"
    "severity/severity_classifier.py"
    "escalation/escalation_orchestrator.py"
    "incidents/incident_manager.py"
    "lineage/operations_lineage.py"
    "validation/operations_validator.py"
)

for path in "${required_paths[@]}"
do

    FULL_PATH="${ROOT_DIR}/core_platform/operations/${path}"

    if [ -f "${FULL_PATH}" ]; then
        echo "[PASS] ${FULL_PATH}"
    else
        echo "[FAIL] ${FULL_PATH}"
        exit 1
    fi

done

echo
echo "OPERATIONS FOUNDATION VALIDATION PASSED"
