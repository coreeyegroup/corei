#!/usr/bin/env bash
set -euo pipefail

SNAPSHOT_DIR="$HOME/corei/infrastructure/state/stage-01/snapshots"

mkdir -p "$SNAPSHOT_DIR"

SNAPSHOT_FILE="$SNAPSHOT_DIR/stage-01-$(date +%Y%m%d-%H%M%S).snapshot"

echo "Stage 01 snapshot metadata" > "$SNAPSHOT_FILE"

echo "[INFO] Snapshot metadata written -> $SNAPSHOT_FILE"
