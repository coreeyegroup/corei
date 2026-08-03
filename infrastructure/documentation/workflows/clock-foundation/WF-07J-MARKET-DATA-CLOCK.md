# WF-07J — MARKET DATA CLOCK

## Classification

Workflow ID:
WF-07J

Workflow Name:
MARKET_DATA_CLOCK

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

WF-07J publishes authoritative market data state.

This workflow determines whether market data can be trusted by the platform.

WF-07J does NOT generate signals.

WF-07J does NOT perform analysis.

WF-07J publishes market data facts.

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

MARKET_EVENT_CLOCK
        ↓

BROKER_CLOCK
        ↓

MARKET_DATA_CLOCK

---

# Business Objective

Provide deterministic market data availability status.

The platform must know:

• Is market data connected?
• Is market data healthy?
• Is market data fresh?
• Can downstream services trust incoming data?

---

# Inputs

BUILD_PLATFORM_CONTEXT

market

market_profile

data_provider

---

# Version 1.0 Design

Version 1.0 uses a static market data engine.

No live feed validation.

No provider connectivity checks.

No heartbeat monitoring.

Purpose:

• Establish architecture
• Establish contracts
• Establish workflow dependencies

---

# Supported Market Data Providers

UPSTOX

ZERODHA

TRUE_DATA

POLYGON

ALPACA

INTERACTIVE_BROKERS

---

# Data States

CONNECTED

DISCONNECTED

DEGRADED

STALE

MAINTENANCE

---

# Data Health Levels

HEALTHY

WARNING

CRITICAL

---

# Data Freshness States

REALTIME

DELAYED

STALE

UNKNOWN

---

# Data Availability

true

false

---

# Version 1.0 Baseline

data_state

CONNECTED

data_health

HEALTHY

data_freshness

REALTIME

data_available

true

---

# Output Contract

{
  "workflow_id":"WF-07J",
  "workflow_name":"MARKET_DATA_CLOCK",
  "workflow_version":"1.0",
  "component_type":"OPERATIONS",

  "market":"NSE",

  "market_profile":"NSE_EQUITY",

  "data_state":"CONNECTED",

  "data_health":"HEALTHY",

  "data_freshness":"REALTIME",

  "data_available":true
}

---

# Python Service

Root:

platform/services/python-execution-service

Model:

app/models/market_data_clock.py

Service:

app/services/market_data_clock_service.py

Route:

app/routes/market_data_clock.py

Endpoint:

POST

/api/v1/market-data-clock/state

Registration:

app/main.py

Router:

market_data_clock_router

---

# N8N Workflow

WF-07J - MARKET_DATA_CLOCK

Nodes

01 START_MARKET_DATA_CLOCK

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

14 BUILD_MARKET_DATA_REQUEST

15 REQUEST_MARKET_DATA_CLOCK

16 NORMALIZE_MARKET_DATA_CLOCK

17 WORKFLOW_COMPLETE

---

# BUILD_PLATFORM_CONTEXT

{
  "market":"NSE",
  "market_timezone":"Asia/Kolkata",
  "asset_class":"EQUITY",
  "market_profile":"NSE_EQUITY",
  "broker_profile":"UPSTOX",
  "data_provider":"UPSTOX"
}

---

# BUILD_MARKET_DATA_REQUEST

{
  "workflow_id":"WF-07J",
  "market":"NSE",
  "market_profile":"NSE_EQUITY"
}

---

# REQUEST_MARKET_DATA_CLOCK Response

{
  "workflow_id":"WF-07J",
  "workflow_name":"MARKET_DATA_CLOCK",
  "workflow_version":"1.0",
  "component_type":"OPERATIONS",
  "market":"NSE",
  "market_profile":"NSE_EQUITY",
  "data_state":"CONNECTED",
  "data_health":"HEALTHY",
  "data_freshness":"REALTIME",
  "data_available":true
}

---

# Future Expansion

Provider Connectivity Monitoring

Feed Heartbeat Monitoring

Feed Freshness Validation

Gap Detection

Tick Latency Monitoring

WebSocket Monitoring

REST Feed Validation

Primary Feed Routing

Secondary Feed Routing

Automatic Feed Failover

Multi-Provider Aggregation

---

# Institutional Rule

WF-07J publishes market data facts.

WF-07J does NOT decide:

• strategy_allowed

• signal_allowed

• execution_allowed

• entry_allowed

• risk_allowed

All downstream services must consume market data state from WF-07J.

No downstream service may independently determine market data availability.

---

# WF-07 Foundation Completion

WF-07A SYSTEM_CLOCK

WF-07B BUSINESS_CLOCK

WF-07C MARKET_SESSION_CLOCK

WF-07D SYSTEM_HEALTH_CLOCK

WF-07E TRADING_DAY_CLOCK

WF-07F TRADING_PHASE_CLOCK

WF-07G TRADING_WINDOW_CLOCK

WF-07H MARKET_EVENT_CLOCK

WF-07I BROKER_CLOCK

WF-07J MARKET_DATA_CLOCK

WF-07 Foundation Complete.
