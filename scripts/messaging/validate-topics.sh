#!/usr/bin/env bash

set -euo pipefail

echo "========================================="
echo "Validating Kafka Topics"
echo "========================================="

REQUIRED_TOPICS=(

  # MARKET DATA
  market_ticks_stream
  market_ohlcv_stream
  market_depth_stream

  # SIGNAL + STRATEGY
  signal_stream
  strategy_state_stream

  # TRADE + EXECUTION
  trade_intent_stream
  execution_intent_stream
  execution_order_stream
  fill_stream
  order_state_stream

  # PORTFOLIO + RISK
  portfolio_state_stream
  position_state_stream
  pnl_stream
  risk_event_stream
  margin_event_stream

  # CONTROL + GOVERNANCE
  kill_switch_stream
  config_event_stream
  orchestration_event_stream

  # OBSERVABILITY + AUDIT
  audit_stream
  alert_stream
  metrics_stream

  # FAILURE TOPOLOGY
  retry_stream
  dead_letter_stream
)

TOPICS=$(
kubectl exec -n kafka kafka-broker-0 -- \
kafka-topics \
--bootstrap-server localhost:9092 \
--list
)

for TOPIC in "${REQUIRED_TOPICS[@]}"
do

echo
echo "Checking topic: $TOPIC"

if ! echo "$TOPICS" | grep -q "^${TOPIC}$"
then

echo
echo "Missing required topic: $TOPIC"

exit 1

fi

done

echo
echo "All 23 governed Kafka topics validated successfully."
