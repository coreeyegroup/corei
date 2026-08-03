# KERBEROS LOGIN SELECTION DETERMINATION

STATUS

ACTIVE

OBJECTIVE

Determine why Kafka runtime
selected KerberosLogin instead
of ScramLoginModule.

KNOWN FACTS

SASL_SSL listener exists.

SCRAM mechanism configured.

Listener JAAS configured.

Runtime JAAS configured.

OBSERVED FAILURE

KerberosLogin.getServiceName()

STATUS

UNDER INVESTIGATION
