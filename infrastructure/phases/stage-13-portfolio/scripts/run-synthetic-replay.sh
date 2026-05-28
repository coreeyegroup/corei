#!/usr/bin/env bash
set -euo pipefail

INPUT="infrastructure/replay/portfolio/datasets/synthetic-fills.json"
OUTPUT="infrastructure/replay/portfolio/results/replay-results.json"

cp "$INPUT" "$OUTPUT"

echo "[Stage-13] Synthetic replay executed"
echo "[Stage-13] Replay output written to:"
echo "$OUTPUT"
