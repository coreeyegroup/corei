#!/bin/bash

set -e

TIMESTAMP=$(date +%Y%m%d-%H%M%S)

mkdir -p infrastructure/phases/stage-14a-operational-reconciliation/snapshots/$TIMESTAMP

cp -r core_platform/services \
infrastructure/phases/stage-14a-operational-reconciliation/snapshots/$TIMESTAMP/

cp -r infrastructure/replay/stage-14 \
infrastructure/phases/stage-14a-operational-reconciliation/snapshots/$TIMESTAMP/

echo "[Stage-14A] Snapshot completed: $TIMESTAMP"
