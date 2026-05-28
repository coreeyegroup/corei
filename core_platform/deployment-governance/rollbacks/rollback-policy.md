# PLATFORM ROLLBACK GOVERNANCE

Rollback is mandatory when:
- readiness fails
- liveness fails
- deployment health gates fail
- schema validation fails
- replay consistency fails

Rollback must restore:
- previous deployment version
- previous configuration snapshot
- previous deployment metadata
