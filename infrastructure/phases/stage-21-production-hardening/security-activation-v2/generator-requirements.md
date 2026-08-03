# GENERATOR REQUIREMENTS

Generator must:

1.
Read live StatefulSet

2.
Identify kafka container

3.
Identify init containers

4.
Inject security mounts
only into kafka container

5.
Inject KAFKA_OPTS

6.
Inject SASL_SSL listener

7.
Inject TLS secret volumes

8.
Inject JAAS secret volumes

9.
Validate output

10.
Abort on validation failure

PROHIBITED

String patching

Manual YAML editing

Post-generation repair scripts

