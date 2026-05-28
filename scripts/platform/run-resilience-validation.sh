#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")"/../.. && pwd)"

source "${ROOT_DIR}/runtime/python/testing/venv/bin/activate"

export PYTHONPATH="${ROOT_DIR}"

cd "${ROOT_DIR}"

echo "=================================================="
echo "RESILIENCE VALIDATION"
echo "=================================================="

python \
core_platform/resilience_runtime/circuit_breakers/circuit_breaker_engine.py

echo

python \
core_platform/resilience_runtime/retry/retry_orchestrator.py

echo

python \
core_platform/resilience_runtime/fallback/fallback_manager.py

echo

python \
core_platform/resilience_runtime/recovery/recovery_engine.py

echo

python \
core_platform/resilience_runtime/lineage/resilience_lineage.py

echo

python \
core_platform/resilience_runtime/validation/resilience_validator.py
