#!/usr/bin/env bash
set -euo pipefail

echo "[Stage-13] Validating replay governance..."

FILES=(
  "infrastructure/replay/portfolio/datasets/synthetic-fills.json"
  "infrastructure/replay/portfolio/contracts/replay-governance.md"
)

for file in "${FILES[@]}"; do
  if [[ ! -f "$file" ]]; then
    echo "[FAIL] Missing replay asset: $file"
    exit 1
  fi

  echo "[PASS] Replay asset exists: $file"
done

echo "[Stage-13] Replay governance validation PASSED"

exit 0
