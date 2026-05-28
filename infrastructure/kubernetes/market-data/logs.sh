#!/usr/bin/env bash
set -euo pipefail

kubectl logs -n market-data \
deployment/market-data-ingestion -f
