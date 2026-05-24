#!/usr/bin/env bash

set -euo pipefail

echo "=================================================="
echo "STAGE-10 :: CI/CD FOUNDATION"
echo "PHASE-A :: HARBOR FOUNDATION"
echo "=================================================="

echo ""
echo "[EXECUTION] Harbor installation lifecycle..."

bash infrastructure/components/registry/install.sh

echo ""
echo "[EXECUTION] Harbor configuration lifecycle..."

bash infrastructure/components/registry/configure.sh

echo ""
echo "[COMPLETE] Stage-10 Phase-A setup completed."
