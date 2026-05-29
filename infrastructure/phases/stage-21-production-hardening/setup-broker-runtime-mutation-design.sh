#!/usr/bin/env bash

set -euo pipefail

echo "====================================="
echo "STAGE-21F-I-C RUNTIME MUTATION DESIGN"
echo "====================================="

bash scripts/security/kafka/validate-runtime-mutation-design.sh

echo
echo "[PASS] Stage-21F-I-C completed"
