#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")"/../.. && pwd)"

source "${ROOT_DIR}/runtime/python/testing/venv/bin/activate"

export PYTHONPATH="${ROOT_DIR}"

cd "${ROOT_DIR}"

echo "=================================================="
echo "OPERATIONS VALIDATION"
echo "=================================================="

python \
core_platform/operations/alerts/alert_router.py

echo

python \
core_platform/operations/severity/severity_classifier.py

echo

python \
core_platform/operations/escalation/escalation_orchestrator.py

echo

python \
core_platform/operations/incidents/incident_manager.py

echo

python \
core_platform/operations/lineage/operations_lineage.py

echo

python \
core_platform/operations/validation/operations_validator.py
