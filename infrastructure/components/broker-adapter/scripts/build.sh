#!/usr/bin/env bash
set -euo pipefail

echo "=================================================="
echo "BUILDING BROKER ADAPTER SERVICE"
echo "=================================================="

docker build \
  -t broker-adapter:stage-16 \
  infrastructure/components/broker-adapter

echo
echo "Broker adapter build complete"
