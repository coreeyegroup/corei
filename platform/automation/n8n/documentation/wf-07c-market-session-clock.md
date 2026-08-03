# WF-07C — MARKET SESSION CLOCK

===============================================================================
PURPOSE
===============================================================================

WF-07C establishes authoritative market session awareness.

WF-07A answers:

    What time is it?

WF-07B answers:

    Is today a business day?

WF-07C answers:

    What market session is currently active?

This workflow transforms:

    UTC Time
            +
    Business Calendar State
            +
    Market Definition

into:

    Market Session State

WF-07C becomes the authoritative source for:

    Session Awareness
    Market Open Detection
    Market Closed Detection
    Pre-Market Detection
    Future Exchange Session Logic

===============================================================================
INSTITUTIONAL DESIGN PRINCIPLE
===============================================================================

Market session calculations must be centralized.

The platform must never allow:

    Strategies
    Execution Engines
    Risk Engines
    Portfolio Services
    Operators

to independently determine market session state.

Session state is calculated once and distributed as an authoritative
platform contract.

===============================================================================
WORKFLOW POSITION
===============================================================================

Platform Timing Hierarchy

    WF-07A SYSTEM CLOCK
            ↓

    WF-07B BUSINESS CLOCK
            ↓

    WF-07C MARKET SESSION CLOCK
            ↓

    WF-07D SYSTEM HEALTH CLOCK

===============================================================================
ARCHITECTURAL OBJECTIVE
===============================================================================

The platform is NOT:

    NSE Only

The platform IS:

    Global
    Multi-Market
    Multi-Asset
    Multi-Exchange

WF-07C was intentionally designed to support:

    India

    United States

    Europe

    Singapore

    Japan

    Australia

    Forex

    Crypto

without redesign.

===============================================================================
ARCHITECTURE
===============================================================================

WF-07A
SYSTEM_CLOCK
            ↓

WF-07B
BUSINESS_CLOCK
            ↓

WF-07C
MARKET_SESSION_ENGINE
            ↓

Session Contract

===============================================================================
PYTHON IMPLEMENTATION
===============================================================================

Service

    python-execution-service

Location

    platform/services/python-execution-service

===============================================================================
FILE STRUCTURE
===============================================================================

platform/services/python-execution-service/

├── app
│
├── models
│   └── market_session.py
│
├── routes
│   └── market_session.py
│
├── services
│   └── market_session_service.py
│
└── main.py

===============================================================================
PYTHON MODEL
===============================================================================

FILE

    app/models/market_session.py

-------------------------------------------------------------------------------
REQUEST MODEL
-------------------------------------------------------------------------------

MarketSessionRequest

Fields

    workflow_id

    market

    utc_timestamp

    business_day

-------------------------------------------------------------------------------
RESPONSE MODEL
-------------------------------------------------------------------------------

MarketSessionResponse

Fields

    workflow_id

    workflow_name

    workflow_version

    component_type

    market

    timezone

    session_state

    market_open_time

    market_close_time

    business_day

===============================================================================
PYTHON ROUTE
===============================================================================

FILE

    app/routes/market_session.py

Endpoint

    POST

    /api/v1/market-session/state

Purpose

    Market session determination service

===============================================================================
PYTHON SERVICE
===============================================================================

FILE

    app/services/market_session_service.py

Purpose

    Convert UTC timestamp into market session state

===============================================================================
CURRENT MARKET REGISTRY
===============================================================================

MARKET_CONFIG

    NSE

Registry Example

    NSE

        timezone

            Asia/Kolkata

        open

            09:15

        close

            15:30

===============================================================================
IMPORTANT ARCHITECTURAL DECISION
===============================================================================

WF-07C intentionally uses:

    market

as an input parameter.

Request

{
    "market":"NSE"
}

instead of hardcoding NSE logic.

This prevents future redesign.

===============================================================================
CURRENT SESSION STATES
===============================================================================

Version 1.0

PRE_MARKET

MARKET_OPEN

MARKET_CLOSED

===============================================================================
CURRENT NSE SESSION LOGIC
===============================================================================

Business Day

    false

