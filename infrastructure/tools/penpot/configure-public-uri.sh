#!/usr/bin/env bash
set -euo pipefail

PUBLIC_URI="http://192.168.1.10:31580"

helm upgrade penpot penpot/penpot \
  -n tools \
  --reuse-values \
  --set config.publicUri="${PUBLIC_URI}"

echo
echo "PUBLIC URI UPDATED:"
echo "${PUBLIC_URI}"
