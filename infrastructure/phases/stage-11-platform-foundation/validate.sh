#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")"/../../.. && pwd)"

echo "=================================================="
echo "STAGE-11 VALIDATION"
echo "=================================================="

required_paths=(
    "core_platform/sdk"
    "core_platform/event_bus"
    "core_platform/workflow_engine"
    "core_platform/lineage"
    "core_platform/flow_control"
    "core_platform/resilience"
    "core_platform/system"
    "core_platform/replay"
    "core_platform/runtime_governance"
    "core_platform/system_registry"
)

for path in "${required_paths[@]}"
do
    FULL_PATH="${ROOT_DIR}/${path}"

    if [ -e "${FULL_PATH}" ]; then
        echo "[PASS] ${FULL_PATH}"
    else
        echo "[FAIL] ${FULL_PATH}"
        exit 1
    fi
done

echo
echo "STAGE-11 VALIDATION PASSED"
