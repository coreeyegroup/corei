#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")"/../.. && pwd)"

source "${ROOT_DIR}/runtime/python/testing/venv/bin/activate"

REPORT_DIR="${ROOT_DIR}/artifacts/testing/chaos"

mkdir -p "${REPORT_DIR}"

python chaos/engine/chaos-engine.py

pytest tests/chaos \
    --junitxml="${REPORT_DIR}/chaos.xml"
