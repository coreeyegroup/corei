#!/bin/bash

set -e

echo ""
echo "Installing Jaeger..."
echo ""

helm upgrade --install jaeger jaegertracing/jaeger \
  --namespace observability \
  -f infrastructure/phases/stage-09-observability/values/jaeger-values.yaml

echo ""
echo "Jaeger Installation Complete"
echo ""
