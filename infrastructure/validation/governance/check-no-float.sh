#!/bin/bash

set -e

ROOT="$HOME/corei"

echo ""
echo "=========================================="
echo "NO FLOAT GOVERNANCE CHECK"
echo "=========================================="

if grep -R "float" "$ROOT/services" 2>/dev/null; then
  echo ""
  echo "FAIL → float detected"
  exit 1
fi

if grep -R "double" "$ROOT/services" 2>/dev/null; then
  echo ""
  echo "FAIL → double detected"
  exit 1
fi

echo "PASS → no float violations"
