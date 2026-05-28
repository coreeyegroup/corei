#!/usr/bin/env bash
set -euo pipefail

echo "=================================================="
echo "BUILDING EMS"
echo "=================================================="

docker build \
  -t ems:stage-16 \
  infrastructure/components/ems

echo
echo "EMS build complete"
