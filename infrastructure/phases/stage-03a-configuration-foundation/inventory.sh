#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$HOME/corei"
STATE_DIR="$ROOT_DIR/infrastructure/state/stage-03a/inventory"

mkdir -p "$STATE_DIR"

echo "========================================="
echo "Stage 03A Configuration Inventory"
echo "========================================="

find \
"$ROOT_DIR/infrastructure/config" \
-type f | sort \
> "$STATE_DIR/config-files.txt"

find \
"$ROOT_DIR/infrastructure/config/schemas" \
-type f | sort \
> "$STATE_DIR/config-schemas.txt"

find \
"$ROOT_DIR/scripts/config" \
-type f | sort \
> "$STATE_DIR/config-scripts.txt"

find \
"$ROOT_DIR/docs" \
-type f | grep "stage-03a" | sort \
> "$STATE_DIR/config-docs.txt" || true

find \
"$ROOT_DIR/infrastructure/config/lineage" \
-type f | sort \
> "$STATE_DIR/config-lineage.txt"

echo
echo "Inventory complete:"
find "$STATE_DIR" -type f | sort
