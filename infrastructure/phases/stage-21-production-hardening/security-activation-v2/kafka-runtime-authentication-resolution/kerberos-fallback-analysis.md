# KERBEROS FALLBACK ANALYSIS

OBSERVED

KerberosLogin selected

EXPECTED

ScramLoginModule selected

RUNTIME FLOW

Broker Startup

↓

BrokerServer STARTED

↓

SASL_SSL Listener Creation

↓

SaslChannelBuilder.configure()

↓

LoginManager

↓

KerberosLogin

↓

serviceName Resolution

↓

Fatal Startup Failure

CONCLUSION

Kafka Runtime Authentication
Builder is selecting Kerberos
resolution path instead of
SCRAM resolution path.

STATUS

UNDER INVESTIGATION
