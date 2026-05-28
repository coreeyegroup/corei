#!/usr/bin/env bash
set -euo pipefail

echo "[Stage-13] Validating capital partition governance..."

FILES=(
  "schemas/portfolio/capital/allocation-state.avsc"
  "schemas/portfolio/capital/capital-reservation.avsc"
  "schemas/portfolio/capital/capital-partition.avsc"
  "infrastructure/persistence/portfolio/postgresql/migrations/006_capital_partitions.sql"
  "infrastructure/persistence/portfolio/postgresql/migrations/007_capital_reservations.sql"
)

for file in "${FILES[@]}"; do
  if [[ ! -f "$file" ]]; then
    echo "[FAIL] Missing governance asset: $file"
    exit 1
  fi

  echo "[PASS] Governance asset exists: $file"
done

echo "[Stage-13] Capital partition governance validation PASSED"

exit 0
