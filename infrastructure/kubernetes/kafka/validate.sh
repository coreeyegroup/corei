#!/usr/bin/env bash
set -euo pipefail

kubectl get pods -n kafka

kubectl get svc -n kafka

kubectl get pvc -n kafka
