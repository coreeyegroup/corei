#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")"/../.. && pwd)"

source "${ROOT_DIR}/runtime/python/testing/venv/bin/activate"

export PYTHONPATH="${ROOT_DIR}"

cd "${ROOT_DIR}"

echo "=================================================="
echo "FULL PLATFORM GOVERNANCE VALIDATION"
echo "=================================================="

python \
core_platform/execution_gate/reconciliation/platform_reconciliation.py

echo

python \
core_platform/execution_gate/certification/execution_certifier.py

echo

python \
core_platform/execution_gate/validation/governance_validator.py
