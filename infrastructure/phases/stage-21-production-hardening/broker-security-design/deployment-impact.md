# DEPLOYMENT IMPACT

BROKER

Rolling restart required.

EXPECTED DOWNTIME

Single-node broker:

30-90 seconds

RISK

Medium

ROLLBACK

Restore:

state/security/kafka/recovery/kafka-statefulset-pre-sasl.yaml

Restore:

state/security/kafka/recovery/kafka-config-pre-sasl.yaml

Restart broker.
