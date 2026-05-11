#!/usr/bin/env bash

set -euo pipefail

SNAPSHOT_DIR="$HOME/corei/.snapshots"

mkdir -p "$SNAPSHOT_DIR"

SNAPSHOT_FILE="$SNAPSHOT_DIR/stage-03-governance-foundation.tar.gz"

tar -czf "$SNAPSHOT_FILE" \
    "$HOME/corei/docs/stage-03" \
    "$HOME/corei/scripts/governance" \
    "$HOME/corei/governance"

echo "Snapshot created:"
echo "$SNAPSHOT_FILE"
