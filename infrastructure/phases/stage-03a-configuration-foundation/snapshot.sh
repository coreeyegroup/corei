#!/usr/bin/env bash

set -euo pipefail

SNAPSHOT_DIR="$HOME/corei/.snapshots"

mkdir -p "$SNAPSHOT_DIR"

tar -czf \
"$SNAPSHOT_DIR/stage-03a-configuration-foundation.tar.gz" \
"$HOME/corei/infrastructure/config"

echo "Snapshot created:"
echo "$SNAPSHOT_DIR/stage-03a-configuration-foundation.tar.gz"
