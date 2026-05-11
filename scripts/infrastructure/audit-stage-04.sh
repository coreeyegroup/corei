#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$HOME/corei"
AUDIT_DIR="$ROOT_DIR/infrastructure/state/stage-04/audit"

mkdir -p "$AUDIT_DIR"

echo "========================================="
echo "Stage 04 Infrastructure Authority Audit"
echo "========================================="

find \
"$ROOT_DIR/terraform" \
-type d | sort \
> "$AUDIT_DIR/terraform-topology.txt"

find \
"$ROOT_DIR/infrastructure/components" \
-maxdepth 1 \
-type d | sort \
> "$AUDIT_DIR/component-topology.txt"

find \
"$ROOT_DIR/scripts/infrastructure" \
-type f | sort \
> "$AUDIT_DIR/infrastructure-scripts.txt"

find \
"$ROOT_DIR/infrastructure/phases" \
-maxdepth 1 \
-type d | sort \
> "$AUDIT_DIR/phase-topology.txt"

find \
"$ROOT_DIR/docs" \
-type f | grep "stage-04" | sort \
> "$AUDIT_DIR/stage-04-docs.txt" || true

docker --version \
> "$AUDIT_DIR/docker-version.txt" 2>/dev/null || true

helm version \
> "$AUDIT_DIR/helm-version.txt" 2>/dev/null || true

kubectl version --client \
> "$AUDIT_DIR/kubectl-version.txt" 2>/dev/null || true

terraform version \
> "$AUDIT_DIR/terraform-version.txt" 2>/dev/null || true

ss -tulpn \
> "$AUDIT_DIR/network-state.txt" 2>/dev/null || true

timedatectl status \
> "$AUDIT_DIR/time-sync.txt" 2>/dev/null || true

echo
echo "Audit complete:"
find "$AUDIT_DIR" -type f | sort
