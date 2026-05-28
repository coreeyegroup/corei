#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")"/../.. && pwd)"

source "${ROOT_DIR}/runtime/python/testing/venv/bin/activate"

REPORT_DIR="${ROOT_DIR}/artifacts/testing/simulation"

mkdir -p "${REPORT_DIR}"

pytest \
    tests/integration/test_mock_broker.py \
    tests/synthetic/test_synthetic_market_generation.py \
    --junitxml="${REPORT_DIR}/simulation.xml"
