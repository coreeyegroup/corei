#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")"/../.. && pwd)"

echo "=================================================="
echo "EVENT GOVERNANCE VALIDATION"
echo "=================================================="

required_paths=(
    "schemas/platform-event-schema.json"
    "runtime/event_ingestion_gateway.py"
    "lineage/event_lineage.py"
    "validation/event_validator.py"
    "dead_letter/dead_letter_router.py"
    "replay/event_replay.py"
    "audit/event_audit_log.py"
)

for path in "${required_paths[@]}"
do
    FULL_PATH="${ROOT_DIR}/core_platform/event_governance/${path}"

    if [ -f "${FULL_PATH}" ]; then
        echo "[PASS] ${FULL_PATH}"
    else
        echo "[FAIL] ${FULL_PATH}"
        exit 1
    fi
done

echo
echo "EVENT GOVERNANCE VALIDATION PASSED"
