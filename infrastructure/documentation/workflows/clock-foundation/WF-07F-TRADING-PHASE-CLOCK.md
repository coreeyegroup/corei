
# WF-07F — TRADING PHASE CLOCK

## Classification

Workflow ID:
WF-07F

Workflow Name:
TRADING_PHASE_CLOCK

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

WF-07F converts platform operational state into an authoritative trading phase.

Previous workflows answer:

WF-07A
What time is it?

WF-07B
Is today a business day?

WF-07C
What market session is active?

WF-07D
Is the platform healthy?

WF-07E
Is trading allowed?

WF-07F answers:

What operational phase is the trading platform currently in?

This becomes the authoritative operational-state controller for all downstream trading services.

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

SIGNAL ENGINE
↓

RISK ENGINE
↓

PORTFOLIO ENGINE
↓

EXECUTION ENGINE

---

# Business Objective

Provide a deterministic operational phase consumed by every downstream component.

Downstream services must never independently determine:

• market phase
• session phase
• platform operational state

They consume:

phase_state

from WF-07F.

---

# BUILD_PLATFORM_CONTEXT

Purpose:

Provide centralized market context.

Current Version:

market = NSE

market_timezone = Asia/Kolkata

asset_class = EQUITY

Output:

{
"market":"NSE",
"market_timezone":"Asia/Kolkata",
"asset_class":"EQUITY"
}

Future versions will source this information from:

Platform Configuration Service

Market Registry

Asset Registry

No redesign required.

---

# Inputs

From WF-07C

market

session_state

---

From WF-07D

health_state

---

From WF-07E

trading_allowed

---

# Phase States

PRE_MARKET

ACTIVE_TRADING

POST_MARKET

PLATFORM_DEGRADED

---

# Decision Logic

Rule 1

If:

health_state != HEALTHY

Result:

PLATFORM_DEGRADED

Highest priority.

---

Rule 2

If:

session_state = PRE_MARKET

Result:

PRE_MARKET

---

Rule 3

If:

session_state = MARKET_OPEN

AND

trading_allowed = true

Result:

ACTIVE_TRADING

---

Rule 4

If:

session_state = MARKET_CLOSED

Result:

POST_MARKET

---

# Decision Matrix

PRE_MARKET
+
HEALTHY
+
FALSE

↓

PRE_MARKET

---

MARKET_OPEN
+
HEALTHY
+
TRUE

↓

ACTIVE_TRADING

---

MARKET_CLOSED
+
HEALTHY
+
FALSE

↓

POST_MARKET

---

ANY SESSION
+
DEGRADED

↓

PLATFORM_DEGRADED

---

ANY SESSION
+
CRITICAL

↓

PLATFORM_DEGRADED

---

# Output Contract

{
"workflow_id":"WF-07F",
"workflow_name":"TRADING_PHASE_CLOCK",
"workflow_version":"1.0",
"component_type":"OPERATIONS",

"market":"NSE",

"phase_state":"ACTIVE_TRADING",

"trading_allowed":true,

"session_state":"MARKET_OPEN",

"health_state":"HEALTHY"
}

---

# Python Service

Root:

platform/services/python-execution-service

Model:

app/models/trading_phase.py

Service:

app/services/trading_phase_service.py

Route:

app/routes/trading_phase.py

Endpoint:

POST

/api/v1/trading-phase/state

Registration:

app/main.py

Router:

trading_phase_router

---

# N8N Workflow

Workflow:

WF-07F TRADING_PHASE_CLOCK

Node 01

START_TRADING_PHASE_CLOCK

Manual Trigger

---

Node 02

BUILD_PLATFORM_CONTEXT

Set Node

Outputs:

market

market_timezone

asset_class

---

Node 03

REQUEST_SYSTEM_CLOCK

WF-07A

---

Node 04

REQUEST_BUSINESS_CLOCK

WF-07B

---

Node 05

BUILD_MARKET_SESSION_REQUEST

WF-07C Request Builder

---

Node 06

REQUEST_MARKET_SESSION

WF-07C

---

Node 07

REQUEST_SYSTEM_HEALTH

WF-07D

---

Node 08

BUILD_TRADING_DAY_REQUEST

WF-07E Request Builder

---

Node 09

REQUEST_TRADING_DAY

WF-07E

---

Node 10

BUILD_TRADING_PHASE_REQUEST

WF-07F Request Builder

---

Node 11

REQUEST_TRADING_PHASE

WF-07F

---

Node 12

NORMALIZE_TRADING_PHASE

Output Normalization

---

Node 13

WORKFLOW_COMPLETE

NoOp

---

# Workflow Topology

START_TRADING_PHASE_CLOCK
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

NORMALIZE_TRADING_PHASE
↓

WORKFLOW_COMPLETE

---

# Future Expansion

Additional States

HOLIDAY

AFTER_HOURS

EARLY_CLOSE

MAINTENANCE

EMERGENCY_STOP

DISASTER_RECOVERY

BROKER_DISCONNECTED

RISK_LOCKDOWN

No redesign required.

---

# Institutional Rule

WF-07F is the authoritative operational phase controller.

Downstream systems must consume:

phase_state

and must never independently calculate platform phase.
