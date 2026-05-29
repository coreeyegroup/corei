# ROLLBACK VALIDATION

SOURCE

state/security/kafka/recovery/kafka-statefulset-pre-sasl.yaml

VERIFY

kubectl rollout status statefulset/kafka -n kafka

VERIFY

topics accessible
