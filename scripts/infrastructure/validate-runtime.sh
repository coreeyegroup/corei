#!/usr/bin/env bash

set -euo pipefail

echo "========================================="
echo "Infrastructure Runtime Validation"
echo "========================================="

docker info | grep "Storage Driver"
docker info | grep "Cgroup Driver"

helm version

kubectl version --client

terraform version

docker run hello-world

curl -fsSL \
http://localhost:5000/v2/_catalog || true

echo
echo "Infrastructure runtime validation completed."
