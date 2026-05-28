#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")"/../../.. && pwd)"
TIMESTAMP="$(date +%Y%m%d-%H%M%S)"
LOG_FILE="${ROOT_DIR}/state/stage-10a/logs/stage-10a-setup-${TIMESTAMP}.log"

mkdir -p "$(dirname "${LOG_FILE}")"

exec > >(tee -a "${LOG_FILE}") 2>&1

echo "=================================================="
echo "STAGE-10A TESTING FOUNDATION SETUP"
echo "=================================================="

echo "[1/5] Validating topology..."

required_dirs=(
    tests
    scripts/testing
    docs/testing
    infrastructure/phases/stage-10a-testing-foundation
)

for dir in "${required_dirs[@]}"; do
    if [ ! -d "${ROOT_DIR}/${dir}" ]; then
        echo "[FAIL] Missing directory: ${dir}"
        exit 1
    fi
done

echo "[2/5] Initializing reports structure..."

mkdir -p \
"${ROOT_DIR}/tests/reports" \
"${ROOT_DIR}/artifacts/testing"

echo "[3/5] Initializing checkpoint state..."

touch "${ROOT_DIR}/state/stage-10a/validation/.initialized"

echo "[4/5] Writing execution state..."

cat > "${ROOT_DIR}/state/stage-10a/runtime-state.json" <<STATE
{
  "stage": "10A",
  "status": "initialized",
  "timestamp": "${TIMESTAMP}"
}
STATE

echo "[5/5] Stage-10A initialization complete"

echo ""
echo "STAGE-10A SETUP COMPLETE"
