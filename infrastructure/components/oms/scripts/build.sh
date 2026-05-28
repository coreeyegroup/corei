#!/usr/bin/env bash
set -euo pipefail

echo "=================================================="
echo "BUILDING OMS"
echo "=================================================="

docker build \
  -t oms:stage-16 \
  infrastructure/components/oms

echo
echo "OMS build complete"
