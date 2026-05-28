#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")"/../../.. && pwd)"

source "${ROOT_DIR}/runtime/python/testing/venv/bin/activate"

export PYTHONPATH="${ROOT_DIR}/core_platform/service-template"

echo "=================================================="
echo "VALIDATING UNIVERSAL SERVICE TEMPLATE"
echo "=================================================="

required_files=(
    "src/app.py"
    "Dockerfile"
    "requirements.txt"
    "helm/Chart.yaml"
    "helm/values.yaml"
)

for file in "${required_files[@]}"
do
    if [ -f "${ROOT_DIR}/core_platform/service-template/${file}" ]; then
        echo "[PASS] ${file}"
    else
        echo "[FAIL] ${file}"
        exit 1
    fi
done

cd "${ROOT_DIR}/core_platform/service-template"

pytest tests

echo
echo "SERVICE TEMPLATE VALIDATION PASSED"
