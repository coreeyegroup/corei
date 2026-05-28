#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")"/../.. && pwd)"

echo "=================================================="
echo "HELM GOVERNANCE VALIDATION"
echo "=================================================="

helm lint \
"${ROOT_DIR}/core_platform/service-template/helm"

echo
echo "HELM GOVERNANCE VALIDATION PASSED"
