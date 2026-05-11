#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$HOME/corei"

echo "========================================="
echo "Stage 04 Infrastructure State"
echo "========================================="

echo
echo "Infrastructure Scripts:"
echo

find \
"$ROOT_DIR/scripts/infrastructure" \
-type f | sort

echo
echo "Terraform Topology:"
echo

find \
"$ROOT_DIR/terraform" \
-type d | sort

echo
echo "Infrastructure Components:"
echo

find \
"$ROOT_DIR/infrastructure/components" \
-maxdepth 1 \
-type d | sort
