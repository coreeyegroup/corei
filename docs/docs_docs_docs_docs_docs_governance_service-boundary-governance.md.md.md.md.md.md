# SERVICE BOUNDARY GOVERNANCE

## AUTHORITATIVE LAW

- one bounded context per service
- no direct DB access between services
- cross-service communication via Kafka only

## HTTP

Allowed only for:
- health
- admin
- observability
