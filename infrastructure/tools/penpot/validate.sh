#!/usr/bin/env bash

set -euo pipefail

echo "===== PENPOT VALIDATION ====="

kubectl get pods -n tools

kubectl get pvc -n tools

kubectl get svc -n tools

helm status penpot -n tools
