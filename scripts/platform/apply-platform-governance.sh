#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")"/../.. && pwd)"

echo "=================================================="
echo "APPLYING PLATFORM GOVERNANCE"
echo "=================================================="

kubectl apply -f \
"${ROOT_DIR}/core_platform/runtime-governance/namespace/platform-namespace.yaml"

kubectl apply -f \
"${ROOT_DIR}/core_platform/runtime-governance/rbac/platform-service-account.yaml"

kubectl apply -f \
"${ROOT_DIR}/core_platform/runtime-governance/rbac/platform-role.yaml"

kubectl apply -f \
"${ROOT_DIR}/core_platform/runtime-governance/rbac/platform-role-binding.yaml"

kubectl apply -f \
"${ROOT_DIR}/core_platform/runtime-governance/network/platform-network-policy.yaml"

echo
echo "PLATFORM GOVERNANCE APPLIED"
