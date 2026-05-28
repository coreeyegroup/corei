#!/usr/bin/env bash
set -euo pipefail

SNAPSHOT_DIR="infrastructure/freeze/stage-13/snapshots"
TIMESTAMP=$(date +%Y%m%d-%H%M%S)

mkdir -p "$SNAPSHOT_DIR"

find \
  docs \
  infrastructure \
  kubernetes \
  schemas \
  services \
  > "$SNAPSHOT_DIR/stage13-snapshot-$TIMESTAMP.txt"

echo "[Stage-13] Snapshot generated"
echo "$SNAPSHOT_DIR/stage13-snapshot-$TIMESTAMP.txt"
