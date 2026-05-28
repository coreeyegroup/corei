#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="${ROOT_DIR:-$HOME/corei}"

echo "=================================================="
echo "STAGE 20 FOUNDATION SETUP"
echo "=================================================="

create_dir() {
  local path="$1"

  mkdir -p "$path"

  echo "[OK] Directory ensured: $path"
}

echo
echo "[1/8] Creating Stage 20 directory structure..."

create_dir "$ROOT_DIR/scripts/platform/live-activation"
create_dir "$ROOT_DIR/scripts/platform/live-validation"

create_dir "$ROOT_DIR/ops/live-activation"

create_dir "$ROOT_DIR/state/live-activation"

create_dir "$ROOT_DIR/logs/live-activation"

create_dir "$ROOT_DIR/docs/stage-20"

echo
echo "[2/8] Creating operational state files..."

touch "$ROOT_DIR/state/live-activation/live-activation.state"
touch "$ROOT_DIR/state/live-activation/live-observation.state"

echo "[OK] State files created"

echo
echo "[3/8] Creating operational log files..."

touch "$ROOT_DIR/logs/live-activation/live-activation.log"
touch "$ROOT_DIR/logs/live-activation/live-observation.log"
touch "$ROOT_DIR/logs/live-activation/live-validation.log"

echo "[OK] Log files created"

echo
echo "[4/8] Creating placeholder governance documents..."

cat <<'DOC' > "$ROOT_DIR/docs/stage-20/README.md"
# Stage 20 — Live Trading Activation

Institutional live trading activation governance.

This directory contains:
- activation governance
- broker onboarding procedures
- LIVE_SEMI controls
- LIVE_AUTO governance
- rollback procedures
- operational validation
DOC

echo "[OK] README created"

echo
echo "[5/8] Creating activation configuration template..."

cat <<'CFG' > "$ROOT_DIR/ops/live-activation/live-activation.env"
LIVE_ACTIVATION_ENABLED=false
LIVE_SEMI_ENABLED=false
LIVE_AUTO_ENABLED=false

PRIMARY_BROKER=unset
PRIMARY_ACCOUNT=unset

MAX_LIVE_CAPITAL=0
RISK_ADMIN_REQUIRED=true

LIVE_OBSERVATION_REQUIRED_HOURS=48
CFG

echo "[OK] live-activation.env created"

echo
echo "[6/8] Updating install.state..."

INSTALL_STATE="$ROOT_DIR/state/install.state"

touch "$INSTALL_STATE"

update_state() {
  local key="$1"
  local value="$2"

  if grep -q "^${key}=" "$INSTALL_STATE"; then
    sed -i "s/^${key}=.*/${key}=${value}/" "$INSTALL_STATE"
  else
    echo "${key}=${value}" >> "$INSTALL_STATE"
  fi
}

update_state "STAGE_20_FOUNDATION" "COMPLETED"

echo "[OK] install.state updated"

echo
echo "[7/8] Creating execution marker..."

date -u +"%Y-%m-%dT%H:%M:%SZ" \
  > "$ROOT_DIR/state/live-activation/stage-20-foundation.timestamp"

echo "[OK] Timestamp created"

echo
echo "[8/8] Foundation validation..."

required_paths=(
  "$ROOT_DIR/scripts/platform/live-activation"
  "$ROOT_DIR/scripts/platform/live-validation"
  "$ROOT_DIR/ops/live-activation"
  "$ROOT_DIR/state/live-activation"
  "$ROOT_DIR/logs/live-activation"
  "$ROOT_DIR/docs/stage-20"
)

for path in "${required_paths[@]}"; do
  if [[ ! -e "$path" ]]; then
    echo "[FAIL] Missing path: $path"
    exit 1
  fi
done

echo "[OK] Foundation validation passed"

echo
echo "=================================================="
echo "STAGE 20 FOUNDATION SETUP COMPLETED"
echo "=================================================="
