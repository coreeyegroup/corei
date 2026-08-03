# WF-07B — BUSINESS CLOCK

===============================================================================
PURPOSE
===============================================================================

WF-07B establishes authoritative business-day awareness for the platform.

WF-07A answers:

    What time is it?

WF-07B answers:

    Is today a valid business day?

The workflow transforms raw UTC time into business context.

Business context becomes a platform-wide reusable contract consumed by
all downstream workflows.

WF-07B eliminates duplicated business-day calculations across:

    Market Data Services
    Signal Engines
    Portfolio Services
    Risk Engines
    Execution Engines
    Reporting Systems

===============================================================================
INSTITUTIONAL DESIGN PRINCIPLE
===============================================================================

Business calendar logic must be centralized.

The platform must never allow:

    Individual strategies
    Individual services
    Individual workflows

to independently determine:

    Weekends
    Holidays
    Trading days

Business-day determination occurs once and is distributed as an
authoritative contract.

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
ARCHITECTURE
===============================================================================

N8N

    REQUEST_SYSTEM_CLOCK
                ↓

    REQUEST_BUSINESS_CLOCK
                ↓

Python Execution Service

    /api/v1/business-clock/state

                ↓

Business Calendar Context

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
│   └── business_clock.py
│
├── routes
│   └── business_clock.py
│
├── services
│   └── business_clock_service.py
│
└── main.py

===============================================================================
PYTHON MODEL
===============================================================================

FILE

    app/models/business_clock.py

-------------------------------------------------------------------------------
REQUEST MODEL
-------------------------------------------------------------------------------

BusinessClockRequest

Fields

    workflow_id
    utc_timestamp

-------------------------------------------------------------------------------
RESPONSE MODEL
-------------------------------------------------------------------------------

BusinessClockResponse

Fields

    workflow_id
    workflow_name
    workflow_version
    component_type

    business_date

    day_of_week

    weekend

    business_day

    business_status

===============================================================================
PYTHON ROUTE
===============================================================================

FILE

    app/routes/business_clock.py

Endpoint

    POST

    /api/v1/business-clock/state

Purpose

    Expose business-day calculation service

===============================================================================
PYTHON SERVICE
===============================================================================

FILE

    app/services/business_clock_service.py

Purpose

    Convert UTC timestamp into business-day state

===============================================================================
CURRENT BUSINESS LOGIC
===============================================================================

Monday

    business_day=true

Tuesday

    business_day=true

Wednesday

    business_day=true

Thursday

    business_day=true

Friday

    business_day=true

Saturday

    business_day=false

Sunday

    business_day=false

===============================================================================
CURRENT VERSION 1.0 LOGIC
===============================================================================

Determine:

    weekday

Generate:

    day_of_week

Determine:

    weekend

Generate:

    business_day

Generate:

    business_status

===============================================================================
API CONTRACT
===============================================================================

REQUEST
-------------------------------------------------------------------------------

{
  "workflow_id":"WF-07B",
  "utc_timestamp":"2026-06-02T20:06:44.391195+00:00"
}

-------------------------------------------------------------------------------
RESPONSE
-------------------------------------------------------------------------------

{
  "workflow_id":"WF-07B",
  "workflow_name":"BUSINESS_CLOCK",
  "workflow_version":"1.0",
  "component_type":"OPERATIONS",

  "business_date":"2026-06-02",

  "day_of_week":"TUESDAY",

  "weekend":false,

  "business_day":true,

  "business_status":"OPEN"
}

===============================================================================
FIELD DEFINITIONS
===============================================================================

workflow_id

    Workflow identifier

workflow_name

    BUSINESS_CLOCK

workflow_version

    Workflow version

component_type

    OPERATIONS

business_date

    Calendar business date

day_of_week

    Day name

weekend

    Weekend indicator

business_day

    Business day indicator

business_status

    OPEN or CLOSED

===============================================================================
ROUTE REGISTRATION
===============================================================================

FILE

    app/main.py

Import

    business_clock_router

Registration

    app.include_router(
        business_clock_router
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

    WF-07B_BUSINESS_CLOCK

===============================================================================
WORKFLOW STRUCTURE
===============================================================================

START_BUSINESS_CLOCK
            ↓

REQUEST_SYSTEM_CLOCK
            ↓

REQUEST_BUSINESS_CLOCK
            ↓

NORMALIZE_BUSINESS_CLOCK
            ↓

WORKFLOW_COMPLETE

===============================================================================
NODE DEFINITIONS
===============================================================================

START_BUSINESS_CLOCK

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
  "utc_timestamp":"{{$json.utc_timestamp}}"
}

-------------------------------------------------------------------------------

NORMALIZE_BUSINESS_CLOCK

Type

    Edit Fields (Set)

Fields

    workflow_id
    workflow_name
    workflow_version
    component_type

    business_date

    day_of_week

    weekend

    business_day

    business_status

-------------------------------------------------------------------------------

WORKFLOW_COMPLETE

Type

    No Operation

===============================================================================
OUTPUT CONTRACT
===============================================================================

Expected Output

{
  "workflow_id":"WF-07B",
  "workflow_name":"BUSINESS_CLOCK",
  "workflow_version":"1.0",
  "component_type":"OPERATIONS",

  "business_date":"2026-06-02",

  "day_of_week":"TUESDAY",

  "weekend":false,

  "business_day":true,

  "business_status":"OPEN"
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

Output Contract Validation

    PASS

Workflow Validation

    PASS

===============================================================================
CURRENT LIMITATIONS
===============================================================================

Version 1.0 only supports:

    Weekend Logic

No holiday awareness exists yet.

===============================================================================
FUTURE EXPANSION
===============================================================================

Version 2+

Holiday Registry

    NSE Holidays

    BSE Holidays

    MCX Holidays

    NYSE Holidays

    NASDAQ Holidays

    Regional Holidays

    Forex Banking Holidays

-------------------------------------------------------------------------------

Future Registry Example

HOLIDAY_REGISTRY = {

    "NSE": [...],

    "NYSE": [...],

    "FOREX": [...]

}

-------------------------------------------------------------------------------

Future States

OPEN

CLOSED

HOLIDAY

SPECIAL_TRADING_DAY

EMERGENCY_CLOSED

EARLY_CLOSE

HALF_DAY

-------------------------------------------------------------------------------

Future Integrations

Market Calendar Services

Exchange Calendar Services

Holiday APIs

Institutional Calendar Engines

===============================================================================
DOWNSTREAM CONSUMERS
===============================================================================

WF-07C MARKET SESSION CLOCK

WF-07D SYSTEM HEALTH CLOCK

Market Data Engine

Signal Engine

Portfolio Engine

Risk Engine

Execution Engine

Reporting Engine

===============================================================================
SUCCESS CRITERIA
===============================================================================

Workflow successfully determines:

    Business Date

    Day Of Week

    Weekend State

    Business Day State

and publishes a reusable authoritative contract.

===============================================================================
STATUS
===============================================================================

WF-07B

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
