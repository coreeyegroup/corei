#!/usr/bin/env bash
set -euo pipefail

echo "[Stage-13] Registering portfolio schemas..."

SCHEMAS=(
  "portfolio-state.avsc"
  "position-state.avsc"
  "pnl-state.avsc"
  "exposure-state.avsc"
)

for schema in "${SCHEMAS[@]}"; do
  if [[ ! -f "schemas/portfolio/avro/$schema" ]]; then
    echo "[FAIL] Missing schema: $schema"
    exit 1
  fi

  echo "[PASS] Schema ready: $schema"
done

echo "[Stage-13] Portfolio schema registration validation PASSED"

exit 0
