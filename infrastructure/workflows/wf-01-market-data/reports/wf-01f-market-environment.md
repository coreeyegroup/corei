# WF-01F — MARKET_ENVIRONMENT

────────────────────────────────────────────────────────
WORKFLOW IDENTIFICATION
────────────────────────────────────────────────────────

Workflow ID:
WF-01F

Workflow Name:
MARKET_ENVIRONMENT

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

MARKET_ENVIRONMENT converts the normalized
market regime into a normalized market
environment contract.

This workflow is the final workflow
inside the WF-01 Market Data Foundation.

The workflow answers:

"What trading environment currently exists?"

The resulting environment contract becomes
the authoritative market state consumed by:

• Signal Engine
• Strategy Engine
• Portfolio Engine
• Risk Engine
• Execution Engine
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
        ↓
WF-02 SIGNAL LAYER

WF-01F is the final workflow
inside WF-01.

────────────────────────────────────────────────────────
UPSTREAM DEPENDENCIES
────────────────────────────────────────────────────────

Consumes:

WF-01E MARKET_REGIME

Required Inputs:

workflow_id

market

market_profile

regime_timestamp

market_regime

regime_state

regime_trusted

────────────────────────────────────────────────────────
DOWNSTREAM DEPENDENCIES
────────────────────────────────────────────────────────

Primary Consumer:

WF-02 SIGNAL LAYER

Future Consumers:

• Signal Engine
• Strategy Engine
• Portfolio Engine
• Risk Engine
• Execution Engine
• Dashboard Engine

────────────────────────────────────────────────────────
BUSINESS OBJECTIVE
────────────────────────────────────────────────────────

Translate market regime information
into a standardized trading environment.

Context
        ↓
Regime
        ↓
Environment

The environment layer becomes the final
abstraction consumed by trading systems.

This prevents downstream systems from
depending directly on infrastructure state.

────────────────────────────────────────────────────────
AUTHORITATIVE ENVIRONMENT ENGINE
────────────────────────────────────────────────────────

INPUT

market_regime

regime_state

regime_trusted

OUTPUT

market_environment

environment_state

environment_trusted

────────────────────────────────────────────────────────

CASE 1

market_regime = NEUTRAL

OUTPUT

market_environment = STANDARD

environment_state = ACTIVE

environment_trusted = TRUE

────────────────────────────────────────────────────────

CASE 2

market_regime = CAUTION

OUTPUT

market_environment = RESTRICTED

environment_state = DEGRADED

environment_trusted = FALSE

────────────────────────────────────────────────────────

CASE 3

market_regime = DEGRADED

OUTPUT

market_environment = DEGRADED

environment_state = DEGRADED

environment_trusted = FALSE

────────────────────────────────────────────────────────

CASE 4

market_regime = UNKNOWN

OUTPUT

market_environment = UNAVAILABLE

environment_state = INACTIVE

environment_trusted = FALSE

────────────────────────────────────────────────────────
PYTHON IMPLEMENTATION
────────────────────────────────────────────────────────

FILES

app/models/market_environment.py

app/services/market_environment_service.py

app/routes/market_environment.py

app/main.py

────────────────────────────────────────────────────────
MODEL
────────────────────────────────────────────────────────

Request Model

MarketEnvironmentRequest

Fields

workflow_id

market

market_profile

regime_timestamp

market_regime

regime_state

regime_trusted

Response Model

MarketEnvironmentResponse

Fields

workflow_id

workflow_name

workflow_version

component_type

market

market_profile

environment_timestamp

market_environment

environment_state

environment_trusted

────────────────────────────────────────────────────────
SERVICE
────────────────────────────────────────────────────────

FILE

app/services/market_environment_service.py

Purpose

Convert market regime into
market environment.

Decision Logic

NEUTRAL
→ STANDARD

CAUTION
→ RESTRICTED

DEGRADED
→ DEGRADED

UNKNOWN
→ UNAVAILABLE

Timestamp generated in UTC.

────────────────────────────────────────────────────────
ROUTE
────────────────────────────────────────────────────────

FILE

app/routes/market_environment.py

Endpoint

POST

/api/v1/market-environment/state

────────────────────────────────────────────────────────
MAIN REGISTRATION
────────────────────────────────────────────────────────

Import

market_environment_router

Registration

app.include_router(
    market_environment_router
)

────────────────────────────────────────────────────────
PYTHON VALIDATION
────────────────────────────────────────────────────────

