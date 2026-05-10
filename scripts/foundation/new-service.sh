#!/usr/bin/env bash

set -euo pipefail

ROOT="$HOME/corei"
TEMPLATE="$ROOT/services/_template"

if [ $# -ne 1 ]; then
  echo "Usage:"
  echo "  new-service.sh <service-name>"
  exit 1
fi

SERVICE_NAME="$1"
TARGET="$ROOT/services/$SERVICE_NAME"

if [ -d "$TARGET" ]; then
  echo "ERROR: Service already exists"
  exit 1
fi

echo "======================================="
echo "COREI — SERVICE GENERATOR"
echo "======================================="

echo "[1] Creating service from template"

cp -r "$TEMPLATE" "$TARGET"

echo "[2] Injecting service metadata"

sed -i "s/service-template/$SERVICE_NAME/g" \
"$TARGET/Makefile" || true

echo "[3] Creating ownership metadata"

cat > "$TARGET/service-metadata.yaml" <<META
service:
  name: $SERVICE_NAME

ownership:
  bounded_context: true

runtime:
  replay_safe: true
  observability_required: true
META

echo "[4] Creating service README"

cat > "$TARGET/README.md" <<README
# $SERVICE_NAME

Generated from Corei canonical service template.

## GOVERNANCE

This service inherits:

- bounded ownership
- observability requirements
- replay-first principles
- deterministic runtime governance

## REQUIRED SURFACES

- /health
- /metrics
- /version
- /config
README

echo ""
echo "======================================="
echo "SERVICE CREATED"
echo "======================================="
echo "Path: $TARGET"
