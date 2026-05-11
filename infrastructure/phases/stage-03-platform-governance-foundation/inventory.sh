#!/usr/bin/env bash

set -euo pipefail

ROOT="$HOME/corei"

OUTPUT_DIR="$ROOT/infrastructure/state/stage-03/inventory"

mkdir -p "$OUTPUT_DIR"

echo "========================================="
echo "Stage 03 Governance Inventory"
echo "========================================="

# =========================================
# Governance directories
# =========================================

find "$ROOT/governance" -maxdepth 3 -type f \
| sort \
> "$OUTPUT_DIR/governance-files.txt"

# =========================================
# Schema inventory
# =========================================

find "$ROOT/schemas" -type f \
| sort \
> "$OUTPUT_DIR/schema-files.txt"

# =========================================
# Contract inventory
# =========================================

find "$ROOT/contracts" -type f \
| sort \
> "$OUTPUT_DIR/contract-files.txt"

# =========================================
# Platform registry inventory
# =========================================

find "$ROOT/platform/system-registry" -type f \
| sort \
> "$OUTPUT_DIR/system-registry-files.txt"

# =========================================
# Governance scripts
# =========================================

find "$ROOT/scripts/governance" -type f \
| sort \
> "$OUTPUT_DIR/governance-scripts.txt"

# =========================================
# Architecture docs
# =========================================

find "$ROOT/docs" \
\( \
-path "*/architecture/*" -o \
-path "*/governance/*" \
\) \
-type f \
| sort \
> "$OUTPUT_DIR/architecture-governance-docs.txt"

echo
echo "Inventory complete:"
find "$OUTPUT_DIR" -type f | sort
