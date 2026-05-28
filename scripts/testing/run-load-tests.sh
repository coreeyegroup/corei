#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")"/../.. && pwd)"

source "${ROOT_DIR}/runtime/python/testing/venv/bin/activate"

REPORT_DIR="${ROOT_DIR}/artifacts/testing/load"

mkdir -p "${REPORT_DIR}"

python orchestration/engine/load-test-engine.py

pytest tests/load \
    --junitxml="${REPORT_DIR}/load.xml"
