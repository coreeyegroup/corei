#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")"/../.. && pwd)"

source "${ROOT_DIR}/runtime/python/testing/venv/bin/activate"

export PYTHONPATH="${ROOT_DIR}"

cd "${ROOT_DIR}"

echo "=================================================="
echo "DETERMINISTIC REPLAY VALIDATION"
echo "=================================================="

python \
core_platform/deterministic_replay/engine/replay_engine.py

echo

python \
core_platform/deterministic_replay/consistency/state_consistency_validator.py

echo

python \
core_platform/deterministic_replay/lineage/replay_lineage.py

echo

python \
core_platform/deterministic_replay/validation/replay_validator.py
