#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")"/../.. && pwd)"

echo "=================================================="
echo "CONFIGURATION GOVERNANCE VALIDATION"
echo "=================================================="

required_paths=(
    "schemas/platform-config-schema.json"
    "snapshots/snapshot_engine.py"
    "lineage/config_lineage.py"
    "restoration/config_restoration.py"
    "validation/config_validator.py"
    "audit/config_audit_log.py"
)

for path in "${required_paths[@]}"
do
    FULL_PATH="${ROOT_DIR}/core_platform/config_governance/${path}"

    if [ -f "${FULL_PATH}" ]; then
        echo "[PASS] ${FULL_PATH}"
    else
        echo "[FAIL] ${FULL_PATH}"
        exit 1
    fi
done

echo
echo "CONFIGURATION GOVERNANCE VALIDATION PASSED"
