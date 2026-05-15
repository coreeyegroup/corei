#!/bin/bash

set -e

echo "========================================="
echo "BUILDING PERSISTENCE WRITER"
echo "========================================="

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/../../.." && pwd)"

cd "${ROOT_DIR}/infrastructure/services/persistence-writer"

docker build \
    -t persistence-writer:stage-08 \
    .

echo "========================================="
echo "[PASS] Persistence writer image built"
echo "========================================="
