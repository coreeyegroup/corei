# WF-07I — BROKER CLOCK

## Classification

Workflow ID:
WF-07I

Workflow Name:
BROKER_CLOCK

Domain:
Operations

Category:
Clock Foundation Layer

Version:
1.0

Status:
Authoritative

---

# Purpose

WF-07I publishes authoritative broker operational state.

This workflow represents the platform's ability to communicate with and submit orders through a broker.

WF-07I does NOT make trading decisions.

WF-07I publishes broker facts.

---

# Architecture Position

SYSTEM_CLOCK
        ↓

BUSINESS_CLOCK
        ↓

MARKET_SESSION_CLOCK
        ↓

SYSTEM_HEALTH_CLOCK
        ↓

TRADING_DAY_CLOCK
        ↓

TRADING_PHASE_CLOCK
        ↓

TRADING_WINDOW_CLOCK
        ↓

BROKER_CLOCK

---

# Business Objective

Provide deterministic broker availability status for all downstream services.

Examples:

• Broker Connected
• Broker Disconnected
• Broker Maintenance
• Authentication Failure
• API Degradation
• Session Expiry

---

# Inputs

BUILD_PLATFORM_CONTEXT

broker_profile

market

market_profile

---

WF-07D

health_state

---

# Version 1.0 Design

Version 1.0 uses a static broker engine.

No live broker integration yet.

Purpose:

Establish broker-state architecture.

Establish downstream contract.

Validate workflow dependencies.

---

# Supported Broker Profiles

UPSTOX

ZERODHA

INTERACTIVE_BROKERS

ALPACA

PAPER

---

# Broker States

CONNECTED

DISCONNECTED

MAINTENANCE

AUTH_FAILED

DEGRADED

---

# Broker Health Levels

HEALTHY

WARNING

CRITICAL

---

# Broker Availability

true

false

---

# Version 1.0 Baseline

broker_state

CONNECTED

broker_health

HEALTHY

broker_available

true

---

# Output Contract

{
  "workflow_id":"WF-07I",
  "workflow_name":"BROKER_CLOCK",
  "workflow_version":"1.0",
  "component_type":"OPERATIONS",

  "broker_profile":"UPSTOX",

  "broker_state":"CONNECTED",

  "broker_health":"HEALTHY",

  "broker_available":true
}

---

# Python Service

Root:

platform/services/python-execution-service

Model:

app/models/broker_clock.py

Service:

app/services/broker_clock_service.py

Route:

app/routes/broker_clock.py

Endpoint:

POST

/api/v1/broker-clock/state

Registration:

app/main.py

Router:

broker_clock_router

---

# N8N Workflow

WF-07I - BROKER_CLOCK

Nodes

01 START_BROKER_CLOCK

02 BUILD_PLATFORM_CONTEXT

03 REQUEST_SYSTEM_CLOCK

04 REQUEST_BUSINESS_CLOCK

05 BUILD_MARKET_SESSION_REQUEST

06 REQUEST_MARKET_SESSION

07 REQUEST_SYSTEM_HEALTH

08 BUILD_TRADING_DAY_REQUEST

09 REQUEST_TRADING_DAY

10 BUILD_TRADING_PHASE_REQUEST

11 REQUEST_TRADING_PHASE

12 BUILD_TRADING_WINDOW_REQUEST

13 REQUEST_TRADING_WINDOW

14 BUILD_BROKER_CLOCK_REQUEST

15 REQUEST_BROKER_CLOCK

16 NORMALIZE_BROKER_CLOCK

17 WORKFLOW_COMPLETE

---

# BUILD_PLATFORM_CONTEXT Contract

{
  "market":"NSE",
  "market_timezone":"Asia/Kolkata",
  "asset_class":"EQUITY",
  "market_profile":"NSE_EQUITY",
  "broker_profile":"UPSTOX"
}

---

# BUILD_BROKER_CLOCK_REQUEST

{
  "workflow_id":"WF-07I",
  "broker_profile":"UPSTOX"
}

---

# REQUEST_BROKER_CLOCK Response

{
  "workflow_id":"WF-07I",
  "workflow_name":"BROKER_CLOCK",
  "workflow_version":"1.0",
  "component_type":"OPERATIONS",
  "broker_profile":"UPSTOX",
  "broker_state":"CONNECTED",
  "broker_health":"HEALTHY",
  "broker_available":true
}

---

# Future Expansion

Live Broker Connectivity

Session Validation

Authentication Validation

Order Placement Validation

Broker Failover

Multi-Broker Routing

Primary/Secondary Broker Selection

Automatic Broker Recovery

---

# Institutional Rule

WF-07I publishes broker facts.

WF-07I does NOT decide:

• strategy_allowed

• signal_allowed

• execution_allowed

• entry_allowed

• risk_allowed

All downstream services must consume broker state from WF-07I.

No downstream service may independently determine broker availability.
