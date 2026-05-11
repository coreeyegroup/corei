#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$HOME/corei"

echo "========================================="
echo "Stage 05 Kubernetes State"
echo "========================================="

echo
echo "Kubernetes Scripts:"
echo

find \
"$ROOT_DIR/scripts/kubernetes" \
-type f | sort

echo
echo "Kubernetes Topology:"
echo

find \
"$ROOT_DIR/kubernetes" \
-type d | sort

echo
echo "Kubernetes Manifests:"
echo

find \
"$ROOT_DIR/kubernetes" \
-type f | sort

echo
echo "Stage 05 Runtime Inventory:"
echo

find \
"$ROOT_DIR/infrastructure/state/stage-05/inventory" \
-type f | sort
