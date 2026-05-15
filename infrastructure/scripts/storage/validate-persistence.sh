#!/usr/bin/env bash

set -euo pipefail

echo "[INFO] Validating PVC bindings..."

kubectl get pvc -n storage
