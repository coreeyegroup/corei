# SCRAM Runtime Startup RCA

Status:
OPEN

Objective:
Determine exact Kafka runtime startup requirement
causing KerberosLogin initialization during
SCRAM listener startup.

Observed Failure:

No serviceName defined in either JAAS or Kafka config

Failure Layer:

Broker Startup

Component:

SocketServer

Listener:

SASL_SSL

Root Cause:
UNDER INVESTIGATION
