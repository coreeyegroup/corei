#!/bin/bash

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/../../../.." && pwd)"

echo ""
echo "========================================"
echo "CORE EYE OBSERVABILITY INVENTORY"
echo "========================================"
echo ""

tree "$ROOT_DIR/infrastructure/phases/stage-09-observability"

echo ""
