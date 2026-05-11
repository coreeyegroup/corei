#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$HOME/corei"
STATE_DIR="$ROOT_DIR/infrastructure/state/stage-04/inventory"

mkdir -p "$STATE_DIR"

echo "========================================="
echo "Stage 04 Infrastructure Inventory"
echo "========================================="

find \
"$ROOT_DIR/scripts/infrastructure" \
-type f | sort \
> "$STATE_DIR/infrastructure-scripts.txt"

find \
"$ROOT_DIR/terraform" \
-type d | sort \
> "$STATE_DIR/terraform-topology.txt"

find \
"$ROOT_DIR/infrastructure/components" \
-maxdepth 1 \
-type d | sort \
> "$STATE_DIR/component-topology.txt"

docker --version \
> "$STATE_DIR/docker-version.txt" 2>/dev/null || true

helm version \
> "$STATE_DIR/helm-version.txt" 2>/dev/null || true

kubectl version --client \
> "$STATE_DIR/kubectl-version.txt" 2>/dev/null || true

terraform version \
> "$STATE_DIR/terraform-version.txt" 2>/dev/null || true

echo
echo "Inventory complete:"
find "$STATE_DIR" -type f | sort
