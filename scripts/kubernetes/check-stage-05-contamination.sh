#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$HOME/corei"
AUDIT_DIR="$ROOT_DIR/infrastructure/state/stage-05/audit"

mkdir -p "$AUDIT_DIR"

echo "========================================="
echo "Stage 05 Contamination Audit"
echo "========================================="

find \
"$ROOT_DIR/kubernetes" \
-type f | sort \
> "$AUDIT_DIR/kubernetes-manifests.txt"

find \
"$ROOT_DIR/scripts/kubernetes" \
-type f | sort \
> "$AUDIT_DIR/runtime-tooling-audit.txt"

find \
"$ROOT_DIR/infrastructure/phases/stage-05-k8s-platform" \
-type f | sort \
> "$AUDIT_DIR/lifecycle-audit.txt"

find \
"$ROOT_DIR/infrastructure/components" \
-maxdepth 1 \
-type d | sort \
> "$AUDIT_DIR/future-platform-domains.txt"

grep -RniE \
"stage-05|k8s-platform|kubernetes|calico" \
"$ROOT_DIR" \
--exclude-dir=.git \
--exclude-dir=.snapshots \
--exclude-dir=scratch \
--exclude=contamination-report.txt \
> "$AUDIT_DIR/contamination-report.txt" || true

echo
echo "Contamination audit complete:"
find "$AUDIT_DIR" -type f | sort
