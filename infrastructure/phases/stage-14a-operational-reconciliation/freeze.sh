#!/bin/bash

set -e

TIMESTAMP=$(date -u +"%Y%m%d-%H%M%S")

FREEZE_DIR="snapshots/stage-14a-freeze-$TIMESTAMP"

mkdir -p $FREEZE_DIR

echo "[Stage-14A] Creating certification freeze snapshot..."

cp -r infrastructure/phases/stage-14a-operational-reconciliation \
$FREEZE_DIR/

cp -r runtime/stage-14 \
$FREEZE_DIR/

cp -r docs/governance \
$FREEZE_DIR/

cp -r core_platform/services \
$FREEZE_DIR/

cp -r schemas \
$FREEZE_DIR/

echo "[Stage-14A] Freeze snapshot created:"
echo "$FREEZE_DIR"