Result

    MARKET_CLOSED

-------------------------------------------------------------------------------

Business Day

    true

Current Time

    Before 09:15

Result

    PRE_MARKET

-------------------------------------------------------------------------------

Business Day

    true

Current Time

    Between

        09:15

        and

        15:30

Result

    MARKET_OPEN

-------------------------------------------------------------------------------

Business Day

    true

Current Time

    After 15:30

Result

    MARKET_CLOSED

===============================================================================
API CONTRACT
===============================================================================

REQUEST
-------------------------------------------------------------------------------

{
    "workflow_id":"WF-07C",
    "market":"NSE",
    "utc_timestamp":"2026-06-02T20:56:23.444159+00:00",
    "business_day":true
}

-------------------------------------------------------------------------------
RESPONSE
-------------------------------------------------------------------------------

{
    "workflow_id":"WF-07C",

    "workflow_name":"MARKET_SESSION_CLOCK",

    "workflow_version":"1.0",

    "component_type":"OPERATIONS",

    "market":"NSE",

    "timezone":"Asia/Kolkata",

    "session_state":"PRE_MARKET",

    "market_open_time":"09:15",

    "market_close_time":"15:30",

    "business_day":true
}

===============================================================================
FIELD DEFINITIONS
===============================================================================

workflow_id

    Workflow identifier

workflow_name

    MARKET_SESSION_CLOCK

workflow_version

    Workflow version

component_type

    OPERATIONS

market

    Exchange or market identifier

timezone

    Market timezone

session_state

    Current market session

market_open_time

    Session opening time

market_close_time

    Session closing time

business_day

    Business day state from WF-07B

===============================================================================
ROUTE REGISTRATION
===============================================================================

FILE

    app/main.py

Import

    market_session_router

Registration

    app.include_router(
        market_session_router
    )

===============================================================================
CONTAINERIZATION
===============================================================================

Container

    core-python-execution-service:1.0

Runtime

    FastAPI

Port

    8000

===============================================================================
IMAGE BUILD PROCESS
===============================================================================

Build

    ./platform/services/python-execution-service/scripts/build-image.sh

Validate

    docker images | grep core-python-execution-service

===============================================================================
REGISTRY PROCESS
===============================================================================

Tag

    localhost:5000/core-python-execution-service:1.0

Push

    docker push \
    localhost:5000/core-python-execution-service:1.0

===============================================================================
KUBERNETES DEPLOYMENT
===============================================================================

Namespace

    platform

Deployment

    python-execution-service

Service

    python-execution-service

DNS

    python-execution-service.platform.svc.cluster.local

===============================================================================
N8N WORKFLOW
===============================================================================

Workflow Name

    WF-07C_MARKET_SESSION_CLOCK

===============================================================================
WORKFLOW STRUCTURE
===============================================================================

START_MARKET_SESSION_CLOCK
                ↓

REQUEST_SYSTEM_CLOCK
                ↓

REQUEST_BUSINESS_CLOCK
                ↓

BUILD_MARKET_SESSION_REQUEST
                ↓

REQUEST_MARKET_SESSION
                ↓

NORMALIZE_MARKET_SESSION
                ↓

WORKFLOW_COMPLETE

===============================================================================
NODE DEFINITIONS
===============================================================================

START_MARKET_SESSION_CLOCK

Type

    Manual Trigger

-------------------------------------------------------------------------------

REQUEST_SYSTEM_CLOCK

Type

    HTTP Request

Method

    POST

URL

    http://python-execution-service.platform.svc.cluster.local:8000/api/v1/clock/state

Body

{
    "workflow_id":"WF-07A"
}

-------------------------------------------------------------------------------

REQUEST_BUSINESS_CLOCK

Type

    HTTP Request

Method

    POST

URL

    http://python-execution-service.platform.svc.cluster.local:8000/api/v1/business-clock/state

Body

{
    "workflow_id":"WF-07B",

    "utc_timestamp":
    {{$json.utc_timestamp}}
}

-------------------------------------------------------------------------------

BUILD_MARKET_SESSION_REQUEST

Type

    Edit Fields (Set)

