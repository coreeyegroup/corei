#!/usr/bin/env bash

set -euo pipefail

echo "=================================================="
echo "STAGE-15 STEP-3 — EXECUTION SCHEMA IMPLEMENTATION"
echo "=================================================="

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/../../.." && pwd)"

cd "$ROOT_DIR"

SCHEMA_DIR="schemas/avro/execution"

echo "[1/5] Writing execution_intent_v1.avsc..."

cat <<'SCHEMA' > $SCHEMA_DIR/execution_intent_v1.avsc
{
  "type": "record",
  "name": "ExecutionIntent",
  "namespace": "core.execution",
  "doc": "Governed execution intent contract",
  "fields": [
    {"name": "event_id", "type": "string"},
    {"name": "event_time", "type": "long"},
    {"name": "trace_id", "type": "string"},
    {"name": "schema_version", "type": "string"},
    {"name": "lineage_hash", "type": "string"},
    {"name": "trade_intent_id", "type": "string"},
    {"name": "execution_intent_id", "type": "string"},
    {"name": "strategy_id", "type": "string"},
    {"name": "account_routing_key", "type": "string"},
    {"name": "origin_type", "type": {
      "type": "enum",
      "name": "OriginType",
      "symbols": ["CORE", "EXTERNAL"]
    }},
    {"name": "execution_type", "type": {
      "type": "enum",
      "name": "ExecutionType",
      "symbols": ["MARKET", "LIMIT", "STOP", "STOP_LIMIT"]
    }},
    {"name": "instrument_id", "type": "string"},
    {"name": "side", "type": {
      "type": "enum",
      "name": "ExecutionSide",
      "symbols": ["BUY", "SELL"]
    }},
    {"name": "signal_strength", "type": "long"},
    {"name": "requested_price", "type": "long"},
    {"name": "stop_price", "type": "long"},
    {"name": "target_price", "type": "long"},
    {"name": "risk_percentage", "type": "long"},
    {"name": "created_by", "type": "string"}
  ]
}
SCHEMA

echo "[2/5] Writing per_account_intent_v1.avsc..."

cat <<'SCHEMA' > $SCHEMA_DIR/per_account_intent_v1.avsc
{
  "type": "record",
  "name": "PerAccountIntent",
  "namespace": "core.execution",
  "doc": "Governed account-routed execution intent",
  "fields": [
    {"name": "event_id", "type": "string"},
    {"name": "event_time", "type": "long"},
    {"name": "trace_id", "type": "string"},
    {"name": "schema_version", "type": "string"},
    {"name": "lineage_hash", "type": "string"},
    {"name": "execution_intent_id", "type": "string"},
    {"name": "per_account_intent_id", "type": "string"},
    {"name": "account_id", "type": "string"},
    {"name": "account_group", "type": "string"},
    {"name": "operation_mode", "type": {
      "type": "enum",
      "name": "OperationMode",
      "symbols": [
        "PAPER",
        "LIVE_SEMI",
        "LIVE_AUTO",
        "DISABLED",
        "BACKTEST"
      ]
    }},
    {"name": "instrument_id", "type": "string"},
    {"name": "side", "type": "ExecutionSide"},
    {"name": "requested_price", "type": "long"},
    {"name": "stop_price", "type": "long"},
    {"name": "target_price", "type": "long"}
  ]
}
SCHEMA

echo "[3/5] Writing risk_decision_v1.avsc..."

