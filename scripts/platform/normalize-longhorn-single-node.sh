#!/usr/bin/env bash

set -euo pipefail

echo "====================================="
echo "LONGHORN SINGLE NODE NORMALIZATION"
echo "====================================="

kubectl patch settings.longhorn.io default-replica-count \
-n longhorn-system \
--type merge \
-p '{"value":"1"}'

echo
echo "[PASS] Default replica count set to 1"
