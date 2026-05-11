#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$HOME/corei"
SNAPSHOT_DIR="$ROOT_DIR/.snapshots"

mkdir -p "$SNAPSHOT_DIR"

tar -czf \
"$SNAPSHOT_DIR/stage-04-infra-foundation.tar.gz" \
"$ROOT_DIR/terraform" \
"$ROOT_DIR/scripts/infrastructure" \
"$ROOT_DIR/infrastructure/components"

echo
echo "Snapshot created:"
echo "$SNAPSHOT_DIR/stage-04-infra-foundation.tar.gz"