Image Build
PASS

Registry Push
PASS

Deployment Rollout
PASS

OpenAPI Registration
PASS

Endpoint Validation
PASS

Validated Response

{
  "workflow_id":"WF-01F",
  "workflow_name":"MARKET_ENVIRONMENT",
  "workflow_version":"1.0",
  "component_type":"MARKET_DATA",
  "market":"NSE",
  "market_profile":"NSE_EQUITY",
  "environment_timestamp":"2026-06-06T20:07:15Z",
  "market_environment":"STANDARD",
  "environment_state":"ACTIVE",
  "environment_trusted":true
}

────────────────────────────────────────────────────────
N8N IMPLEMENTATION
────────────────────────────────────────────────────────

START_MARKET_ENVIRONMENT
        ↓
BUILD_PLATFORM_CONTEXT
        ↓
REQUEST_MARKET_REGIME
        ↓
BUILD_MARKET_ENVIRONMENT_REQUEST
        ↓
REQUEST_MARKET_ENVIRONMENT
        ↓
NORMALIZE_MARKET_ENVIRONMENT
        ↓
WORKFLOW_COMPLETE

────────────────────────────────────────────────────────
NODE 1
────────────────────────────────────────────────────────

START_MARKET_ENVIRONMENT

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

REQUEST_MARKET_REGIME

Type

HTTP Request

Method

POST

/api/v1/market-regime/state

Purpose

Obtain authoritative market regime.

────────────────────────────────────────────────────────
NODE 4
────────────────────────────────────────────────────────

BUILD_MARKET_ENVIRONMENT_REQUEST

Type

Set

Purpose

Construct WF-01F request contract.

Validated Output

{
  "workflow_id":"WF-01F",
  "market":"NSE",
  "market_profile":"NSE_EQUITY",
  "regime_timestamp":"2026-06-06T20:07:15Z",
  "market_regime":"NEUTRAL",
  "regime_state":"ACTIVE",
  "regime_trusted":true
}

────────────────────────────────────────────────────────
NODE 5
────────────────────────────────────────────────────────

REQUEST_MARKET_ENVIRONMENT

Type

HTTP Request

Method

POST

/api/v1/market-environment/state

Purpose

Obtain authoritative market
environment contract.

Validated Output

{
  "workflow_id":"WF-01F",
  "workflow_name":"MARKET_ENVIRONMENT",
  "workflow_version":"1.0",
  "component_type":"MARKET_DATA",
  "market":"NSE",
  "market_profile":"NSE_EQUITY",
  "environment_timestamp":"2026-06-06T20:07:15Z",
  "market_environment":"STANDARD",
  "environment_state":"ACTIVE",
  "environment_trusted":true
}

────────────────────────────────────────────────────────
NODE 6
────────────────────────────────────────────────────────

NORMALIZE_MARKET_ENVIRONMENT

Type

Set

Purpose

Normalize final environment contract.

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

regime_timestamp

market_regime

regime_state

regime_trusted

────────────────────────────────────────────────────────
OUTPUT CONTRACT
────────────────────────────────────────────────────────

workflow_id

workflow_name

workflow_version

component_type

market

market_profile

environment_timestamp

market_environment

environment_state

environment_trusted

────────────────────────────────────────────────────────
SCALABILITY ROADMAP
────────────────────────────────────────────────────────

Reserved Future Fields

trend_environment

volatility_environment

liquidity_environment

participation_environment

institutional_environment

options_environment

sector_environment

breadth_environment

momentum_environment

risk_environment

macro_environment

cross_asset_environment

event_environment

news_environment

sentiment_environment

environment_confidence

environment_priority

environment_score

environment_reason

environment_source

Future intelligence may incorporate:

• Volatility Structure
• Options Positioning
• Breadth Analysis
• Liquidity Analysis
• Institutional Flow
• Macro Conditions
• Event Risk
• Cross Asset Analysis

without changing workflow architecture.

────────────────────────────────────────────────────────
BACKWARD COMPATIBILITY
────────────────────────────────────────────────────────

Never Remove Fields

Never Rename Fields

Only Add Fields

Contract Stability Mandatory

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

Environment Engine Validation
PASS

Contract Validation
PASS

End-To-End Validation
PASS

────────────────────────────────────────────────────────
CERTIFICATION
────────────────────────────────────────────────────────

WF-01F MARKET_ENVIRONMENT

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

READY FOR WF-02 SIGNAL LAYER
