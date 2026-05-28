#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")"/../.. && pwd)"

SERVICES=(
  config-service
  config-snapshot-service
  identity-service
  audit-service
  event-ingestion-service
)

echo "=================================================="
echo "DEPLOYING PLATFORM SERVICES"
echo "=================================================="

for service in "${SERVICES[@]}"
do

    echo
    echo "Deploying ${service}"

    helm upgrade --install "${service}" \
      "${ROOT_DIR}/services/${service}/helm" \
      -n platform \
      --create-namespace \
      --wait \
      --timeout 90s

    kubectl rollout status \
      deployment/${service} \
      -n platform \
      --timeout=90s

    echo "[READY] ${service}"

done

echo
echo "PLATFORM SERVICES DEPLOYED"
