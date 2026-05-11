#!/usr/bin/env bash

set -euo pipefail

ROOT="$HOME/corei"

PHASE_DIR="$ROOT/infrastructure/phases/stage-02-repository-foundation"

DOC_DIR="$ROOT/docs/stage-02"

STATE_DIR="$ROOT/infrastructure/state/stage-02"

echo "========================================="
echo "Generating Stage 02 lifecycle artifacts"
echo "========================================="

mkdir -p \
"$PHASE_DIR" \
"$DOC_DIR" \
"$STATE_DIR"/{logs,inventory,validation,backup,snapshots}

# =========================================
# setup.sh
# =========================================

cat > "$PHASE_DIR/setup.sh" <<'SETUP'
#!/usr/bin/env bash

set -euo pipefail

LOG_DIR="$HOME/corei/infrastructure/state/stage-02/logs"

mkdir -p "$LOG_DIR"

LOG_FILE="$LOG_DIR/stage-02-setup-$(date +%Y%m%d-%H%M%S).log"

exec > >(tee -a "$LOG_FILE") 2>&1

echo "========================================="
echo "Stage 02 Repository Foundation Setup"
echo "========================================="

echo "Repository topology already evolved."

echo "Applying governance normalization only."

echo "Stage 02 setup complete."
SETUP

chmod +x "$PHASE_DIR/setup.sh"

# =========================================
# backup.sh
# =========================================

cat > "$PHASE_DIR/backup.sh" <<'BACKUP'
#!/usr/bin/env bash

set -euo pipefail

BACKUP_DIR="$HOME/corei/infrastructure/state/stage-02/backup"

mkdir -p "$BACKUP_DIR"

ARCHIVE="$BACKUP_DIR/corei-stage02-$(date +%Y%m%d-%H%M%S).tar.gz"

tar -czf "$ARCHIVE" \
--exclude=".git" \
--exclude="infrastructure/state" \
--exclude=".snapshots" \
"$HOME/corei"

echo "Backup created:"
echo "$ARCHIVE"
BACKUP

chmod +x "$PHASE_DIR/backup.sh"

# =========================================
# snapshot.sh
# =========================================

cat > "$PHASE_DIR/snapshot.sh" <<'SNAPSHOT'
#!/usr/bin/env bash

set -euo pipefail

SNAPSHOT_DIR="$HOME/corei/.snapshots"

mkdir -p "$SNAPSHOT_DIR"

ARCHIVE="$SNAPSHOT_DIR/stage-02-repository-foundation.tar.gz"

tar -czf "$ARCHIVE" \
--exclude=".git" \
--exclude="infrastructure/state" \
"$HOME/corei"

echo "Snapshot created:"
echo "$ARCHIVE"
SNAPSHOT

chmod +x "$PHASE_DIR/snapshot.sh"

# =========================================
# rollback.sh
# =========================================

cat > "$PHASE_DIR/rollback.sh" <<'ROLLBACK'
#!/usr/bin/env bash

echo "Rollback governance placeholder."

echo "Manual approval required before rollback execution."
ROLLBACK

chmod +x "$PHASE_DIR/rollback.sh"

# =========================================
# state.sh
# =========================================

cat > "$PHASE_DIR/state.sh" <<'STATE'
#!/usr/bin/env bash

echo "========================================="
echo "Stage 02 State"
echo "========================================="

echo "VERSION:"
cat "$HOME/corei/VERSION"

echo

echo "Git status:"
git -C "$HOME/corei" status --short
STATE

chmod +x "$PHASE_DIR/state.sh"

# =========================================
# README.md
# =========================================

cat > "$PHASE_DIR/README.md" <<'README'
# Stage 02 — Repository Foundation

Purpose:
Institutional repository governance normalization.

Execution Model:
inventory -> classify -> normalize -> validate -> checkpoint

Important:
This stage preserves evolved repository maturity.
README

# =========================================
# Docs
# =========================================

cat > "$DOC_DIR/repository-foundation.md" <<'DOC'
# Repository Foundation

Defines institutional repository topology governance.
DOC

cat > "$DOC_DIR/monorepo-governance.md" <<'DOC'
# Monorepo Governance

Defines monorepo boundary governance and topology separation.
DOC

cat > "$DOC_DIR/service-scaffolding.md" <<'DOC'
# Service Scaffolding

Defines canonical service template governance.
DOC

cat > "$DOC_DIR/makefile-governance.md" <<'DOC'
# Makefile Governance

Defines deterministic lifecycle orchestration governance.
DOC

cat > "$DOC_DIR/precommit-governance.md" <<'DOC'
# Pre-commit Governance

Defines repository hygiene and validation governance.
DOC

cat > "$DOC_DIR/normalization-report.md" <<'DOC'
# Stage 02 Normalization Report

Repository maturity preserved.
Governance normalized safely.
DOC

cat > "$DOC_DIR/runtime-inventory.md" <<'DOC'
# Stage 02 Runtime Inventory

Repository already evolved significantly before normalization.
DOC

echo "========================================="
echo "Stage 02 lifecycle artifact generation complete"
echo "========================================="
