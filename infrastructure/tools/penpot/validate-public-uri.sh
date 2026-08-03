#!/usr/bin/env bash
set -euo pipefail

echo
echo "===== PENPOT CONFIG ====="

curl -s \
http://192.168.1.10:30822/js/config.js

echo
echo "===== FRONTEND ENV ====="

kubectl exec \
-n tools \
deploy/penpot-frontend \
-- env | grep PENPOT_PUBLIC_URI
