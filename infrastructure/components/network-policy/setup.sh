#!/usr/bin/env bash

set -euo pipefail

echo "=================================================="
echo "STAGE-10 :: PHASE-C :: NETWORK POLICY GOVERNANCE"
echo "=================================================="

echo ""
echo "[STEP-1] Applying base default deny governance..."

kubectl apply -f \
kubernetes/network-policies/base/default-deny-all.yaml

echo ""
echo "[STEP-2] Applying DNS governance..."

kubectl apply -f \
kubernetes/network-policies/base/allow-cluster-dns.yaml

echo ""
echo "[STEP-3] Applying CICD namespace governance..."

kubectl apply -f \
kubernetes/network-policies/cicd/

echo ""
echo "[STEP-4] Applying observability governance..."

kubectl apply -f \
kubernetes/network-policies/observability/

echo ""
echo "[COMPLETE] Network policy governance applied successfully."
