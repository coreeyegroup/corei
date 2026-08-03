# STAGE-21F-W-31

RUNTIME AUTHENTICATION CORRECTION DETERMINATION

OBJECTIVE

Determine the exact runtime correction required to
prevent unauthorized SASL activation.

CONFIRMED OBSERVATION

Broker listener:

PLAINTEXT

Observed runtime startup path:

SaslChannelBuilder
LoginManager
KerberosLogin

Observed failure:

No serviceName defined in either JAAS or Kafka config

CONCLUSION

SASL authentication was activated despite
PLAINTEXT listener deployment.

ROOT CAUSE

Generator emitted one or more SASL properties
without listener authorization.

REQUIRED CORRECTION

SASL properties may only exist when:

listener protocol = SASL_PLAINTEXT
or
listener protocol = SASL_SSL

Otherwise:

all SASL runtime properties must be absent.

DETERMINATION STATUS

APPROVED
