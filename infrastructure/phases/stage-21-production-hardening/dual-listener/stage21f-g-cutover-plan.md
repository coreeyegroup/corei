# STAGE-21F-G DUAL LISTENER DEPLOYMENT

PHASE 1

Broker exposes:

PLAINTEXT://9092
SASL_SSL://9094

Clients remain PLAINTEXT.

Validation required.

PHASE 2

Client migration begins.

PHASE 3

PLAINTEXT retired.

Rollback:

Restore:
    kafka-statefulset-pre-sasl.yaml

Restore:
    kafka-config-pre-sasl.yaml

Restart broker.
