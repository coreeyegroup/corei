#!/usr/bin/env bash

set -euo pipefail

echo "========================================="
echo "DESTROY PLATFORM WORKLOADS"
echo "========================================="

TARGET_DEPLOYMENTS=(
  "database/timescaledb"
)

for target in "${TARGET_DEPLOYMENTS[@]}"; do

  NAMESPACE="${target%%/*}"
  DEPLOYMENT="${target##*/}"

  echo "[Destroy] Scaling deployment ${DEPLOYMENT} in namespace ${NAMESPACE} to 0"

  kubectl scale deployment "${DEPLOYMENT}" \
    -n "${NAMESPACE}" \
    --replicas=0

done

echo "[Destroy] Waiting for workload shutdown"

sleep 15

echo "[Destroy] Controlled workload destruction complete"

echo "========================================="
