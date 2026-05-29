#!/usr/bin/env bash

set -euo pipefail

echo "====================================="
echo "STAGE-21F-J-D"
echo "REAL STATEFULSET GENERATION"
echo "====================================="

bash scripts/security/kafka/validate-real-statefulset-generation.sh

echo
echo "[PASS] Stage-21F-J-D completed"
