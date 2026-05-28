#!/usr/bin/env bash

set -euo pipefail

SERVICES=(
  config-service
  config-snapshot-service
  identity-service
  audit-service
  event-ingestion-service
)

echo "=================================================="
echo "PLATFORM SERVICE VALIDATION"
echo "=================================================="

for service in "${SERVICES[@]}"
do

    kubectl get deployment "${service}" \
      -n platform >/dev/null

    echo "[PASS] ${service}"

done

echo
echo "PLATFORM SERVICE VALIDATION PASSED"
