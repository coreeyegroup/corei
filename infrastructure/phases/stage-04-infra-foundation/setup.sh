#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$HOME/corei"

echo "========================================="
echo "Stage 04 Infrastructure Setup"
echo "========================================="

"$ROOT_DIR/scripts/infrastructure/install-docker.sh"

"$ROOT_DIR/scripts/infrastructure/configure-containerd.sh"

"$ROOT_DIR/scripts/infrastructure/install-kubectl.sh"

"$ROOT_DIR/scripts/infrastructure/install-helm.sh"

"$ROOT_DIR/scripts/infrastructure/install-terraform.sh"

"$ROOT_DIR/scripts/infrastructure/start-registry.sh"

echo
echo "Stage 04 setup completed."
