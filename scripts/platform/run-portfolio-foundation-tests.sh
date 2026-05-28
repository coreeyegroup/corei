#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")"/../.. && pwd)"

source "${ROOT_DIR}/runtime/python/testing/venv/bin/activate"

export PYTHONPATH="${ROOT_DIR}"

cd "${ROOT_DIR}"

pytest core_platform/portfolio/runtime
