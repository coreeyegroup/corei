# WF-01D — MARKET_CONTEXT

────────────────────────────────────────────────────────
WORKFLOW IDENTIFICATION
────────────────────────────────────────────────────────

Workflow ID:
WF-01D

Workflow Name:
MARKET_CONTEXT

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

MARKET_CONTEXT establishes the authoritative market context contract used by all downstream market intelligence workflows.

MARKET_CONTEXT is the first workflow that transitions the platform from:

Infrastructure Awareness

to

Market Awareness

Previous workflows validate:

• Feed Connectivity
• Feed Health
• Snapshot Integrity

MARKET_CONTEXT determines:

What market environment currently exists?

The output becomes the foundation for:

• Market Regime
• Market Environment
• Signal Generation
• Strategy Evaluation
• Research
• Portfolio Decisions

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

WF-01C MARKET_SNAPSHOT

Consumes:

workflow_id

market
market_profile

data_provider

snapshot_timestamp

snapshot_state

feed_health

feed_freshness

snapshot_trusted

────────────────────────────────────────────────────────
DOWNSTREAM DEPENDENCIES
────────────────────────────────────────────────────────

WF-01E MARKET_REGIME

Future Consumers

• Regime Engine
• Environment Engine
• Signal Engine
• Strategy Engine
• Portfolio Engine
• Research Engine
• Dashboard Engine

────────────────────────────────────────────────────────
BUSINESS OBJECTIVE
────────────────────────────────────────────────────────

Transform snapshot quality into a normalized market context.

Infrastructure State
        ↓
Market Context

Output must be deterministic.

No inference.

No probability.

No AI.

No manual overrides.

────────────────────────────────────────────────────────
AUTHORITATIVE STATE ENGINE
────────────────────────────────────────────────────────

INPUT

snapshot_state

snapshot_trusted

OUTPUT

market_context

context_state

context_trusted

────────────────────────────────────────────────────────

CASE 1

snapshot_state = ACTIVE

snapshot_trusted = TRUE

OUTPUT

market_context = NORMAL

context_state = ACTIVE

context_trusted = TRUE

────────────────────────────────────────────────────────

CASE 2

snapshot_state = ACTIVE

snapshot_trusted = FALSE

OUTPUT

market_context = LIMITED

context_state = DEGRADED

context_trusted = FALSE

────────────────────────────────────────────────────────

CASE 3

snapshot_state = DEGRADED

OUTPUT

market_context = DEGRADED

context_state = DEGRADED

context_trusted = FALSE

────────────────────────────────────────────────────────

CASE 4

snapshot_state = INACTIVE

OUTPUT

market_context = UNAVAILABLE

context_state = INACTIVE

context_trusted = FALSE

────────────────────────────────────────────────────────
PYTHON IMPLEMENTATION
────────────────────────────────────────────────────────

FILES

app/models/market_context.py

app/services/market_context_service.py

app/routes/market_context.py

app/main.py

────────────────────────────────────────────────────────
MODEL
────────────────────────────────────────────────────────

FILE

app/models/market_context.py

Request Model

MarketContextRequest

Fields

workflow_id

market

market_profile

data_provider

snapshot_timestamp

snapshot_state

feed_health

feed_freshness

snapshot_trusted

Response Model

MarketContextResponse

Fields

workflow_id

workflow_name

workflow_version

component_type

market

market_profile

context_timestamp

market_context

context_state

snapshot_state

context_trusted

────────────────────────────────────────────────────────
SERVICE
────────────────────────────────────────────────────────

FILE

app/services/market_context_service.py

Purpose

Determine normalized market context.

Logic

ACTIVE + TRUSTED
→ NORMAL

ACTIVE + UNTRUSTED
→ LIMITED

DEGRADED
→ DEGRADED

INACTIVE
→ UNAVAILABLE

Context timestamp generated using UTC.

────────────────────────────────────────────────────────
ROUTE
────────────────────────────────────────────────────────

FILE

app/routes/market_context.py

Endpoint

POST

/api/v1/market-context/state

Purpose

Expose context contract.

────────────────────────────────────────────────────────
MAIN REGISTRATION
────────────────────────────────────────────────────────

IMPORT

market_context_router

REGISTER

app.include_router(
    market_context_router
)

────────────────────────────────────────────────────────
PYTHON VALIDATION
────────────────────────────────────────────────────────

Route Registration

PASS

OpenAPI Registration

PASS

Endpoint Validation

PASS

Validated Response

{
  "workflow_id":"WF-01D",
  "workflow_name":"MARKET_CONTEXT",
  "workflow_version":"1.0",
  "component_type":"MARKET_DATA",
  "market":"NSE",
  "market_profile":"NSE_EQUITY",
  "context_timestamp":"2026-06-06T18:27:09Z",
  "market_context":"NORMAL",
  "context_state":"ACTIVE",
  "snapshot_state":"ACTIVE",
  "context_trusted":true
}

────────────────────────────────────────────────────────
N8N IMPLEMENTATION
────────────────────────────────────────────────────────

