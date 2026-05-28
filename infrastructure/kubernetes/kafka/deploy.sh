#!/usr/bin/env bash
set -euo pipefail

kubectl apply -f infrastructure/kubernetes/kafka/namespace.yaml

kubectl apply -f infrastructure/kubernetes/kafka/kafka-configmap.yaml

kubectl apply -f infrastructure/kubernetes/kafka/kafka-headless-service.yaml

kubectl apply -f infrastructure/kubernetes/kafka/kafka-service.yaml

kubectl apply -f infrastructure/kubernetes/kafka/kafka-statefulset.yaml
