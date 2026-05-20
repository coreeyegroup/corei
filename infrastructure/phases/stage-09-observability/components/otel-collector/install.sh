#!/bin/bash

set -e

echo ""
echo "Installing OpenTelemetry Collector..."
echo ""

helm upgrade --install otel-collector open-telemetry/opentelemetry-collector \
  --namespace observability \
  -f infrastructure/phases/stage-09-observability/values/otel-values.yaml

echo ""
echo "OpenTelemetry Collector Installation Complete"
echo ""
