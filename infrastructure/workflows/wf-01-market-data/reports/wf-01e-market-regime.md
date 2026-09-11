# WF-01E — MARKET_REGIME

────────────────────────────────────────────────────────
WORKFLOW IDENTIFICATION
────────────────────────────────────────────────────────

Workflow ID:
WF-01E

Workflow Name:
MARKET_REGIME

Workflow Version:
1.0

Component Type:
MARKET_DATA

Execution Model:
N8N → Python Execution Service

Status:
CERTIFIED

────────────────────────────────────────────────────────
PURPOSE
────────────────────────────────────────────────────────

MARKET_REGIME converts MARKET_CONTEXT into a normalized market regime contract.

This workflow establishes the first behavioral classification layer of the platform.

Previous workflows answer:

Is the market feed available?

Is the market feed healthy?

Is the market snapshot trusted?

What market context exists?

MARKET_REGIME answers:

What behavioral regime currently exists?

The output becomes the authoritative regime contract used by:

• Environment Engine
• Signal Engine
• Strategy Engine
• Portfolio Engine
• Research Engine
• Dashboard Engine

────────────────────────────────────────────────────────
ARCHITECTURE POSITION
────────────────────────────────────────────────────────

WF-01A MARKET_FEED_CLOCK
        ↓
WF-01B MARKET_FEED_HEALTH
        ↓
WF-01C MARKET_SNAPSHOT
        ↓
WF-01D MARKET_CONTEXT
        ↓
WF-01E MARKET_REGIME
        ↓
WF-01F MARKET_ENVIRONMENT

────────────────────────────────────────────────────────
UPSTREAM DEPENDENCIES
────────────────────────────────────────────────────────

WF-01D MARKET_CONTEXT

Consumes:

workflow_id

market
market_profile

context_timestamp

market_context

context_state

context_trusted

────────────────────────────────────────────────────────
DOWNSTREAM DEPENDENCIES
────────────────────────────────────────────────────────

WF-01F MARKET_ENVIRONMENT

Future Consumers

• Environment Engine
• Signal Engine
• Strategy Engine
• Risk Engine
• Portfolio Engine
• Research Engine

────────────────────────────────────────────────────────
BUSINESS OBJECTIVE
────────────────────────────────────────────────────────

Convert context classification into a normalized market regime.

Context
        ↓
Regime

No AI

No prediction

No probabilities

No manual intervention

Deterministic only

────────────────────────────────────────────────────────
AUTHORITATIVE REGIME ENGINE
────────────────────────────────────────────────────────

INPUT

market_context

context_trusted

OUTPUT

market_regime

regime_state

regime_trusted

────────────────────────────────────────────────────────

CASE 1

market_context = NORMAL

OUTPUT

market_regime = NEUTRAL

regime_state = ACTIVE

regime_trusted = TRUE

────────────────────────────────────────────────────────

CASE 2

market_context = LIMITED

OUTPUT

market_regime = CAUTION

regime_state = DEGRADED

regime_trusted = FALSE

────────────────────────────────────────────────────────

CASE 3

market_context = DEGRADED

OUTPUT

market_regime = DEGRADED

regime_state = DEGRADED

regime_trusted = FALSE

────────────────────────────────────────────────────────

CASE 4

market_context = UNAVAILABLE

OUTPUT

market_regime = UNKNOWN

regime_state = INACTIVE

regime_trusted = FALSE

────────────────────────────────────────────────────────
PYTHON IMPLEMENTATION
────────────────────────────────────────────────────────

FILES

app/models/market_regime.py

app/services/market_regime_service.py

app/routes/market_regime.py

app/main.py

────────────────────────────────────────────────────────
MODEL
────────────────────────────────────────────────────────

Request Model

MarketRegimeRequest

Fields

workflow_id

market

market_profile

context_timestamp

market_context

context_state

context_trusted

Response Model

MarketRegimeResponse

Fields

workflow_id

workflow_name

workflow_version

component_type

market

market_profile

regime_timestamp

market_regime

regime_state

regime_trusted

────────────────────────────────────────────────────────
SERVICE
────────────────────────────────────────────────────────

FILE

app/services/market_regime_service.py

Purpose

Determine market regime.

Logic

NORMAL
→ NEUTRAL

LIMITED
→ CAUTION

DEGRADED
→ DEGRADED

UNAVAILABLE
→ UNKNOWN

Timestamp generated using UTC.

────────────────────────────────────────────────────────
ROUTE
────────────────────────────────────────────────────────

FILE

app/routes/market_regime.py

Endpoint

POST

/api/v1/market-regime/state

────────────────────────────────────────────────────────
MAIN REGISTRATION
────────────────────────────────────────────────────────

Import

market_regime_router

Register

app.include_router(
    market_regime_router
)

────────────────────────────────────────────────────────
PYTHON VALIDATION
────────────────────────────────────────────────────────

Image Build
PASS

Registry Push
PASS

Kubernetes Rollout
PASS

OpenAPI Registration
PASS

Endpoint Validation
PASS

