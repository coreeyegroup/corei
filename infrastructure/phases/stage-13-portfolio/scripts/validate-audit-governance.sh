#!/usr/bin/env bash
set -euo pipefail

echo "[Stage-13] Validating audit governance..."

FILES=(
  "infrastructure/audit/portfolio/evidence/replay-certification.json"
  "infrastructure/audit/portfolio/evidence/capital-certification.json"
  "infrastructure/audit/portfolio/evidence/reconciliation-evidence.json"
  "infrastructure/audit/portfolio/reconciliation/reconciliation-governance.md"
)

for file in "${FILES[@]}"; do
  if [[ ! -f "$file" ]]; then
    echo "[FAIL] Missing audit artifact: $file"
    exit 1
  fi

  echo "[PASS] Audit artifact exists: $file"
done

echo "[Stage-13] Audit governance validation PASSED"

exit 0
