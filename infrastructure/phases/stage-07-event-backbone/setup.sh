#!/usr/bin/env bash

set -euo pipefail

echo "========================================="
echo "Stage-07 Event Backbone Setup"
echo "========================================="

echo
echo "Installing Kafka runtime..."

"$HOME/corei/scripts/messaging/install-kafka.sh"

echo
echo "Creating governed Kafka topics..."

"$HOME/corei/scripts/messaging/create-topics.sh"

echo
echo "Installing Schema Registry..."

"$HOME/corei/scripts/messaging/install-schema-registry.sh"

echo
echo "Applying Kafka ACL governance..."

"$HOME/corei/scripts/messaging/apply-acls.sh"

echo
echo "Installing Kafka UI..."

"$HOME/corei/scripts/messaging/install-kafka-ui.sh"

echo
echo "Stage-07 event backbone setup completed."
