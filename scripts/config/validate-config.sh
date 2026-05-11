#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$HOME/corei"
CONFIG_DIR="$ROOT_DIR/infrastructure/config"

FAILURES=0

echo "========================================="
echo "Stage 3A Configuration Validation"
echo "========================================="

required_files=(
  "$CONFIG_DIR/environments/development.yaml"
  "$CONFIG_DIR/environments/staging.yaml"
  "$CONFIG_DIR/environments/production.yaml"
  "$CONFIG_DIR/instruments/instruments.yaml"
  "$CONFIG_DIR/brokers/brokers.yaml"
  "$CONFIG_DIR/accounts/accounts.yaml"
  "$CONFIG_DIR/risk/risk-limits.yaml"
  "$CONFIG_DIR/runtime/runtime.yaml"
  "$CONFIG_DIR/feature-flags/feature-flags.yaml"
)

for file in "${required_files[@]}"; do
  if [[ -f "$file" ]]; then
    echo "PASS -> exists: $file"
  else
    echo "FAIL -> missing: $file"
    FAILURES=$((FAILURES + 1))
  fi
done

echo
echo "Checking PAPER mode enforcement..."

if grep -q "operation_mode: PAPER" \
"$CONFIG_DIR/accounts/accounts.yaml"; then
  echo "PASS -> accounts in PAPER mode"
else
  echo "FAIL -> non-PAPER accounts detected"
  FAILURES=$((FAILURES + 1))
fi

echo
echo "Checking risk limits..."

if grep -q ": 0" \
"$CONFIG_DIR/risk/risk-limits.yaml"; then
  echo "FAIL -> zero-value risk limits detected"
  FAILURES=$((FAILURES + 1))
else
  echo "PASS -> risk limits valid"
fi

echo
echo "Checking lineage..."

if [[ -f "$CONFIG_DIR/lineage/bootstrap-lineage.yaml" ]]; then
  echo "PASS -> lineage artifact exists"
else
  echo "FAIL -> missing lineage artifact"
  FAILURES=$((FAILURES + 1))
fi

echo
echo "Checking snapshots..."

if [[ -f "$CONFIG_DIR/snapshots/bootstrap/bootstrap-snapshot.yaml" ]]; then
  echo "PASS -> snapshot artifact exists"
else
  echo "FAIL -> missing snapshot artifact"
  FAILURES=$((FAILURES + 1))
fi

echo
if [[ "$FAILURES" -eq 0 ]]; then
  echo "========================================="
  echo "CONFIG VALIDATION: PASS"
  echo "========================================="
  exit 0
else
  echo "========================================="
  echo "CONFIG VALIDATION: FAIL"
  echo "========================================="
  exit 1
fi