cat <<'SCHEMA' > $SCHEMA_DIR/risk_decision_v1.avsc
{
  "type": "record",
  "name": "RiskDecision",
  "namespace": "core.execution",
  "doc": "Deterministic risk evaluation result",
  "fields": [
    {"name": "event_id", "type": "string"},
    {"name": "event_time", "type": "long"},
    {"name": "trace_id", "type": "string"},
    {"name": "schema_version", "type": "string"},
    {"name": "lineage_hash", "type": "string"},
    {"name": "execution_intent_id", "type": "string"},
    {"name": "risk_decision_id", "type": "string"},
    {"name": "risk_hash", "type": "string"},
    {"name": "risk_status", "type": {
      "type": "enum",
      "name": "RiskStatus",
      "symbols": ["APPROVED", "REJECTED", "HALTED"]
    }},
    {"name": "rejection_reason", "type": ["null", "string"], "default": null},
    {"name": "daily_loss_pct", "type": "long"},
    {"name": "drawdown_pct", "type": "long"},
    {"name": "margin_utilization_pct", "type": "long"},
    {"name": "open_positions", "type": "int"},
    {"name": "max_allowed_positions", "type": "int"},
    {"name": "kill_switch_active", "type": "boolean"}
  ]
}
SCHEMA

echo "[4/5] Writing policy_decision_v1.avsc..."

cat <<'SCHEMA' > $SCHEMA_DIR/policy_decision_v1.avsc
{
  "type": "record",
  "name": "PolicyDecision",
  "namespace": "core.execution",
  "doc": "Execution policy evaluation result",
  "fields": [
    {"name": "event_id", "type": "string"},
    {"name": "event_time", "type": "long"},
    {"name": "trace_id", "type": "string"},
    {"name": "schema_version", "type": "string"},
    {"name": "lineage_hash", "type": "string"},
    {"name": "execution_intent_id", "type": "string"},
    {"name": "policy_decision_id", "type": "string"},
    {"name": "policy_hash", "type": "string"},
    {"name": "policy_status", "type": {
      "type": "enum",
      "name": "PolicyStatus",
      "symbols": ["APPROVED", "REJECTED"]
    }},
    {"name": "session_allowed", "type": "boolean"},
    {"name": "rate_limit_allowed", "type": "boolean"},
    {"name": "wash_trade_detected", "type": "boolean"},
    {"name": "policy_reason", "type": ["null", "string"], "default": null}
  ]
}
SCHEMA

echo "[5/5] Writing execution_order_v1.avsc..."

cat <<'SCHEMA' > $SCHEMA_DIR/execution_order_v1.avsc
{
  "type": "record",
  "name": "ExecutionOrder",
  "namespace": "core.execution",
  "doc": "Authoritative execution order contract",
  "fields": [
    {"name": "event_id", "type": "string"},
    {"name": "event_time", "type": "long"},
    {"name": "trace_id", "type": "string"},
    {"name": "schema_version", "type": "string"},
    {"name": "lineage_hash", "type": "string"},
    {"name": "trade_intent_id", "type": "string"},
    {"name": "execution_intent_id", "type": "string"},
    {"name": "execution_order_id", "type": "string"},
    {"name": "risk_hash", "type": "string"},
    {"name": "policy_hash", "type": "string"},
    {"name": "account_id", "type": "string"},
    {"name": "instrument_id", "type": "string"},
    {"name": "side", "type": "ExecutionSide"},
    {"name": "execution_type", "type": "ExecutionType"},
    {"name": "order_state", "type": {
      "type": "enum",
      "name": "OrderState",
      "symbols": [
        "NEW",
        "VALIDATED",
        "SUBMITTED",
        "ACKNOWLEDGED",
        "PARTIALLY_FILLED",
        "FILLED",
        "CANCELLED",
        "EXPIRED",
        "REJECTED"
      ]
    }},
    {"name": "requested_quantity", "type": "long"},
    {"name": "approved_quantity", "type": "long"},
    {"name": "requested_price", "type": "long"},
    {"name": "stop_price", "type": "long"},
    {"name": "target_price", "type": "long"},
    {"name": "broker_route", "type": "string"},
    {"name": "paper_mode", "type": "boolean"},
    {"name": "created_by", "type": "string"}
  ]
}
SCHEMA

echo
echo "Execution schemas successfully implemented."
echo
