#!/usr/bin/env bash
set -euo pipefail

OUTPUT_DIR="infrastructure/phases/stage-13-portfolio/audit"
TIMESTAMP=$(date +%Y%m%d-%H%M%S)

mkdir -p "$OUTPUT_DIR"

find docs/blueprints \
  -name "*stage-13*" \
  > "$OUTPUT_DIR/stage13-blueprints-$TIMESTAMP.txt"

find docs/governance \
  -name "*portfolio*" \
  > "$OUTPUT_DIR/stage13-governance-$TIMESTAMP.txt"

echo "[Stage-13] Audit completed"
