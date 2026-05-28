#!/usr/bin/env bash
set -euo pipefail

INPUT_FILE="infrastructure/replay/portfolio/datasets/synthetic-fills.json"
OUTPUT_FILE="infrastructure/replay/portfolio/hashes/replay.sha256"

sha256sum "$INPUT_FILE" > "$OUTPUT_FILE"

echo "[Stage-13] Replay hash generated"
cat "$OUTPUT_FILE"
