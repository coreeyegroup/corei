#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")"/../.. && pwd)"

source "${ROOT_DIR}/runtime/python/testing/venv/bin/activate"

REPORT_DIR="${ROOT_DIR}/artifacts/testing/contracts"

mkdir -p "${REPORT_DIR}"

pytest tests/contracts \
    --junitxml="${REPORT_DIR}/contracts.xml"
