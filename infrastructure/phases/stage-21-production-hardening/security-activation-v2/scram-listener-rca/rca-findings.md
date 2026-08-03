# RCA FINDINGS

OBSERVED FAILURE

Kafka startup failure

ERROR

No serviceName defined in either JAAS or Kafka config

CONFIRMED WORKING

JAAS Secret Mount

TLS Secret Mount

KAFKA_OPTS Injection

SASL_SSL Listener Injection

Generator Framework

Validator Framework

Package Framework

ROOT CAUSE

Incomplete SASL/SCRAM listener configuration.

Kafka listener-level authentication properties
required for SCRAM authentication are not
fully generated.

STATUS

ROOT CAUSE IDENTIFIED
