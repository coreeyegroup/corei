#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")"/../.. && pwd)"

echo "=================================================="
echo "DEPLOYMENT GOVERNANCE VALIDATION"
echo "=================================================="

required_paths=(
    "helm/values.yaml"
    "helm/templates/deployment.yaml"
    "helm/templates/service.yaml"
    "sequencing/platform-deployment-order.json"
    "health/health-gate.py"
    "rollbacks/rollback-policy.md"
)

for path in "${required_paths[@]}"
do
    FULL_PATH="${ROOT_DIR}/core_platform/deployment-governance/${path}"

    if [ -f "${FULL_PATH}" ]; then
        echo "[PASS] ${FULL_PATH}"
    else
        echo "[FAIL] ${FULL_PATH}"
        exit 1
    fi
done

echo
echo "DEPLOYMENT GOVERNANCE VALIDATION PASSED"
