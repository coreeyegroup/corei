#!/usr/bin/env bash

set -euo pipefail

echo "====================================="
echo "STAGE-21F-G DUAL LISTENER DESIGN"
echo "====================================="

bash scripts/security/kafka/validate-dual-listener-design.sh

echo
echo "[PASS] Stage-21F-G design completed"
