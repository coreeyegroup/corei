# PLATFORM HEALTH CONTRACT

All services MUST expose:

- /health/live
- /health/ready
- /metadata

Readiness MUST validate:
- configuration loaded
- dependencies available
- runtime governance initialized

Services failing readiness MUST NOT receive traffic.
