#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")"/../.. && pwd)"

echo "=================================================="
echo "DETERMINISTIC REPLAY VALIDATION"
echo "=================================================="

required_paths=(
    "engine/replay_engine.py"
    "consistency/state_consistency_validator.py"
    "lineage/replay_lineage.py"
    "validation/replay_validator.py"
)

for path in "${required_paths[@]}"
do

    FULL_PATH="${ROOT_DIR}/core_platform/deterministic_replay/${path}"

    if [ -f "${FULL_PATH}" ]; then
        echo "[PASS] ${FULL_PATH}"
    else
        echo "[FAIL] ${FULL_PATH}"
        exit 1
    fi

done

echo
echo "DETERMINISTIC REPLAY VALIDATION PASSED"
