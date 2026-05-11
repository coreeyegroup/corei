#!/usr/bin/env bash

set -euo pipefail

echo "========================================="
echo "Stage 03A Configuration Validation"
echo "========================================="

"$HOME/corei/scripts/config/validate-config.sh"