Validated Response

{
  "workflow_id":"WF-01E",
  "workflow_name":"MARKET_REGIME",
  "workflow_version":"1.0",
  "component_type":"MARKET_DATA",
  "market":"NSE",
  "market_profile":"NSE_EQUITY",
  "regime_timestamp":"2026-06-06T19:02:52Z",
  "market_regime":"NEUTRAL",
  "regime_state":"ACTIVE",
  "regime_trusted":true
}

────────────────────────────────────────────────────────
N8N IMPLEMENTATION
────────────────────────────────────────────────────────

START_MARKET_REGIME
        ↓
BUILD_PLATFORM_CONTEXT
        ↓
REQUEST_MARKET_CONTEXT
        ↓
BUILD_MARKET_REGIME_REQUEST
        ↓
REQUEST_MARKET_REGIME
        ↓
NORMALIZE_MARKET_REGIME
        ↓
WORKFLOW_COMPLETE

────────────────────────────────────────────────────────
NODE 1
────────────────────────────────────────────────────────

START_MARKET_REGIME

Type

Manual Trigger

Purpose

Workflow Entry

────────────────────────────────────────────────────────
NODE 2
────────────────────────────────────────────────────────

BUILD_PLATFORM_CONTEXT

Type

Set

Keep Only Set

TRUE

Fields

market = NSE

market_profile = NSE_EQUITY

data_provider = UPSTOX

────────────────────────────────────────────────────────
NODE 3
────────────────────────────────────────────────────────

REQUEST_MARKET_CONTEXT

Type

HTTP Request

Method

POST

/api/v1/market-context/state

Purpose

Obtain authoritative market context.

────────────────────────────────────────────────────────
NODE 4
────────────────────────────────────────────────────────

BUILD_MARKET_REGIME_REQUEST

Type

Set

Purpose

Construct WF-01E request contract.

Validated Output

{
  "workflow_id":"WF-01E",
  "market":"NSE",
  "market_profile":"NSE_EQUITY",
  "context_timestamp":"2026-06-06T19:30:56Z",
  "market_context":"NORMAL",
  "context_state":"ACTIVE",
  "context_trusted":true
}

────────────────────────────────────────────────────────
NODE 5
────────────────────────────────────────────────────────

REQUEST_MARKET_REGIME

Type

HTTP Request

Method

POST

/api/v1/market-regime/state

Purpose

Obtain authoritative regime contract.

Validated Output

{
  "workflow_id":"WF-01E",
  "workflow_name":"MARKET_REGIME",
  "workflow_version":"1.0",
  "component_type":"MARKET_DATA",
  "market":"NSE",
  "market_profile":"NSE_EQUITY",
  "regime_timestamp":"2026-06-06T19:30:56Z",
  "market_regime":"NEUTRAL",
  "regime_state":"ACTIVE",
  "regime_trusted":true
}

────────────────────────────────────────────────────────
NODE 6
────────────────────────────────────────────────────────

NORMALIZE_MARKET_REGIME

Type

Set

Purpose

Normalize final regime contract.

────────────────────────────────────────────────────────
NODE 7
────────────────────────────────────────────────────────

WORKFLOW_COMPLETE

Type

No Operation

Purpose

Workflow termination.

────────────────────────────────────────────────────────
INPUT CONTRACT
────────────────────────────────────────────────────────

workflow_id

market

market_profile

context_timestamp

market_context

context_state

context_trusted

────────────────────────────────────────────────────────
OUTPUT CONTRACT
────────────────────────────────────────────────────────

workflow_id

workflow_name

workflow_version

component_type

market

market_profile

regime_timestamp

market_regime

regime_state

regime_trusted

────────────────────────────────────────────────────────
SCALABILITY ROADMAP
────────────────────────────────────────────────────────

Reserved Fields

trend_regime

volatility_regime

liquidity_regime

participation_regime

institutional_flow_regime

options_regime

sector_regime

breadth_regime

momentum_regime

risk_regime

macro_regime

cross_asset_regime

regime_confidence

regime_priority

regime_source

regime_reason

regime_score

regime_stability

────────────────────────────────────────────────────────
BACKWARD COMPATIBILITY
────────────────────────────────────────────────────────

Never Remove Fields

Never Rename Fields

Only Add Fields

────────────────────────────────────────────────────────
VALIDATION RESULTS
────────────────────────────────────────────────────────

Python Validation
PASS

OpenAPI Validation
PASS

Endpoint Validation
PASS

N8N Validation
PASS

Normalization Validation
PASS

State Engine Validation
PASS

Contract Validation
PASS

End-To-End Validation
PASS

────────────────────────────────────────────────────────
CERTIFICATION
────────────────────────────────────────────────────────

WF-01E MARKET_REGIME

DESCRIBE
PASS

IMPLEMENT (PYTHON)
PASS

VALIDATE (PYTHON)
PASS

IMPLEMENT (N8N)
PASS

VALIDATE (N8N)
PASS

STATUS

CERTIFIED

FROZEN

READY FOR WF-01F
