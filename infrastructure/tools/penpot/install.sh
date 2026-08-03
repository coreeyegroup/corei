#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

kubectl apply \
-f "${ROOT_DIR}/manifests/tools-namespace.yaml"

helm repo add penpot https://helm.penpot.app || true

helm repo update

helm upgrade \
--install penpot \
penpot/penpot \
--namespace tools \
--create-namespace \
-f "${ROOT_DIR}/values/penpot-values.yaml"

helm status penpot -n tools
