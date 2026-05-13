#!/usr/bin/env bash

set -euo pipefail

echo "========================================="
echo "Stage-07 Contamination Validation"
echo "========================================="

echo
echo "Checking Git working tree..."

git status

echo
echo "Checking for tracked Kafka runtime artifacts..."

git ls-files | grep -E 'kafka-logs|tmp|runtime-dump' || true

echo
echo "Checking for tracked backup archives..."

git ls-files | grep -E '\.tar|\.gz|\.zip' || true

echo
echo "Checking for schema drift artifacts..."

find \
"$HOME/corei/infrastructure/components/kafka/contracts" \
-type f ! -name "*.avsc" ! -name "README.md"

echo
echo "Checking Git synchronization..."

git status --short

echo
echo "Stage-07 contamination validation completed."
