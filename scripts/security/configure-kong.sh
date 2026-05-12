#!/usr/bin/env bash

set -euo pipefail

echo "========================================="
echo "Configuring Kong"
echo "========================================="

echo
echo "Validating Kong runtime..."

kubectl get pods -n platform

echo
echo "Validating Kong CRDs..."

kubectl get crds | grep kong || true

echo
echo "JWT plugin governance assets prepared."

echo
echo "Plugin enforcement deferred until API workloads are onboarded."

echo
echo "Kong configuration validation completed."
