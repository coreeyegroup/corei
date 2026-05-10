#!/usr/bin/env bash

OUTPUT_DIR="$HOME/corei/infrastructure/state/stage-02/inventory"

mkdir -p "$OUTPUT_DIR"

tree -L 2 "$HOME/corei" \
> "$OUTPUT_DIR/repository-tree.txt"

echo "[INFO] Repository inventory generated."
