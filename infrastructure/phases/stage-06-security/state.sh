#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$HOME/corei"

echo "========================================="
echo "Stage 06 Security State"
echo "========================================="

echo
echo "Security Scripts:"
echo

find \
"$ROOT_DIR/scripts/security" \
-type f | sort

echo
echo "Security Manifests:"
echo

find \
"$ROOT_DIR/kubernetes/security" \
-type f | sort

echo
echo "Vault Policies:"
echo

find \
"$ROOT_DIR/infrastructure/components/vault/policies" \
-type f | sort
