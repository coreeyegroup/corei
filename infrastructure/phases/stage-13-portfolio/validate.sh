#!/usr/bin/env bash
set -euo pipefail

echo "[Stage-13] Authoritative validation lifecycle initialized"

VALIDATORS=(
  "validate-domain-topology.sh"
  "validate-persistence-governance.sh"
  "validate-capital-governance.sh"
  "validate-replay-governance.sh"
  "validate-audit-governance.sh"
)

for validator in "${VALIDATORS[@]}"; do
  echo
  echo "[Stage-13] Running: $validator"

  bash "infrastructure/phases/stage-13-portfolio/scripts/$validator"
done

FREEZE_FILES=(
  "docs/governance/stage13-freeze-governance.md"
  "infrastructure/freeze/stage-13/recovery/recovery-governance.md"
  "infrastructure/freeze/stage-13/snapshots/snapshot-governance.md"
)

echo
echo "[Stage-13] Validating freeze governance..."

for file in "${FREEZE_FILES[@]}"; do
  if [[ ! -f "$file" ]]; then
    echo "[FAIL] Missing freeze governance artifact: $file"
    exit 1
  fi

  echo "[PASS] Freeze governance artifact exists: $file"
done

echo
echo "[Stage-13] FULL VALIDATION PASSED"

exit 0
