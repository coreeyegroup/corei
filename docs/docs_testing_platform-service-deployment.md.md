# PLATFORM SERVICE DEPLOYMENT

Platform services deploy only through governed deployment sequencing.

All services MUST:
- expose readiness/liveness contracts
- inherit runtime governance
- inherit deployment governance
- inherit configuration governance
- inherit event governance

Unmanaged deployment is forbidden.
