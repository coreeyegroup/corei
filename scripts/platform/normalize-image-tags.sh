#!/usr/bin/env bash

set -euo pipefail

echo "====================================="
echo "IMAGE NORMALIZATION"
echo "====================================="

sed -i \
's|docker.n8n.io/n8nio/n8n:latest|docker.n8n.io/n8nio/n8n:1.98.2|g' \
kubernetes/n8n/deployment.yaml

sed -i \
's|timescale/timescaledb:latest-pg16|timescale/timescaledb:2.17.2-pg16|g' \
infrastructure/kubernetes/timescaledb/deployment.yaml

echo "[PASS] Image normalization complete."
