#!/bin/bash

set -e

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/../../../.." && pwd)"

TIMESTAMP=$(date +%Y%m%d-%H%M%S)

SNAPSHOT_DIR="$ROOT_DIR/snapshots/stage09-$TIMESTAMP"

mkdir -p "$SNAPSHOT_DIR"

kubectl get all -n observability -o yaml > "$SNAPSHOT_DIR/observability-resources.yaml"

kubectl get configmaps -n observability -o yaml > "$SNAPSHOT_DIR/configmaps.yaml"

kubectl get secrets -n observability -o yaml > "$SNAPSHOT_DIR/secrets.yaml"

echo ""
echo "Snapshot created:"
echo "$SNAPSHOT_DIR"
echo ""
