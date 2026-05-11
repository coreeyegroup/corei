#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$HOME/corei"
SNAPSHOT_DIR="$ROOT_DIR/.snapshots"

mkdir -p "$SNAPSHOT_DIR"

tar -czf \
"$SNAPSHOT_DIR/stage-05-k8s-platform.tar.gz" \
"$ROOT_DIR/kubernetes" \
"$ROOT_DIR/scripts/kubernetes" \
"$ROOT_DIR/infrastructure/phases/stage-05-k8s-platform"

echo
echo "Snapshot created:"
echo "$SNAPSHOT_DIR/stage-05-k8s-platform.tar.gz"
