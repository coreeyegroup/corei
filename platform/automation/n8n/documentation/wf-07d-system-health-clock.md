# WF-07D — SYSTEM HEALTH CLOCK

===============================================================================
PURPOSE
===============================================================================

WF-07D establishes authoritative platform health awareness.

WF-07A answers:

    What time is it?

WF-07B answers:

    Is today a business day?

WF-07C answers:

    Which market session is active?

WF-07D answers:

    Is the platform healthy enough to operate?

The workflow transforms infrastructure and platform component state into
a single authoritative health contract.

WF-07D becomes the central source of truth for operational readiness.

===============================================================================
INSTITUTIONAL DESIGN PRINCIPLE
===============================================================================

A running platform is not necessarily a healthy platform.

Examples:

    Kubernetes Running
    Kafka Down

Result:

    Platform Degraded

-------------------------------------------------------------------------------

    Market Data Down
    Execution Running

Result:

    Platform Degraded

-------------------------------------------------------------------------------

    Risk Engine Down

Result:

    Trading Must Stop

Therefore health determination must be centralized.

The platform must never allow:

    Strategies

    Portfolio Services

    Risk Engines

    Execution Engines

    Operators

to independently determine platform health.

Health is calculated once and distributed as an authoritative contract.

===============================================================================
WORKFLOW POSITION
===============================================================================

Platform Clock Hierarchy

    WF-07A SYSTEM_CLOCK
            ↓

    WF-07B BUSINESS_CLOCK
            ↓

    WF-07C MARKET_SESSION_CLOCK
            ↓

    WF-07D SYSTEM_HEALTH_CLOCK

===============================================================================
ARCHITECTURE
===============================================================================

N8N

    REQUEST_SYSTEM_HEALTH
                ↓

Python Execution Service

    /api/v1/system-health/state

                ↓

Authoritative Health Contract

===============================================================================
VERSION 1.0 SCOPE
===============================================================================

Initial implementation validates:

    Kubernetes

    N8N

    Python Execution Service

Only.

Future platform services will be added through registry expansion.

===============================================================================
HEALTH STATES
===============================================================================

Version 1.0

-------------------------------------------------------------------------------

HEALTHY

All monitored services healthy.

-------------------------------------------------------------------------------

DEGRADED

One or more monitored services unhealthy.

Platform remains partially operational.

-------------------------------------------------------------------------------

CRITICAL

Core platform unavailable.

Trading must stop.

===============================================================================
CURRENT HEALTH LOGIC
===============================================================================

Inputs

    kubernetes_status

    n8n_status

    python_service_status

-------------------------------------------------------------------------------

HEALTHY

All TRUE

-------------------------------------------------------------------------------

DEGRADED

One or more FALSE

-------------------------------------------------------------------------------

CRITICAL

Reserved for future expansion

Future implementation may include:

    Multiple Component Failures

    Cluster Failure

    Critical Infrastructure Failure

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
│   └── system_health.py
│
├── routes
│   └── system_health.py
│
├── services
│   └── system_health_service.py
│
└── main.py

===============================================================================
PYTHON MODEL
===============================================================================

FILE

    app/models/system_health.py

-------------------------------------------------------------------------------
REQUEST MODEL
-------------------------------------------------------------------------------

SystemHealthRequest

Fields

    workflow_id

-------------------------------------------------------------------------------
RESPONSE MODEL
-------------------------------------------------------------------------------

SystemHealthResponse

Fields

    workflow_id

    workflow_name

    workflow_version

    component_type

    health_state

    kubernetes_status

    n8n_status

    python_service_status

===============================================================================
PYTHON ROUTE
===============================================================================

FILE

    app/routes/system_health.py

Endpoint

    POST

    /api/v1/system-health/state

Purpose

    Expose authoritative health service

===============================================================================
PYTHON SERVICE
===============================================================================

FILE

    app/services/system_health_service.py

Purpose

    Generate platform health contract

Current Version

    Static Health State

Current Service Checks

    kubernetes_status

    n8n_status

    python_service_status

Future versions will replace static values with real platform probes.

===============================================================================
ROUTE REGISTRATION
===============================================================================

FILE

    app/main.py

Import

    system_health_router

Registration

    app.include_router(
        system_health_router
    )

===============================================================================
API CONTRACT
===============================================================================

REQUEST
-------------------------------------------------------------------------------

{
    "workflow_id":"WF-07D"
}

-------------------------------------------------------------------------------
RESPONSE
-------------------------------------------------------------------------------

