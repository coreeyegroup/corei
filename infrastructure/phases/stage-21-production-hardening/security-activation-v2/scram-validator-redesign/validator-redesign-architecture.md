# VALIDATOR REDESIGN ARCHITECTURE

STATUS

ACTIVE

PURPOSE

Validate Kafka security manifests across
multiple approved security profiles.

SUPPORTED PROFILES

RECOVERY

TARGET

RECOVERY PROFILE

External Listener

SASL_SSL

SCRAM

Broker Listener

PLAINTEXT

TARGET PROFILE

External Listener

SASL_SSL

SCRAM

Broker Listener

SASL_SSL

SCRAM

VALIDATOR RESPONSIBILITY

Detect profile.

Validate profile.

Reject mixed profile.

Reject incomplete profile.

AUTHORITY

Generator does not validate.

Validator remains authoritative.
