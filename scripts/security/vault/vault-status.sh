#!/usr/bin/env bash

set -euo pipefail

kubectl exec -n vault vault-0 -- \
vault status -format=json
