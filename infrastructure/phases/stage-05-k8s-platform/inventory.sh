#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$HOME/corei"
STATE_DIR="$ROOT_DIR/infrastructure/state/stage-05/inventory"

mkdir -p "$STATE_DIR"

echo "========================================="
echo "Stage 05 Kubernetes Inventory"
echo "========================================="

find \
"$ROOT_DIR/kubernetes/namespaces" \
-type f | sort \
> "$STATE_DIR/namespaces.txt"

find \
"$ROOT_DIR/kubernetes/rbac" \
-type f | sort \
> "$STATE_DIR/rbac.txt"

find \
"$ROOT_DIR/kubernetes/network-policies" \
-type f | sort \
> "$STATE_DIR/network-policies.txt"

find \
"$ROOT_DIR/kubernetes/resource-quotas" \
-type f | sort \
> "$STATE_DIR/resource-quotas.txt"

find \
"$ROOT_DIR/kubernetes/priority-classes" \
-type f | sort \
> "$STATE_DIR/priority-classes.txt"

find \
"$ROOT_DIR/kubernetes/service-accounts" \
-type f | sort \
> "$STATE_DIR/service-accounts.txt"

find \
"$ROOT_DIR/kubernetes" \
-type d | sort \
> "$STATE_DIR/kubernetes-topology.txt"

find \
"$ROOT_DIR/scripts/kubernetes" \
-type f | sort \
> "$STATE_DIR/kubernetes-scripts.txt"

find \
"$ROOT_DIR/infrastructure/phases/stage-05-k8s-platform" \
-type f | sort \
> "$STATE_DIR/stage-05-lifecycle.txt"

echo
echo "Inventory complete:"
find "$STATE_DIR" -type f | sort