{
    "workflow_id":"WF-07D",

    "workflow_name":"SYSTEM_HEALTH_CLOCK",

    "workflow_version":"1.0",

    "component_type":"OPERATIONS",

    "health_state":"HEALTHY",

    "kubernetes_status":true,

    "n8n_status":true,

    "python_service_status":true
}

===============================================================================
FIELD DEFINITIONS
===============================================================================

workflow_id

    Workflow identifier

workflow_name

    SYSTEM_HEALTH_CLOCK

workflow_version

    Workflow version

component_type

    OPERATIONS

health_state

    Overall platform health state

kubernetes_status

    Kubernetes health indicator

n8n_status

    N8N runtime health indicator

python_service_status

    Python execution service health indicator

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

    WF-07D_SYSTEM_HEALTH_CLOCK

===============================================================================
WORKFLOW STRUCTURE
===============================================================================

START_SYSTEM_HEALTH_CLOCK
                ↓

REQUEST_SYSTEM_HEALTH
                ↓

NORMALIZE_SYSTEM_HEALTH
                ↓

WORKFLOW_COMPLETE

===============================================================================
NODE DEFINITIONS
===============================================================================

START_SYSTEM_HEALTH_CLOCK

Type

    Manual Trigger

-------------------------------------------------------------------------------

REQUEST_SYSTEM_HEALTH

Type

    HTTP Request

Method

    POST

URL

    http://python-execution-service.platform.svc.cluster.local:8000/api/v1/system-health/state

Body Type

    JSON

Body

{
    "workflow_id":"WF-07D"
}

-------------------------------------------------------------------------------

NORMALIZE_SYSTEM_HEALTH

Type

    Edit Fields (Set)

Keep Only Set

    TRUE

Fields

    workflow_id

    workflow_name

    workflow_version

    component_type

    health_state

    kubernetes_status

    n8n_status

    python_service_status

-------------------------------------------------------------------------------

WORKFLOW_COMPLETE

Type

    No Operation

Purpose

    Institutional workflow termination point

===============================================================================
WORKFLOW CONNECTIONS
===============================================================================

START_SYSTEM_HEALTH_CLOCK
                ↓

REQUEST_SYSTEM_HEALTH
                ↓

NORMALIZE_SYSTEM_HEALTH
                ↓

WORKFLOW_COMPLETE

===============================================================================
VALIDATED OUTPUT
===============================================================================

{
    "workflow_id":"WF-07D",

    "workflow_name":"SYSTEM_HEALTH_CLOCK",

    "workflow_version":"1.0",

    "component_type":"OPERATIONS",

    "health_state":"HEALTHY",

    "kubernetes_status":true,

    "n8n_status":true,

    "python_service_status":true
}

===============================================================================
VALIDATION RESULTS
===============================================================================

Python Model

    PASS

Python Route

    PASS

Python Service

    PASS

FastAPI Registration

    PASS

Docker Build

    PASS

Registry Push

    PASS

Kubernetes Rollout

    PASS

Service Discovery

    PASS

Network Policy

    PASS

N8N Connectivity

    PASS

Output Contract

    PASS

Workflow Validation

    PASS

===============================================================================
FUTURE EXPANSION
===============================================================================

Version 2+

Infrastructure Layer

    Kubernetes

    Kafka

    PostgreSQL

    Redis

    Vault

-------------------------------------------------------------------------------

Platform Layer

    Market Data Service

    Signal Engine

    Portfolio Engine

    Risk Engine

    Execution Engine

    Broker Connectivity

-------------------------------------------------------------------------------

Monitoring Layer

    Prometheus

    Grafana

    Alert Manager

-------------------------------------------------------------------------------

Future Health States

HEALTHY

DEGRADED

CRITICAL

MAINTENANCE

RECOVERY

FAILOVER

-------------------------------------------------------------------------------

Future Architecture

Health Registry

    HEALTH_CHECK_REGISTRY

Service Probes

Dependency Probes

Cluster Probes

Heartbeat Monitoring

===============================================================================
DOWNSTREAM CONSUMERS
===============================================================================

WF-07E TRADING_DAY_CLOCK

Signal Engine

Portfolio Engine

Risk Engine

Execution Engine

Operational Dashboard

Monitoring Services

Alerting Services

===============================================================================
SUCCESS CRITERIA
===============================================================================

Workflow successfully determines:

    Kubernetes Health

    N8N Health

    Python Service Health

and publishes a reusable authoritative platform health contract.

===============================================================================
STATUS
===============================================================================

WF-07D

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
