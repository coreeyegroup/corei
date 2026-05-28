#!/usr/bin/env bash
set -euo pipefail

kubectl delete namespace market-data --ignore-not-found
