# WF-07A — SYSTEM CLOCK

===============================================================================
PURPOSE
===============================================================================

WF-07A establishes the authoritative platform clock.

This workflow is the root timing authority for the entire trading platform.

All downstream workflows derive temporal state from WF-07A.

The workflow answers:

    What is the authoritative current platform time?

The platform must never allow individual services, workflows,
strategies, execution engines, or operators to independently
calculate platform time.

A single authoritative clock eliminates:

    Clock drift
    Time inconsistencies
    Regional timezone conflicts
    Distributed timing errors
    Strategy timing divergence
    Market session calculation inconsistencies

WF-07A becomes the foundation for:

    WF-07B BUSINESS CLOCK
    WF-07C MARKET SESSION CLOCK
    WF-07D SYSTEM HEALTH CLOCK

and all future timing-dependent workflows.

===============================================================================
INSTITUTIONAL DESIGN PRINCIPLE
===============================================================================

Platform Time Standard:

    UTC

UTC is the only authoritative platform time.

The platform never uses:

    IST
    EST
    EDT
    JST
    CET
    Local Machine Time
    Browser Time

for internal platform calculations.

Timezone conversion is performed only by specialized services.

Internal platform state remains UTC.

===============================================================================
WORKFLOW POSITION
===============================================================================

Platform Timing Hierarchy:

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

Python Execution Service

        /api/v1/clock/state

                    ↓

Authoritative UTC Response

                    ↓

Returned To Workflow

===============================================================================
PYTHON IMPLEMENTATION
===============================================================================

Service:

    python-execution-service

Location:

    platform/services/python-execution-service

-------------------------------------------------------------------------------
FILE STRUCTURE
-------------------------------------------------------------------------------

platform/services/python-execution-service/

├── app
│   ├── main.py
│   ├── models
│   │   └── clock.py
│   ├── routes
│   │   └── clock.py
│   └── services
│       └── clock_service.py
│
├── Dockerfile
├── requirements.txt
├── README.md
│
└── scripts
    └── build-image.sh

===============================================================================
PYTHON MODEL
===============================================================================

FILE

    app/models/clock.py

Purpose:

    Defines request contract.

Request:

    workflow_id

Response:

    workflow_id
    workflow_name
    workflow_version
    component_type
    platform_state
    utc_timestamp
    epoch_ms
    heartbeat

===============================================================================
PYTHON ROUTE
===============================================================================

FILE

    app/routes/clock.py

Endpoint:

    POST

    /api/v1/clock/state

Purpose:

    Exposes authoritative clock endpoint.

===============================================================================
PYTHON SERVICE
===============================================================================

FILE

    app/services/clock_service.py

Purpose:

    Generate authoritative UTC timestamp.

Current Logic:

    datetime.now(timezone.utc)

Generates:

    UTC timestamp
    Epoch milliseconds
    Platform state
    Heartbeat

===============================================================================
ROUTE REGISTRATION
===============================================================================

FILE

    app/main.py

Router:

    clock_router

Registration:

    app.include_router(clock_router)

===============================================================================
API CONTRACT
===============================================================================

REQUEST
-------------------------------------------------------------------------------

{
  "workflow_id":"WF-07A"
}

-------------------------------------------------------------------------------
RESPONSE
-------------------------------------------------------------------------------

{
  "workflow_id":"WF-07A",
  "workflow_name":"SYSTEM_CLOCK",
  "workflow_version":"1.0",
  "component_type":"OPERATIONS",
  "platform_state":"ACTIVE",
  "utc_timestamp":"2026-06-02T20:06:44.391195+00:00",
  "epoch_ms":1780430804391,
  "heartbeat":"ALIVE"
}

===============================================================================
FIELD DEFINITIONS
===============================================================================

workflow_id

    Workflow identifier

workflow_name

    SYSTEM_CLOCK

workflow_version

    Workflow version

component_type

    OPERATIONS

platform_state

    Current platform operating state

