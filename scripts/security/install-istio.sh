#!/usr/bin/env bash

set -euo pipefail

echo "========================================="
echo "Installing Istio"
echo "========================================="

ISTIO_VERSION="1.27.0"

cd /tmp

if [ ! -d "istio-$ISTIO_VERSION" ]; then

echo
echo "Downloading Istio $ISTIO_VERSION..."

curl -L https://istio.io/downloadIstio \
| ISTIO_VERSION=$ISTIO_VERSION sh -

fi

echo
echo "Installing istioctl..."

sudo cp \
"/tmp/istio-$ISTIO_VERSION/bin/istioctl" \
/usr/local/bin/istioctl

sudo chmod +x /usr/local/bin/istioctl

echo
echo "Creating istio-system namespace..."

kubectl create namespace istio-system \
--dry-run=client -o yaml | kubectl apply -f -

echo
echo "Installing Istio control plane..."

istioctl install -y

echo
echo "Waiting for Istio control plane..."

kubectl wait \
--for=condition=Available \
deployment/istiod \
-n istio-system \
--timeout=600s

echo
echo "Istio control plane operational."

kubectl get pods -n istio-system
