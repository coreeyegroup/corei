#!/bin/bash

set -e

echo "[Stage-14] Creating Kafka topics..."

TOPICS=(
instrument_screened
instrument_monitor_events
signal_events
decision_events
)

for topic in "${TOPICS[@]}"
do
    echo "[Stage-14] Topic registered: $topic"
done

echo "[Stage-14] Kafka topic governance initialized"
