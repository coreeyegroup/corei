#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")"/../../.. && pwd)"

FAIL=0

validate_dir() {
    if [ -d "$1" ]; then
        echo "[PASS] $1"
    else
        echo "[FAIL] $1"
        FAIL=1
    fi
}

echo "=================================================="
echo "STAGE-10A VALIDATION"
echo "=================================================="

validate_dir "${ROOT_DIR}/tests"
validate_dir "${ROOT_DIR}/tests/contracts"
validate_dir "${ROOT_DIR}/tests/integration"
validate_dir "${ROOT_DIR}/tests/replay"
validate_dir "${ROOT_DIR}/tests/performance"
validate_dir "${ROOT_DIR}/tests/chaos"
validate_dir "${ROOT_DIR}/tests/mock-services"

validate_dir "${ROOT_DIR}/scripts/testing"

validate_dir "${ROOT_DIR}/docs/testing"

validate_dir "${ROOT_DIR}/state/stage-10a"

validate_dir "${ROOT_DIR}/artifacts/testing"

validate_dir "${ROOT_DIR}/infrastructure/phases/stage-10a-testing-foundation"

if [ "$FAIL" -eq 0 ]; then
    echo ""
    echo "STAGE-10A VALIDATION PASSED"
    exit 0
else
    echo ""
    echo "STAGE-10A VALIDATION FAILED"
    exit 1
fi
