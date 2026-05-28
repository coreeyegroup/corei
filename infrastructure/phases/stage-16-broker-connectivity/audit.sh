#!/usr/bin/env bash
set -euo pipefail

AUDIT_DIR=".logs/stage-16/audit"
TIMESTAMP=$(date +%Y%m%d-%H%M%S)

mkdir -p "${AUDIT_DIR}"

OUTPUT_FILE="${AUDIT_DIR}/audit-${TIMESTAMP}.log"

{
  echo "=================================================="
  echo "STAGE-16 AUDIT"
  echo "=================================================="

  echo
  echo "[NAMESPACES]"
  kubectl get namespaces | grep -E 'execution|trading-infra' || true

  echo
  echo "[DEPLOYMENTS]"
  kubectl get deployments -A | grep -E 'execution|trading-infra' || true

  echo
  echo "[PODS]"
  kubectl get pods -A | grep -E 'execution|trading-infra' || true

  echo
  echo "[CONFIG FILES]"
  find infrastructure/phases/stage-16-broker-connectivity -type f | sort

  echo
  echo "[COMPONENT TOPOLOGY]"
  find infrastructure/components -maxdepth 1 -type d | sort

} | tee "${OUTPUT_FILE}"

echo
echo "Audit written to:"
echo "${OUTPUT_FILE}"
