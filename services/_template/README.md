# SERVICE TEMPLATE

## PURPOSE

Canonical bounded-context service template for the Corei platform.

All services must derive from this structure.

---

# REQUIRED RUNTIME SURFACES

Every service must expose:

- /health
- /metrics
- /version
- /config

---

# REQUIRED GOVERNANCE

Every service must support:

- observability
- replay safety
- lineage visibility
- deterministic configuration
- bounded ownership

---

# REQUIRED STRUCTURE

## app/

Application runtime entrypoints.

---

## config/

Service configuration authority.

---

## contracts/

Event and API contracts.

---

## scripts/

Operational execution scripts.

---

## tests/

Validation and runtime tests.

---

## helm/

Kubernetes deployment structure.

