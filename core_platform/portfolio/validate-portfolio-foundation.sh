#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")"/../.. && pwd)"

echo "=================================================="
echo "PORTFOLIO FOUNDATION VALIDATION"
echo "=================================================="

required_paths=(
    "engine/portfolio_state_engine.py"
    "snapshots/snapshot_engine.py"
    "replay/portfolio_replay.py"
    "lineage/portfolio_lineage.py"
    "validation/portfolio_validator.py"
)

for path in "${required_paths[@]}"
do

    FULL_PATH="${ROOT_DIR}/core_platform/portfolio/${path}"

    if [ -f "${FULL_PATH}" ]; then
        echo "[PASS] ${FULL_PATH}"
    else
        echo "[FAIL] ${FULL_PATH}"
        exit 1
    fi

done

echo
echo "PORTFOLIO FOUNDATION VALIDATION PASSED"
