# WF-01C — MARKET_SNAPSHOT

## WORKFLOW IDENTIFICATION

Workflow ID: WF-01C

Workflow Name: MARKET_SNAPSHOT

Workflow Domain: MARKET_DATA

Component Type: MARKET_DATA

Execution Model: N8N → Python Execution Service

Workflow Version: 1.0

Status: CERTIFIED

---

# PURPOSE

MARKET_SNAPSHOT creates the authoritative market-data snapshot contract for the platform.

The workflow consumes validated feed-health information from WF-01B and converts it into a deterministic snapshot state representing the current operational usability of market data.

MARKET_SNAPSHOT is the final feed-validation layer before market intelligence generation begins.

This workflow serves as the handoff point between infrastructure monitoring and market analysis.

---

# ARCHITECTURE POSITION

AUTHORITATIVE CHAIN

WF-01A MARKET_FEED_CLOCK
↓
WF-01B MARKET_FEED_HEALTH
↓
WF-01C MARKET_SNAPSHOT
↓
WF-01D MARKET_CONTEXT
↓
WF-02 SIGNAL GENERATION LAYER

---

# UPSTREAM DEPENDENCIES

WF-01B — MARKET_FEED_HEALTH

Required Inputs:

* market
* market_profile
* data_provider
* feed_health
* feed_freshness
* feed_trusted

---

# DOWNSTREAM DEPENDENCIES

WF-01D — MARKET_CONTEXT

Future Consumers:

* Market Context Engine
* Signal Layer
* Strategy Layer
* Research Layer
* Analytics Layer
* Monitoring Layer
* Dashboard Layer

---

# BUSINESS OBJECTIVE

Determine whether current market data can be trusted and consumed by the remainder of the platform.

The workflow produces:

* snapshot_timestamp
* snapshot_state
* feed_health
* feed_freshness
* snapshot_trusted

The snapshot becomes the authoritative market-data status contract.

---

# STATE ENGINE

## INPUT STATES

HEALTHY

DEGRADED

UNHEALTHY

UNKNOWN

---

## DECISION MATRIX

HEALTHY
→ ACTIVE

DEGRADED
→ DEGRADED

UNHEALTHY
→ INACTIVE

UNKNOWN
→ INACTIVE

---

## TRUST LOGIC

feed_trusted
→ snapshot_trusted

No overrides.

No probabilistic decisions.

No manual intervention.

Deterministic only.

---

# PYTHON IMPLEMENTATION

## FILE STRUCTURE

platform/services/python-execution-service/

app/

models/

market_snapshot.py

services/

market_snapshot_service.py

routes/

market_snapshot.py

main.py

---

# REQUEST MODEL

FILE

app/models/market_snapshot.py

MarketSnapshotRequest

Fields

workflow_id: str

market: str

market_profile: str

data_provider: str

feed_health: str

feed_freshness: str

feed_trusted: bool

---

# RESPONSE MODEL

MarketSnapshotResponse

Fields

workflow_id: str

workflow_name: str

workflow_version: str

component_type: str

market: str

market_profile: str

data_provider: str

snapshot_timestamp: str

snapshot_state: str

feed_health: str

feed_freshness: str

snapshot_trusted: bool

---

# SERVICE IMPLEMENTATION

FILE

app/services/market_snapshot_service.py

Purpose

Generate deterministic market snapshot state.

Logic

IF

feed_health == HEALTHY

THEN

snapshot_state = ACTIVE

ELIF

feed_health == DEGRADED

THEN

snapshot_state = DEGRADED

ELSE

snapshot_state = INACTIVE

snapshot_trusted = feed_trusted

snapshot_timestamp = UTC NOW

---

# ROUTE IMPLEMENTATION

FILE

app/routes/market_snapshot.py

Endpoint

POST

/api/v1/market-snapshot/state

Purpose

Expose MARKET_SNAPSHOT state contract.

---

# MAIN REGISTRATION

FILE

app/main.py

Required Registration

from app.routes.market_snapshot import (
router as market_snapshot_router
)

app.include_router(
market_snapshot_router
)

---

# PYTHON VALIDATION

Endpoint

POST

/api/v1/market-snapshot/state

Validation Result

PASS

Validated Response

{
"workflow_id":"WF-01C",
"workflow_name":"MARKET_SNAPSHOT",
"workflow_version":"1.0",
"component_type":"MARKET_DATA",
"market":"NSE",
"market_profile":"NSE_EQUITY",
"data_provider":"UPSTOX",
"snapshot_timestamp":"2026-06-06T17:59:20Z",
"snapshot_state":"ACTIVE",
"feed_health":"HEALTHY",
"feed_freshness":"REALTIME",
"snapshot_trusted":true
}

---

# N8N IMPLEMENTATION

## AUTHORITATIVE FLOW

START_MARKET_SNAPSHOT
↓
BUILD_PLATFORM_CONTEXT
↓
REQUEST_MARKET_FEED_HEALTH
↓
BUILD_MARKET_SNAPSHOT_REQUEST
↓
REQUEST_MARKET_SNAPSHOT
↓
NORMALIZE_MARKET_SNAPSHOT
↓
WORKFLOW_COMPLETE

