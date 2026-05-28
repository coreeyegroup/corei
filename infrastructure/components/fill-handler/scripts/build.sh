#!/usr/bin/env bash
set -euo pipefail

echo "=================================================="
echo "BUILDING FILL HANDLER SERVICE"
echo "=================================================="

docker build \
  -t fill-handler:stage-16 \
  infrastructure/components/fill-handler

echo
echo "Fill handler build complete"
