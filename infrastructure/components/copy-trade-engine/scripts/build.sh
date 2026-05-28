#!/usr/bin/env bash
set -euo pipefail

echo "=================================================="
echo "BUILDING COPY TRADE ENGINE"
echo "=================================================="

docker build \
  -t copy-trade-engine:stage-16 \
  infrastructure/components/copy-trade-engine

echo
echo "Copy trade engine build complete"
