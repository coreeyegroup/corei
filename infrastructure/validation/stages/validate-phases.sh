#!/usr/bin/env bash

set -euo pipefail

ROOT="$HOME/corei"

required=(
  infrastructure/phases/stage-01-machine-foundation
  infrastructure/phases/stage-02-repository-foundation
  infrastructure/phases/stage-03-platform-governance-foundation
)

FAIL=0

echo "========== PHASE VALIDATION =========="

for stage in "${required[@]}"; do

  if [ -d "$ROOT/$stage" ]; then
    echo "PASS → $stage"
  else
    echo "FAIL → $stage"
    FAIL=1
  fi

done

echo ""

if [ $FAIL -eq 0 ]; then
  echo "STATUS: PASS"
else
  echo "STATUS: FAIL"
fi
