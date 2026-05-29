#!/usr/bin/env bash

set -euo pipefail

echo "====================================="
echo "STAGE-21F-J-C FINAL SECURITY MANIFEST"
echo "====================================="

bash scripts/security/kafka/validate-final-security-manifest.sh

echo
echo "[PASS] Stage-21F-J-C completed"
