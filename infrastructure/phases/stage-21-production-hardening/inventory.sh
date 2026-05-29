#!/usr/bin/env bash

set -euo pipefail

TIMESTAMP=$(date -u +%Y%m%dT%H%M%SZ)

REPORT_DIR="infrastructure/phases/stage-21-production-hardening/reports"

mkdir -p "${REPORT_DIR}"

OUTPUT="${REPORT_DIR}/topology-inventory-${TIMESTAMP}.txt"

{
  echo "====================================="
  echo "STAGE-21B TOPOLOGY INVENTORY"
  echo "====================================="

  echo
  echo "PHASE TOPOLOGY"
  find infrastructure/phases/stage-21-production-hardening -type d | sort

  echo
  echo "SCRIPT TOPOLOGY"
  find scripts -maxdepth 2 -type d | sort

  echo
  echo "KUBERNETES TOPOLOGY"
  find kubernetes -maxdepth 2 -type d | sort

  echo
  echo "COMPONENT TOPOLOGY"
  find infrastructure/components -maxdepth 2 -type d | sort

} > "${OUTPUT}"

echo "[PASS] Inventory written:"
echo "${OUTPUT}"
