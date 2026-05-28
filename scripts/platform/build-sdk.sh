#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")"/../.. && pwd)"

source "${ROOT_DIR}/runtime/python/testing/venv/bin/activate"

cd "${ROOT_DIR}/core_platform/sdk"

python -m pip install build

python -m build

echo
echo "SDK BUILD COMPLETE"
