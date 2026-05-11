#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$HOME/corei"

echo "========================================="
echo "Stage 04 Infrastructure Validation"
echo "========================================="

"$ROOT_DIR/scripts/infrastructure/validate-runtime.sh"

echo
echo "STAGE 04 VALIDATION: PASS"
