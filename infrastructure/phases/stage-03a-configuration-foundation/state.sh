#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$HOME/corei"

echo "========================================="
echo "Stage 03A Configuration State"
echo "========================================="

echo
echo "Configuration Scripts:"
find "$ROOT_DIR/scripts/config" \
-type f | sort

echo
echo "Configuration Schemas:"
find "$ROOT_DIR/infrastructure/config/schemas" \
-type f | sort

echo
echo "Configuration Runtime Artifacts:"
find "$ROOT_DIR/infrastructure/config" \
-type f | sort

echo
echo "Stage 03A Runtime Inventory:"
find "$ROOT_DIR/infrastructure/state/stage-03a" \
-type f | sort
