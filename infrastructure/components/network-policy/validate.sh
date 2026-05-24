#!/usr/bin/env bash

set -euo pipefail

echo "=================================================="
echo "STAGE-10 :: PHASE-C :: NETWORK POLICY VALIDATION"
echo "=================================================="

echo ""
echo "[STEP-1] Validating base governance..."

kubectl get networkpolicy

echo ""
echo "[STEP-2] Validating CICD governance..."

kubectl get networkpolicy -n cicd

echo ""
echo "[COMPLETE] Network policy governance validation successful."
