#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$HOME/corei"

echo "========================================="
echo "Stage 06 Security Validation"
echo "========================================="

"$ROOT_DIR/scripts/security/validate-security.sh"

echo
echo "STAGE 06 VALIDATION: PASS"
