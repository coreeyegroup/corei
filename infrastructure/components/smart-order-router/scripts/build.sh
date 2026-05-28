#!/usr/bin/env bash
set -euo pipefail

echo "=================================================="
echo "BUILDING SMART ORDER ROUTER"
echo "=================================================="

docker build \
  -t smart-order-router:stage-16 \
  infrastructure/components/smart-order-router

echo
echo "Build complete"
