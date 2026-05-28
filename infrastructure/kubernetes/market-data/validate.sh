#!/usr/bin/env bash
set -euo pipefail

kubectl get pods -n market-data

kubectl get deployment -n market-data

kubectl get svc -n market-data
