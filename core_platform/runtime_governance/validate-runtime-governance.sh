#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")"/../.. && pwd)"

echo "=================================================="
echo "PLATFORM RUNTIME GOVERNANCE VALIDATION"
echo "=================================================="

required_files=(
    "namespace/platform-namespace.yaml"
    "rbac/platform-service-account.yaml"
    "rbac/platform-role.yaml"
    "rbac/platform-role-binding.yaml"
    "network/platform-network-policy.yaml"
)

for file in "${required_files[@]}"
do
    if [ -f "${ROOT_DIR}/core_platform/runtime-governance/${file}" ]; then
        echo "[PASS] ${file}"
    else
        echo "[FAIL] ${file}"
        exit 1
    fi
done

echo
echo "RUNTIME GOVERNANCE VALIDATION PASSED"