utc_timestamp

    Authoritative UTC timestamp

epoch_ms

    Epoch time in milliseconds

heartbeat

    Service heartbeat status

===============================================================================
CONTAINERIZATION
===============================================================================

Dockerfile:

    platform/services/python-execution-service/Dockerfile

Base Image:

    python:3.12-slim

Runtime:

    FastAPI
    Uvicorn

Port:

    8000

===============================================================================
IMAGE BUILD PROCESS
===============================================================================

Build:

    ./platform/services/python-execution-service/scripts/build-image.sh

Generated Image:

    core-python-execution-service:1.0

===============================================================================
REGISTRY PROCESS
===============================================================================

Local Registry:

    localhost:5000

Tag:

    localhost:5000/core-python-execution-service:1.0

Push:

    docker push \
    localhost:5000/core-python-execution-service:1.0

===============================================================================
KUBERNETES DEPLOYMENT
===============================================================================

Namespace:

    platform

Deployment:

    python-execution-service

Service:

    python-execution-service

Cluster DNS:

    python-execution-service.platform.svc.cluster.local

Port:

    8000

===============================================================================
NETWORK POLICY REQUIREMENT
===============================================================================

Required Policy:

    allow-n8n-to-platform

Purpose:

    Permit N8N namespace access to platform namespace.

Without this policy:

    HTTP timeout
    ETIMEDOUT
    Service unreachable

===============================================================================
N8N WORKFLOW
===============================================================================

Workflow Name:

    WF-07A_SYSTEM_CLOCK

===============================================================================
NODES
===============================================================================

START_SYSTEM_CLOCK

Type:

    Manual Trigger

-------------------------------------------------------------------------------

REQUEST_SYSTEM_CLOCK

Type:

    HTTP Request

Method:

    POST

URL:

    http://python-execution-service.platform.svc.cluster.local:8000/api/v1/clock/state

Body:

{
  "workflow_id":"WF-07A"
}

-------------------------------------------------------------------------------

NORMALIZE_CLOCK_STATE

Type:

    Edit Fields (Set)

Fields:

    workflow_id
    workflow_name
    workflow_version
    component_type
    platform_state
    utc_timestamp
    epoch_ms
    heartbeat

-------------------------------------------------------------------------------

WORKFLOW_COMPLETE

Type:

    No Operation

===============================================================================
WORKFLOW CONNECTIONS
===============================================================================

START_SYSTEM_CLOCK
            ↓

REQUEST_SYSTEM_CLOCK
            ↓

NORMALIZE_CLOCK_STATE
            ↓

WORKFLOW_COMPLETE

===============================================================================
VALIDATION RESULTS
===============================================================================

Python Endpoint:

    PASS

Docker Build:

    PASS

Registry Push:

    PASS

Kubernetes Deployment:

    PASS

N8N Connectivity:

    PASS

Network Policy Validation:

    PASS

Output Validation:

    PASS

===============================================================================
DEPENDENCIES
===============================================================================

None

WF-07A is the root workflow.

===============================================================================
DOWNSTREAM CONSUMERS
===============================================================================

WF-07B BUSINESS CLOCK

WF-07C MARKET SESSION CLOCK

WF-07D SYSTEM HEALTH CLOCK

Market Data Services

Signal Engine

Portfolio Engine

Risk Engine

Execution Engine

Audit Services

Monitoring Services

===============================================================================
FUTURE EXPANSION
===============================================================================

Potential Additions:

    Platform Startup Time

    Cluster Time Drift Detection

    Multi-Node Clock Validation

    NTP Synchronization Validation

    Clock Integrity Monitoring

    Time Source Health Monitoring

None of these require workflow redesign.

===============================================================================
SUCCESS CRITERIA
===============================================================================

The workflow is considered successful when:

    UTC timestamp generated

    Epoch generated

    Heartbeat generated

    Response contract valid

    N8N receives response

    Downstream workflows can consume timestamp

===============================================================================
STATUS
===============================================================================

WF-07A

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
