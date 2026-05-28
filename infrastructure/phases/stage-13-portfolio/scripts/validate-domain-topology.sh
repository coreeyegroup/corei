#!/usr/bin/env bash
set -euo pipefail

echo "[Stage-13] Validating portfolio domain topology..."

SERVICES=(
  "portfolio-service"
  "exposure-service"
  "capital-partition-service"
)

for service in "${SERVICES[@]}"; do
  if [[ ! -d "services/$service" ]]; then
    echo "[FAIL] Missing service topology: $service"
    exit 1
  fi

  echo "[PASS] Service topology exists: $service"
done

echo "[Stage-13] Portfolio domain topology validation PASSED"

exit 0
