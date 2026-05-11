#!/usr/bin/env bash

set -euo pipefail

ROOT="$HOME/corei"

OUTPUT="$ROOT/scratch/contaminated-script-report.txt"

mkdir -p "$ROOT/scratch"

echo "========================================="
echo "Contaminated Script Inventory"
echo "========================================="

find "$ROOT" \
-type f \
\( \
-name "*.sh" -o \
-name "*.py" -o \
-name "*.ps1" \
\) \
| sort \
> "$OUTPUT"

echo
echo "Inventory written:"
echo "$OUTPUT"
