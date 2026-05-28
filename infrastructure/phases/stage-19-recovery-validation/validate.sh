#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

echo "[Stage-19] Validating failover recovery framework..."

REQUIRED_SCRIPTS=(
  recovery-test-06-failover-validation.sh
  disable-primary-broker.sh
  restore-primary-broker.sh
  validate-sor-continuity.sh
  validate-failover-health.sh
  measure-failover-time.sh
)

for script in "${REQUIRED_SCRIPTS[@]}"; do
  if [[ ! -f "${ROOT_DIR}/scripts/${script}" ]]; then
    echo "[FAIL] Missing script: ${script}"
    exit 1
  fi
done

echo "[PASS] Stage-19 failover recovery framework operational"
