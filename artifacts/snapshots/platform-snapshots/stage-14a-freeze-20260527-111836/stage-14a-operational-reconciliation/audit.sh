#!/bin/bash

set -e

TIMESTAMP=$(date -u +"%Y%m%d-%H%M%S")

AUDIT_DIR="infrastructure/phases/stage-14a-operational-reconciliation/audit"

mkdir -p $AUDIT_DIR

echo "[Stage-14A] Generating operational audit artifacts..."

find runtime/stage-14/events \
> $AUDIT_DIR/event-lineage-$TIMESTAMP.txt

find runtime/stage-14/logs \
> $AUDIT_DIR/runtime-logs-$TIMESTAMP.txt

find docs/governance \
| grep "trading-" \
> $AUDIT_DIR/governance-$TIMESTAMP.txt

echo "[Stage-14A] Operational audit completed"
