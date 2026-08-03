# GENERATOR CONTRACT RESTORATION

OBJECTIVE

Restore generator compliance with
security-mutation-plan.yaml.

AUTHORIZED RESTORATIONS

- jaas_volume
- jaas_mount
- env_var

EXCLUDED RESTORATIONS

- sasl.mechanism.inter.broker.protocol
- security.inter.broker.protocol
- inter.broker.listener.name=SASL_SSL

RECOVERY PROFILE REMAINS AUTHORITATIVE.

IMPLEMENTATION MODEL

Current Generator
+
JAAS Contract Restoration

STATUS

AUTHORIZED
