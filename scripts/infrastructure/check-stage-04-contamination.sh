#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$HOME/corei"
AUDIT_DIR="$ROOT_DIR/infrastructure/state/stage-04/audit"
REPORT_FILE="$AUDIT_DIR/contamination-report.txt"

mkdir -p "$AUDIT_DIR"

TMP_REPORT=$(mktemp)

echo "========================================="
echo "Stage 04 Contamination Audit"
echo "========================================="

grep -RniIE \
"stage-04|infra-foundation|terraform 1.15|docker-ce-cli" \
"$ROOT_DIR" \
--exclude-dir=.git \
--exclude-dir=.snapshots \
--exclude-dir=scratch \
--exclude-dir=artifacts \
--exclude="contamination-report.txt" \
> "$TMP_REPORT" || true

mv "$TMP_REPORT" "$REPORT_FILE"

find \
"$ROOT_DIR/scripts" \
-type f | grep -Ei \
"docker|terraform|helm|kubectl|registry|containerd" \
| sort \
> "$AUDIT_DIR/runtime-tooling-audit.txt"

find \
"$ROOT_DIR/infrastructure/validation" \
-type f | grep -Ei \
"stage-04|infra|docker|terraform" \
| sort \
> "$AUDIT_DIR/validation-audit.txt" || true

echo
echo "Contamination audit complete:"
find "$AUDIT_DIR" -type f | sort
