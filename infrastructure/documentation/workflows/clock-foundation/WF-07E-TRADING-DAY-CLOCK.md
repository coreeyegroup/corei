# WF-07E — TRADING DAY CLOCK

## Classification

Workflow ID:
WF-07E

Workflow Name:
TRADING_DAY_CLOCK

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

TRADING_DAY_CLOCK is the first governance workflow within the Clock Foundation.

Previous workflows establish facts:

WF-07A
SYSTEM_CLOCK

WF-07B
BUSINESS_CLOCK

WF-07C
MARKET_SESSION_CLOCK

WF-07D
SYSTEM_HEALTH_CLOCK

WF-07E converts those facts into an operational decision.

Question Answered:

"Is trading currently permitted?"

This workflow becomes the authoritative trading permission layer used by all downstream trading services.

---

# Architectural Position

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

Provide a deterministic platform-wide answer to:

Can trading occur right now?

Without this workflow:

Every downstream component must independently evaluate:

• Business Day
• Market Session
• Platform Health

This creates:

• duplicated logic
• inconsistent decisions
• governance drift
• operational risk

TRADING_DAY_CLOCK centralizes the decision.

---

# Inputs

## From WF-07B

business_day

Type:
Boolean

Example:

true

---

## From WF-07C

market

session_state

Examples:

NSE

MARKET_OPEN

---

## From WF-07D

health_state

Example:

HEALTHY

---

# Decision Logic

Trading is allowed only when:

business_day = true

AND

session_state = MARKET_OPEN

AND

health_state = HEALTHY

---

# Version 1.0 Rules

Rule 1

Business Day Required

business_day = true

otherwise

TRADING_BLOCKED

---

Rule 2

Market Must Be Open

Allowed:

MARKET_OPEN

Blocked:

PRE_MARKET

MARKET_CLOSED

---

Rule 3

Platform Must Be Healthy

Allowed:

HEALTHY

Blocked:

DEGRADED

CRITICAL

---

# Decision Matrix

Business Day:
TRUE

Session:
MARKET_OPEN

Health:
HEALTHY

Result:
TRADING_ALLOWED

--------------------------------

Business Day:
FALSE

Session:
MARKET_OPEN

Health:
HEALTHY

Result:
TRADING_BLOCKED

--------------------------------

Business Day:
TRUE

Session:
PRE_MARKET

Health:
HEALTHY

Result:
TRADING_BLOCKED

--------------------------------

Business Day:
TRUE

Session:
MARKET_CLOSED

Health:
HEALTHY

Result:
TRADING_BLOCKED

--------------------------------

Business Day:
TRUE

Session:
MARKET_OPEN

Health:
DEGRADED

Result:
TRADING_BLOCKED

--------------------------------

Business Day:
TRUE

Session:
MARKET_OPEN

Health:
CRITICAL

Result:
TRADING_BLOCKED

---

# Output Contract

{
  "workflow_id": "WF-07E",
  "workflow_name": "TRADING_DAY_CLOCK",
  "workflow_version": "1.0",
  "component_type": "OPERATIONS",

  "trading_allowed": true,

  "trading_state": "TRADING_ALLOWED",

  "market": "NSE",

  "session_state": "MARKET_OPEN",

  "business_day": true,

  "health_state": "HEALTHY"
}

---

# Python Service

Location

platform/services/python-execution-service

---

## Model

app/models/trading_day.py

Responsibilities:

Request Contract

Response Contract

Validation

---

## Service

app/services/trading_day_service.py

Responsibilities:

Trading permission evaluation

Decision logic

State generation

---

## Route

app/routes/trading_day.py

Endpoint:

POST

/api/v1/trading-day/state

Responsibilities:

Receive workflow request

Call trading service

Return authoritative contract

---

## Registration

app/main.py

Router Registration:

trading_day_router

---

# N8N Workflow

Workflow:

WF-07E TRADING_DAY_CLOCK

---

## Node 1

START_TRADING_DAY_CLOCK

Type:

Manual Trigger

Purpose:

Workflow entry point

---

## Node 2

REQUEST_SYSTEM_CLOCK

Type:

HTTP Request

Endpoint:

/api/v1/clock/state

Purpose:

Generate authoritative UTC timestamp

---

## Node 3

REQUEST_BUSINESS_CLOCK

Type:

HTTP Request

Endpoint:

/api/v1/business-clock/state

Purpose:

Determine business-day state

---

## Node 4

BUILD_MARKET_SESSION_REQUEST

Type:

Set

Purpose:

Build request payload for market session evaluation

Outputs:

workflow_id

market

utc_timestamp

business_day

---

## Node 5

REQUEST_MARKET_SESSION

Type:

HTTP Request

Endpoint:

/api/v1/market-session/state

Purpose:

Determine market session

Outputs:

session_state

market

business_day

---

## Node 6

REQUEST_SYSTEM_HEALTH

Type:

HTTP Request

Endpoint:

/api/v1/system-health/state

Purpose:

Determine platform health

Outputs:

health_state

---

## Node 7

BUILD_TRADING_DAY_REQUEST

Type:

Set

Purpose:

Construct governance decision request

Outputs:

workflow_id

market

business_day

session_state

health_state

---

## Node 8

REQUEST_TRADING_DAY

Type:

HTTP Request

Endpoint:

/api/v1/trading-day/state

Purpose:

Generate authoritative trading decision

Outputs:

trading_allowed

trading_state

---

## Node 9

NORMALIZE_TRADING_DAY

Type:

Set

Purpose:

Normalize workflow output contract

Boolean Fields:

trading_allowed

business_day

---

## Node 10

WORKFLOW_COMPLETE

Type:

No Operation

Purpose:

Institutional workflow termination point

---

# Workflow Topology

START_TRADING_DAY_CLOCK
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

NORMALIZE_TRADING_DAY
                ↓

WORKFLOW_COMPLETE

---

# Consumers

Future Consumers

• TRADING_PHASE_CLOCK
• Signal Engine
• Risk Engine
• Portfolio Engine
• Execution Engine
• Operator Dashboard
• Governance Services

---

# Future Expansion

Version 2+

Additional Inputs

• Risk State
• Kill Switch State
• Broker Connectivity State
• Compliance State
• Operator Approval State
• Portfolio State

Future Logic

Business Day
        +
Market Session
        +
Platform Health
        +
Risk
        +
Connectivity
        +
Governance

↓

TRADING_ALLOWED

TRADING_BLOCKED

No redesign required.

---

# Institutional Rule

TRADING_DAY_CLOCK is the authoritative source of trading permission.

No downstream workflow may independently determine:

• if trading is allowed
• if the market is tradable
• if platform health permits execution

All downstream systems must consume:

trading_allowed

from WF-07E.

