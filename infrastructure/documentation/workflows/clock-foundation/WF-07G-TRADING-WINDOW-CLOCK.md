# WF-07G — TRADING WINDOW CLOCK

## Classification

Workflow ID:
WF-07G

Workflow Name:
TRADING_WINDOW_CLOCK

Domain:
Operations

Category:
Clock Foundation Layer

Stage:
18 — UI and Operational Control

Version:
1.0

Status:
Authoritative

---

# Purpose

WF-07G determines the active market trading window.

This workflow does NOT make trading decisions.

It publishes market-window facts.

Downstream governance systems use these facts to decide whether trading actions are permitted.

---

# Position In Architecture

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

STRATEGY_GOVERNANCE
        ↓

SIGNAL_GOVERNANCE
        ↓

RISK_GOVERNANCE
        ↓

EXECUTION_GOVERNANCE

---

# Business Objective

Provide a deterministic and authoritative market-window state.

All downstream components consume:

window_state

instead of independently calculating time windows.

---

# Institutional Principle

WF-07G reports facts.

WF-07G does NOT decide:

• entry_allowed
• execution_allowed
• signal_allowed
• strategy_allowed

Those decisions belong to future governance workflows.

---

# Inputs

## BUILD_PLATFORM_CONTEXT

market

market_timezone

asset_class

market_profile

---

## WF-07A SYSTEM_CLOCK

utc_timestamp

---

## WF-07F TRADING_PHASE_CLOCK

phase_state

---

# Market Profiles

Current:

NSE_EQUITY

Future:

FOREX_SPOT

CRYPTO_SPOT

NYSE_EQUITY

NASDAQ_EQUITY

MCX_COMMODITY

NFO_DERIVATIVES

---

# NSE_EQUITY Window Definitions

Opening Window

09:15
to
09:20

↓

OPENING_WINDOW

---

Core Session

09:20
to
15:15

↓

CORE_SESSION

---

Closing Window

15:15
to
15:30

↓

CLOSING_WINDOW

---

Outside Session

↓

SESSION_CLOSED

---

# Priority Logic

Highest Priority

If:

phase_state != ACTIVE_TRADING

Result:

SESSION_CLOSED

No further evaluation occurs.

---

# Decision Matrix

ACTIVE_TRADING

09:15-09:20

↓

OPENING_WINDOW

--------------------------------

ACTIVE_TRADING

09:20-15:15

↓

CORE_SESSION

--------------------------------

ACTIVE_TRADING

15:15-15:30

↓

CLOSING_WINDOW

--------------------------------

PRE_MARKET

↓

SESSION_CLOSED

--------------------------------

POST_MARKET

↓

SESSION_CLOSED

--------------------------------

PLATFORM_DEGRADED

↓

SESSION_CLOSED

---

# Output Contract

{
  "workflow_id":"WF-07G",
  "workflow_name":"TRADING_WINDOW_CLOCK",
  "workflow_version":"1.0",
  "component_type":"OPERATIONS",

  "market":"NSE",

  "market_profile":"NSE_EQUITY",

  "phase_state":"ACTIVE_TRADING",

  "window_state":"CORE_SESSION",

  "window_start":"09:20",

  "window_end":"15:15"
}

---

# Python Service

Root:

platform/services/python-execution-service

Model:

app/models/trading_window.py

Service:

app/services/trading_window_service.py

Route:

app/routes/trading_window.py

Endpoint:

POST

/api/v1/trading-window/state

Registration:

app/main.py

Router:

trading_window_router

---

# N8N Workflow

Workflow:

WF-07G TRADING_WINDOW_CLOCK

Nodes

01 START_TRADING_WINDOW_CLOCK

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

14 NORMALIZE_TRADING_WINDOW

15 WORKFLOW_COMPLETE

---

# Workflow Topology

START_TRADING_WINDOW_CLOCK
        ↓

BUILD_PLATFORM_CONTEXT
        ↓

REQUEST_SYSTEM_CLOCK
        ↓

REQUEST_BUSINESS_CLOCK
        ↓

BUILD_MARKET_SESSION_REQUEST
        ↓

REQUEST_MARKET_SESSION
        ↓

REQUEST_SYSTEM_HEALTH
        ↓

BUILD_TRADING_DAY_REQUEST
        ↓

REQUEST_TRADING_DAY
        ↓

BUILD_TRADING_PHASE_REQUEST
        ↓

REQUEST_TRADING_PHASE
        ↓

BUILD_TRADING_WINDOW_REQUEST
        ↓

REQUEST_TRADING_WINDOW
        ↓

NORMALIZE_TRADING_WINDOW
        ↓

WORKFLOW_COMPLETE

---

# Future Expansion

Additional Window States

OPENING_AUCTION

LUNCH_WINDOW

EXPIRY_WINDOW

VOLATILITY_WINDOW

NEWS_WINDOW

AFTER_HOURS_WINDOW

OVERNIGHT_WINDOW

WEEKEND_WINDOW

---

# Institutional Rule

WF-07G is the authoritative market-window provider.

No downstream service may independently calculate market windows.

All consumers must use:

window_state

from:

WF-07G TRADING_WINDOW_CLOCK.