WORKFLOW FLOW

START_MARKET_CONTEXT
        ↓
BUILD_PLATFORM_CONTEXT
        ↓
REQUEST_MARKET_SNAPSHOT
        ↓
BUILD_MARKET_CONTEXT_REQUEST
        ↓
REQUEST_MARKET_CONTEXT
        ↓
NORMALIZE_MARKET_CONTEXT
        ↓
WORKFLOW_COMPLETE

────────────────────────────────────────────────────────
NODE 1
────────────────────────────────────────────────────────

START_MARKET_CONTEXT

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

Output

{
  "market":"NSE",
  "market_profile":"NSE_EQUITY",
  "data_provider":"UPSTOX"
}

────────────────────────────────────────────────────────
NODE 3
────────────────────────────────────────────────────────

REQUEST_MARKET_SNAPSHOT

Type

HTTP Request

Method

POST

URL

http://python-execution-service.platform.svc.cluster.local:8000/api/v1/market-snapshot/state

Body

workflow_id = WF-01C

market = NSE

market_profile = NSE_EQUITY

data_provider = UPSTOX

feed_health = HEALTHY

feed_freshness = REALTIME

feed_trusted = true

Purpose

Obtain authoritative market snapshot.

────────────────────────────────────────────────────────
NODE 4
────────────────────────────────────────────────────────

BUILD_MARKET_CONTEXT_REQUEST

Type

Set

Keep Only Set

TRUE

Fields

workflow_id

market

market_profile

data_provider

snapshot_timestamp

snapshot_state

feed_health

feed_freshness

snapshot_trusted

Validated Output

{
  "workflow_id":"WF-01D",
  "market":"NSE",
  "market_profile":"NSE_EQUITY",
  "data_provider":"UPSTOX",
  "snapshot_timestamp":"2026-06-06T18:32:26Z",
  "snapshot_state":"ACTIVE",
  "feed_health":"HEALTHY",
  "feed_freshness":"REALTIME",
  "snapshot_trusted":true
}

────────────────────────────────────────────────────────
NODE 5
────────────────────────────────────────────────────────

REQUEST_MARKET_CONTEXT

Type

HTTP Request

Method

POST

URL

http://python-execution-service.platform.svc.cluster.local:8000/api/v1/market-context/state

Body

workflow_id

market

market_profile

data_provider

snapshot_timestamp

snapshot_state

feed_health

feed_freshness

snapshot_trusted

Validated Output

{
  "workflow_id":"WF-01D",
  "workflow_name":"MARKET_CONTEXT",
  "workflow_version":"1.0",
  "component_type":"MARKET_DATA",
  "market":"NSE",
  "market_profile":"NSE_EQUITY",
  "context_timestamp":"2026-06-06T18:38:37Z",
  "market_context":"NORMAL",
  "context_state":"ACTIVE",
  "snapshot_state":"ACTIVE",
  "context_trusted":true
}

────────────────────────────────────────────────────────
NODE 6
────────────────────────────────────────────────────────

NORMALIZE_MARKET_CONTEXT

Type

Set

Keep Only Set

TRUE

Fields

workflow_id

workflow_name

workflow_version

component_type

market

market_profile

context_timestamp

market_context

context_state

snapshot_state

context_trusted

Validated Output

Matches authoritative contract.

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

{
  "workflow_id":"WF-01D",
  "market":"NSE",
  "market_profile":"NSE_EQUITY",
  "data_provider":"UPSTOX",
  "snapshot_timestamp":"2026-06-06T18:32:26Z",
  "snapshot_state":"ACTIVE",
  "feed_health":"HEALTHY",
  "feed_freshness":"REALTIME",
  "snapshot_trusted":true
}

────────────────────────────────────────────────────────
OUTPUT CONTRACT
────────────────────────────────────────────────────────

{
  "workflow_id":"WF-01D",
  "workflow_name":"MARKET_CONTEXT",
  "workflow_version":"1.0",
  "component_type":"MARKET_DATA",
  "market":"NSE",
  "market_profile":"NSE_EQUITY",
  "context_timestamp":"2026-06-06T18:38:37Z",
  "market_context":"NORMAL",
  "context_state":"ACTIVE",
  "snapshot_state":"ACTIVE",
  "context_trusted":true
}

────────────────────────────────────────────────────────
SCALABILITY ROADMAP
────────────────────────────────────────────────────────

Reserved Fields

market_phase

market_session

market_region

market_liquidity_state

market_volatility_state

market_sentiment_state

market_stability_score

market_confidence_score

context_reason

context_source

context_priority

context_severity

context_confidence

market_microstructure_state

market_structure_score

exchange_operational_state

cross_market_context

cross_asset_context

event_risk_context

macro_context

news_context

institutional_flow_context

liquidity_regime

volatility_regime

trend_regime

mean_reversion_regime

risk_regime

Future Rule

Never Remove Existing Fields

Never Rename Existing Fields

Only Add Fields

Backward Compatibility Mandatory

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

WF-01D MARKET_CONTEXT

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

READY FOR WF-01E
