#!/usr/bin/env bash

set -euo pipefail

ROOT="$HOME/corei"

required=(
  docs/governance/filesystem-governance.md
  docs/governance/repository-topology.md
  docs/governance/installer-governance.md
  docs/standards/engineering-principles.md
)

FAIL=0

echo "========== GOVERNANCE VALIDATION =========="

for file in "${required[@]}"; do

  if [ -f "$ROOT/$file" ]; then
    echo "PASS → $file"
  else
    echo "FAIL → $file"
    FAIL=1
  fi

done

echo ""

if [ $FAIL -eq 0 ]; then
  echo "STATUS: PASS"
else
  echo "STATUS: FAIL"
fi
