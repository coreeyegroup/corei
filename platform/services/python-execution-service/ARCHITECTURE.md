# CORE PLATFORM

# N0.5 — PYTHON EXECUTION SERVICE FOUNDATION

## PURPOSE

The CORE platform architecture follows a strict institutional separation of concerns:

```text
Python
=
Business Logic

JSON
=
Contract Layer

N8N
=
Workflow Orchestration
```

This separation mirrors the intended production architecture and prevents business logic from becoming embedded inside workflow tooling.

The Python Execution Service was introduced to establish a reusable execution layer that can be consumed by:

* N8N Workflows
* Operational API
* Trading Dashboard
* Future Platform Services
* Strategy Components
* Signal Components
* Risk Components
* Portfolio Components

The service acts as a centralized Python execution environment exposed through deterministic HTTP interfaces.

---

# WHY THIS WAS CREATED

## Problem

N8N provides Python Code nodes.

However:

```text
Python Inside N8N
=
Workflow Logic

Workflow Logic
≠
Platform Logic
```

Embedding business logic inside N8N creates several institutional problems:

### Tight Coupling

Logic becomes attached to individual workflows.

### Limited Reusability

A workflow implementation cannot easily be reused by:

* APIs
* Dashboards
* Services

### Governance Issues

Version control and lifecycle management become difficult.

### Production Drift

The prototype architecture would diverge from the intended production architecture.

---

## Solution

Create a dedicated Python Execution Service.

The service exposes HTTP endpoints.

N8N interacts with the service using HTTP Request nodes.

The service executes business logic and returns JSON contracts.

---

# TARGET ARCHITECTURE

```text
N8N Workflow
      │
      ▼
HTTP Request Node
      │
      ▼
Python Execution Service
      │
      ▼
Route Layer
      │
      ▼
Service Layer
      │
      ▼
Business Logic
      │
      ▼
JSON Response Contract
      │
      ▼
N8N Workflow
```

---

# IMPLEMENTATION

## Repository Structure

```text
platform/services/python-execution-service

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
└── README.md
```

---

# APPLICATION LAYERS

## Route Layer

Location:

```text
app/routes
```

Purpose:

* HTTP endpoints
* Request handling
* Response mapping

No business logic is permitted here.

---

## Model Layer

Location:

```text
app/models
```

Purpose:

* Request contracts
* Response contracts
* Validation

Implemented using:

```text
Pydantic
```

---

## Service Layer

Location:

```text
app/services
```

Purpose:

* Business logic
* Calculations
* Transformations
* Decision engines

All future workflow logic should ultimately live here.

---

# INITIAL SERVICE

## WF-07A SYSTEM CLOCK

The first implementation created:

```text
POST
/api/v1/clock/state
```

Request:

```json
{
  "workflow_id": "WF-07A"
}
```

Response:

```json
{
  "workflow_id": "WF-07A",
  "workflow_name": "SYSTEM_CLOCK",
  "workflow_version": "1.0",
  "component_type": "OPERATIONS",
  "platform_state": "ACTIVE",
  "utc_timestamp": "...",
  "epoch_ms": 0,
  "heartbeat": "ALIVE"
}
```

Purpose:

Provide deterministic platform clock state for workflow validation.

---

# CONTAINERIZATION

Container Image:

```text
core-python-execution-service:1.0
```

Registry Image:

```text
localhost:5000/core-python-execution-service:1.0
```

Runtime:

```text
Python 3.12
FastAPI
Uvicorn
```

---

# REGISTRY INTEGRATION

The image was:

1. Built locally
2. Tagged
3. Pushed to the CORE Registry
4. Validated through registry catalog inspection

Validated image:

```text
localhost:5000/core-python-execution-service:1.0
```

---

# KUBERNETES DEPLOYMENT

Namespace:

```text
platform
```

Deployment:

```text
python-execution-service
```

Service:

```text
python-execution-service
```

Type:

```text
ClusterIP
```

---

# IMPORTANT DISCOVERY

During deployment validation the following platform behavior was identified:

```text
Docker Image Store
≠
Kubernetes Runtime Image Store
```

As a result:

```yaml
imagePullPolicy: Never
```

failed.

The platform therefore adopted:

```yaml
image: localhost:5000/core-python-execution-service:1.0

imagePullPolicy: Always
```

This became the validated deployment pattern.

---

# VALIDATION PERFORMED

## Local Runtime

PASS

## Docker Build

PASS

## Registry Push

PASS

## Registry Catalog Validation

PASS

## Kubernetes Deployment

PASS

## Kubernetes Service

PASS

## Port Forward Validation

PASS

## API Endpoint Validation

PASS

---

# GOVERNING PRINCIPLE

For the remainder of the N8N prototype:

```text
Python
=
Business Logic

JSON
=
Transport Contract

N8N
=
Workflow Orchestration
```

No workflow should contain significant business logic when that logic can be implemented inside the Python Execution Service.

Future workflow development should extend the Python Execution Service first and consume it through HTTP interfaces.
