#!/usr/bin/env bash

set -euo pipefail

echo "========================================="
echo "Starting local registry"
echo "========================================="

docker rm -f registry >/dev/null 2>&1 || true

docker run -d \
-p 5000:5000 \
--restart always \
--name registry \
registry:2

echo
echo "Registry started successfully."

docker ps | grep registry || true
