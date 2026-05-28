#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")"/../.. && pwd)"

source "${ROOT_DIR}/runtime/python/testing/venv/bin/activate"

export PYTHONPATH="${ROOT_DIR}/core_platform/sdk"

cd "${ROOT_DIR}/core_platform/sdk"

pytest tests
