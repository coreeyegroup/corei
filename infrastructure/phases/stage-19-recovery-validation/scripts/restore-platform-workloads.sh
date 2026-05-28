#!/usr/bin/env bash

set -euo pipefail

echo "========================================="
echo "RESTORE PLATFORM WORKLOADS"
echo "========================================="

TARGET_DEPLOYMENTS=(
  "database/timescaledb"
)

for target in "${TARGET_DEPLOYMENTS[@]}"; do

  NAMESPACE="${target%%/*}"
  DEPLOYMENT="${target##*/}"

  echo "[Restore] Restoring deployment ${DEPLOYMENT} in namespace ${NAMESPACE}"

  kubectl scale deployment "${DEPLOYMENT}" \
    -n "${NAMESPACE}" \
    --replicas=1

  kubectl rollout status deployment/"${DEPLOYMENT}" \
    -n "${NAMESPACE}" \
    --timeout=300s

done

echo "[Restore] Platform workload restoration complete"

echo "========================================="
