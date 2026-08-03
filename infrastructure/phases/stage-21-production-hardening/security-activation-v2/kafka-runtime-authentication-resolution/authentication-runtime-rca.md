# KAFKA RUNTIME AUTHENTICATION RCA

STATUS

ACTIVE

OBJECTIVE

Determine why Kafka 3.7.1 selects
KerberosLogin during SASL_SSL
listener initialization.

CONFIRMED FACTS

Generator Layer
PASS

Validator Layer
PASS

Package Layer
PASS

Deployment Layer
PASS

Runtime JAAS Secret
PASS

TLS Secret
PASS

SASL_SSL Listener
PASS

OBSERVED FAILURE

java.lang.IllegalArgumentException

No serviceName defined in either JAAS or Kafka config

OBSERVED STACK

SaslChannelBuilder.configure()

↓

LoginManager.acquireLoginManager()

↓

KerberosLogin.configure()

↓

KerberosLogin.getServiceName()

↓

Fatal Startup Failure

CURRENT RCA

Kafka Runtime Authentication
Resolution Failure

STATUS

OPEN