Keep Only Set

    TRUE

Fields

-------------------------------------------------------------------------------

workflow_id

    WF-07C

-------------------------------------------------------------------------------

market

    NSE

-------------------------------------------------------------------------------

utc_timestamp

    {{$node["REQUEST_SYSTEM_CLOCK"].json["utc_timestamp"]}}

-------------------------------------------------------------------------------

business_day

    {{$node["REQUEST_BUSINESS_CLOCK"].json["business_day"]}}

Type

    BOOLEAN

-------------------------------------------------------------------------------

Expected Output

{
    "workflow_id":"WF-07C",

    "market":"NSE",

    "utc_timestamp":"...",

    "business_day":true
}

-------------------------------------------------------------------------------

REQUEST_MARKET_SESSION

Type

    HTTP Request

Method

    POST

URL

    http://python-execution-service.platform.svc.cluster.local:8000/api/v1/market-session/state

Body Type

    JSON

JSON Payload

{
    "workflow_id":"{{$json.workflow_id}}",

    "market":"{{$json.market}}",

    "utc_timestamp":"{{$json.utc_timestamp}}",

    "business_day":{{$json.business_day}}
}

-------------------------------------------------------------------------------

NORMALIZE_MARKET_SESSION

Type

    Edit Fields (Set)

Keep Only Set

    TRUE

Fields

    workflow_id

    workflow_name

    workflow_version

    component_type

    market

    timezone

    session_state

    market_open_time

    market_close_time

    business_day

-------------------------------------------------------------------------------

WORKFLOW_COMPLETE

Type

    No Operation

===============================================================================
VALIDATED OUTPUT
===============================================================================

{
    "workflow_id":"WF-07C",

    "workflow_name":"MARKET_SESSION_CLOCK",

    "workflow_version":"1.0",

    "component_type":"OPERATIONS",

    "market":"NSE",

    "timezone":"Asia/Kolkata",

    "session_state":"PRE_MARKET",

    "market_open_time":"09:15",

    "market_close_time":"15:30",

    "business_day":true
}

===============================================================================
VALIDATION RESULTS
===============================================================================

Python Endpoint

    PASS

Docker Build

    PASS

Registry Push

    PASS

Kubernetes Rollout

    PASS

N8N Connectivity

    PASS

Market Registry

    PASS

Timezone Conversion

    PASS

Session Logic

    PASS

Workflow Validation

    PASS

===============================================================================
FUTURE GLOBAL EXPANSION
===============================================================================

Version 2+

Registry Expansion

    BSE

    MCX

    NYSE

    NASDAQ

    CME

    SGX

-------------------------------------------------------------------------------

Forex Expansion

    FOREX_SYDNEY

    FOREX_TOKYO

    FOREX_LONDON

    FOREX_NEW_YORK

-------------------------------------------------------------------------------

Forex Overlap Detection

    TOKYO_LONDON_OVERLAP

    LONDON_NEW_YORK_OVERLAP

-------------------------------------------------------------------------------

Crypto Expansion

    CRYPTO

Mode

    24x7

-------------------------------------------------------------------------------

Future Session States

PRE_MARKET

MARKET_OPEN

MARKET_CLOSED

POST_MARKET

HALT

AUCTION

LUNCH_BREAK

HOLIDAY

SPECIAL_SESSION

EARLY_CLOSE

EMERGENCY_CLOSED

===============================================================================
DOWNSTREAM CONSUMERS
===============================================================================

WF-07D SYSTEM HEALTH CLOCK

Market Data Engine

Signal Engine

Research Engine

Portfolio Engine

Risk Engine

Execution Engine

Broker Connectivity

Reporting Engine

===============================================================================
SUCCESS CRITERIA
===============================================================================

Workflow successfully determines:

    Market

    Market Timezone

    Session State

    Session Open

    Session Close

and publishes an authoritative session contract.

===============================================================================
STATUS
===============================================================================

WF-07C

DESCRIBE
    COMPLETE

IMPLEMENT
    COMPLETE

VALIDATE
    COMPLETE

DOCUMENT
    COMPLETE

STATUS

    CLOSED
