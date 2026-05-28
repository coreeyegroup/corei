#!/usr/bin/env bash
set -euo pipefail

INVENTORY_DIR=".logs/stage-16/inventory"
TIMESTAMP=$(date +%Y%m%d-%H%M%S)

mkdir -p "${INVENTORY_DIR}"

OUTPUT_FILE="${INVENTORY_DIR}/inventory-${TIMESTAMP}.log"

{
  echo "=================================================="
  echo "STAGE-16 INVENTORY"
  echo "=================================================="

  echo
  echo "[EXECUTION NAMESPACE]"
  kubectl get all -n execution || true

  echo
  echo "[TRADING-INFRA NAMESPACE]"
  kubectl get all -n trading-infra || true

  echo
  echo "[COMPONENTS]"
  ls -1 infrastructure/components

  echo
  echo "[VALUES FILES]"
  find kubernetes -name "values*.yaml" | sort

} | tee "${OUTPUT_FILE}"

echo
echo "Inventory written to:"
echo "${OUTPUT_FILE}"
