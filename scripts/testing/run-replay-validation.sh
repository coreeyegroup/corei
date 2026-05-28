#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")"/../.. && pwd)"

source "${ROOT_DIR}/runtime/python/testing/venv/bin/activate"

REPORT_DIR="${ROOT_DIR}/artifacts/testing/replay"

mkdir -p "${REPORT_DIR}"

python replay/engine/replay-engine.py

pytest \
    tests/replay \
    tests/determinism \
    --junitxml="${REPORT_DIR}/replay-validation.xml"
