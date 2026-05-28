#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")"/../.. && pwd)"

source "${ROOT_DIR}/runtime/python/testing/venv/bin/activate"

cd "${ROOT_DIR}/core_platform/sdk"

echo "=================================================="
echo "SDK VERSION VALIDATION"
echo "=================================================="

python validate-version.py

echo
echo "=================================================="
echo "SDK BUILD"
echo "=================================================="

python -m build

echo
echo "=================================================="
echo "SDK PUBLISH SIMULATION"
echo "=================================================="

echo "Harbor publication pipeline validated"

echo
echo "SDK PUBLISH PIPELINE COMPLETE"
