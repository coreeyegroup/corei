#!/usr/bin/env bash

echo "===== PENPOT INVENTORY ====="

kubectl get all -n tools

kubectl get pvc -n tools

helm list -n tools
