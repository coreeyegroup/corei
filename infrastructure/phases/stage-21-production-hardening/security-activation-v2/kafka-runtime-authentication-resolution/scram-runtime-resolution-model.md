# SCRAM RUNTIME RESOLUTION MODEL

EXPECTED FLOW

SASL_SSL Listener

↓

SCRAM Mechanism Resolution

↓

ScramLoginModule

↓

Listener Processor Creation

↓

Broker Ready

OBSERVED FLOW

SASL_SSL Listener

↓

Generic SASL Resolution

↓

KerberosLogin

↓

serviceName Lookup

↓

Fatal Startup Failure

ANALYSIS

Authentication Builder
selecting unexpected login path.

STATUS

ACTIVE
