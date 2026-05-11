#!/usr/bin/env bash

set -euo pipefail

SNAPSHOT_DIR="$HOME/corei/.snapshots"

mkdir -p "$SNAPSHOT_DIR"

ARCHIVE="$SNAPSHOT_DIR/stage-02-repository-foundation.tar.gz"

tar -czf "$ARCHIVE" \
--exclude=".git" \
--exclude="infrastructure/state" \
"$HOME/corei"

echo "Snapshot created:"
echo "$ARCHIVE"
