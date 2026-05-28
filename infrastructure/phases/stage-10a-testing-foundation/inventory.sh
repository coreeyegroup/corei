#!/usr/bin/env bash

set -euo pipefail

OUTPUT="state/stage-10a/inventory/testing-topology.txt"

mkdir -p state/stage-10a/inventory

tree tests > "${OUTPUT}"

echo "Inventory written:"
echo "${OUTPUT}"
