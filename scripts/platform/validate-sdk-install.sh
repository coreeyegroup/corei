#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")"/../.. && pwd)"

source "${ROOT_DIR}/runtime/python/testing/venv/bin/activate"

WHEEL_FILE=$(find \
"${ROOT_DIR}/core_platform/sdk/dist" \
-name "*.whl" | head -1)

if [ -z "${WHEEL_FILE}" ]; then
    echo "[FAIL] No wheel found"
    exit 1
fi

python -m pip install \
    --force-reinstall \
    "${WHEEL_FILE}"

python -c "
from sdk.lineage.client import LineageClient

client = LineageClient()

print(client.hash_entity('abc'))
"

echo
echo "SDK INSTALL VALIDATION PASSED"
