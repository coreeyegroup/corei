#!/usr/bin/env bash

set -euo pipefail

ROOT="$HOME/corei"

required=(
  infrastructure
  services
  system
  governance
  policies
  docs
  scripts
  schemas
)

FAIL=0

echo "========== ROOT STRUCTURE VALIDATION =========="

for dir in "${required[@]}"; do

  if [ -d "$ROOT/$dir" ]; then
    echo "PASS → $dir"
  else
    echo "FAIL → $dir"
    FAIL=1
  fi

done

echo ""

if [ $FAIL -eq 0 ]; then
  echo "STATUS: PASS"
else
  echo "STATUS: FAIL"
fi
