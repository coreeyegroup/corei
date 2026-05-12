#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$HOME/corei"
STATE_DIR="$ROOT_DIR/infrastructure/state/stage-06/inventory"

mkdir -p "$STATE_DIR"

echo "========================================="
echo "Stage 06 Security Inventory"
echo "========================================="

find \
"$ROOT_DIR/scripts/security" \
-type f | sort \
> "$STATE_DIR/security-scripts.txt"

find \
"$ROOT_DIR/kubernetes/security" \
-type f | sort \
> "$STATE_DIR/security-manifests.txt"

find \
"$ROOT_DIR/infrastructure/components/vault/policies" \
-type f | sort \
> "$STATE_DIR/vault-policies.txt"

find \
"$ROOT_DIR/infrastructure/phases/stage-06-security" \
-type f | sort \
> "$STATE_DIR/stage-06-lifecycle.txt"

echo
echo "Inventory complete:"
find "$STATE_DIR" -type f | sort
