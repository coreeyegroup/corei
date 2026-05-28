#!/usr/bin/env bash
set -euo pipefail

echo "=================================================="
echo "BUILDING RECONCILIATION SERVICE"
echo "=================================================="

docker build \
  -t reconciliation:stage-16 \
  infrastructure/components/reconciliation

echo
echo "Reconciliation build complete"