---

# NODE 01

START_MARKET_SNAPSHOT

Type

Manual Trigger

Purpose

Workflow Entry

---

# NODE 02

BUILD_PLATFORM_CONTEXT

Type

Set

Keep Only Set

TRUE

Fields

market = NSE

market_profile = NSE_EQUITY

data_provider = UPSTOX

---

# NODE 03

REQUEST_MARKET_FEED_HEALTH

Type

HTTP Request

Method

POST

URL

http://python-execution-service.platform.svc.cluster.local:8000/api/v1/market-feed-health/state

Authentication

None

Body Content Type

JSON

Body Parameters

workflow_id = WF-01B

market = NSE

market_profile = NSE_EQUITY

data_provider = UPSTOX

feed_state = CONNECTED

feed_available = true

Expected Output

workflow_id

workflow_name

workflow_version

component_type

market

market_profile

data_provider

feed_health

feed_latency_ms

feed_freshness

feed_trusted

---

# NODE 04

BUILD_MARKET_SNAPSHOT_REQUEST

Type

Set

Keep Only Set

TRUE

Fields

workflow_id = WF-01C

market = {{$json.market}}

market_profile = {{$json.market_profile}}

data_provider = {{$json.data_provider}}

feed_health = {{$json.feed_health}}

feed_freshness = {{$json.feed_freshness}}

feed_trusted = {{$json.feed_trusted}}

Validated Output

{
"workflow_id":"WF-01C",
"market":"NSE",
"market_profile":"NSE_EQUITY",
"data_provider":"UPSTOX",
"feed_health":"HEALTHY",
"feed_freshness":"REALTIME",
"feed_trusted":true
}

---

# NODE 05

REQUEST_MARKET_SNAPSHOT

Type

HTTP Request

Method

POST

URL

http://python-execution-service.platform.svc.cluster.local:8000/api/v1/market-snapshot/state

Authentication

None

Send Body

TRUE

Body Content Type

JSON

Specify Body

Using Fields Below

Body Parameters

workflow_id = {{$json.workflow_id}}

market = {{$json.market}}

market_profile = {{$json.market_profile}}

data_provider = {{$json.data_provider}}

feed_health = {{$json.feed_health}}

feed_freshness = {{$json.feed_freshness}}

feed_trusted = {{$json.feed_trusted}}

Timeout

30000

Never Error

FALSE

Validated Output

{
"workflow_id":"WF-01C",
"workflow_name":"MARKET_SNAPSHOT",
"workflow_version":"1.0",
"component_type":"MARKET_DATA",
"market":"NSE",
"market_profile":"NSE_EQUITY",
"data_provider":"UPSTOX",
"snapshot_timestamp":"2026-06-06T17:59:20Z",
"snapshot_state":"ACTIVE",
"feed_health":"HEALTHY",
"feed_freshness":"REALTIME",
"snapshot_trusted":true
}

---

# NODE 06

NORMALIZE_MARKET_SNAPSHOT

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

data_provider

snapshot_timestamp

snapshot_state

feed_health

feed_freshness

snapshot_trusted

Validated Output

Matches authoritative contract.

---

# NODE 07

WORKFLOW_COMPLETE

Type

No Operation

Purpose

Workflow termination.

---

# INPUT CONTRACT

{
"workflow_id":"WF-01C",
"market":"NSE",
"market_profile":"NSE_EQUITY",
"data_provider":"UPSTOX",
"feed_health":"HEALTHY",
"feed_freshness":"REALTIME",
"feed_trusted":true
}

---

# OUTPUT CONTRACT

{
"workflow_id":"WF-01C",
"workflow_name":"MARKET_SNAPSHOT",
"workflow_version":"1.0",
"component_type":"MARKET_DATA",
"market":"NSE",
"market_profile":"NSE_EQUITY",
"data_provider":"UPSTOX",
"snapshot_timestamp":"2026-06-06T17:59:20Z",
"snapshot_state":"ACTIVE",
"feed_health":"HEALTHY",
"feed_freshness":"REALTIME",
"snapshot_trusted":true
}

---

# FUTURE SCALABILITY ROADMAP

Reserved Expansion Fields

feed_latency_ms

provider_region

provider_cluster

provider_failover_state

packet_loss_pct

stale_data_seconds

integrity_score

quality_score

provider_redundancy

exchange_latency_ms

Backward Compatibility Rules

Existing Fields:
NEVER REMOVE

Existing Fields:
NEVER RENAME

Only additive expansion allowed.

---

# VALIDATION EVIDENCE

Python Validation

PASS

N8N Validation

PASS

Contract Validation

PASS

State Logic Validation

PASS

Normalization Validation

PASS

End-to-End Validation

PASS

---

# CERTIFICATION

WF-01C — MARKET_SNAPSHOT

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

READY FOR WF-01D
