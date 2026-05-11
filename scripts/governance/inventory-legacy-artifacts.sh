#!/usr/bin/env bash

set -euo pipefail

ROOT="$HOME/corei"

OUTPUT_DIR="$ROOT/scratch/legacy-cleanup/inventory"

mkdir -p "$OUTPUT_DIR"

echo "========================================="
echo "Legacy Artifact Inventory"
echo "========================================="

# =========================================
# Stage lifecycle artifacts
# =========================================

find "$ROOT/infrastructure/phases" -type f \
| sort \
> "$OUTPUT_DIR/stage-lifecycle-files.txt"

# =========================================
# Foundation scripts
# =========================================

find "$ROOT/scripts/foundation" -type f \
| sort \
> "$OUTPUT_DIR/foundation-scripts.txt"

# =========================================
# Governance scripts
# =========================================

find "$ROOT/scripts/governance" -type f \
| sort \
> "$OUTPUT_DIR/governance-scripts.txt"

# =========================================
# Runtime state
# =========================================

find "$ROOT/infrastructure/state" -type f \
| sort \
> "$OUTPUT_DIR/runtime-state-files.txt"

# =========================================
# Snapshot artifacts
# =========================================

find "$ROOT/.snapshots" -type f 2>/dev/null \
| sort \
> "$OUTPUT_DIR/snapshot-files.txt" || true

# =========================================
# Backup artifacts
# =========================================

find "$ROOT" -name "*backup*" -type f \
| sort \
> "$OUTPUT_DIR/backup-files.txt"

# =========================================
# Temporary/recovery artifacts
# =========================================

find "$ROOT" \
\( \
-name "*.tmp" -o \
-name "*.bak" -o \
-name "*recovery*" -o \
-name "*old*" -o \
-name "*legacy*" \
\) \
-type f \
| sort \
> "$OUTPUT_DIR/temp-recovery-files.txt"

# =========================================
# Makefile-related artifacts
# =========================================

find "$ROOT" \
\( \
-name "Makefile*" -o \
-name "*makefile*" \
\) \
-type f \
| sort \
> "$OUTPUT_DIR/makefile-artifacts.txt"

echo "========================================="
echo "Inventory complete"
echo "========================================="

echo
echo "Generated reports:"
echo

find "$OUTPUT_DIR" -type f | sort
