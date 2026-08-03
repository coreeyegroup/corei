# GENERATOR CORRECTION DETERMINATION

GENERATOR REQUIREMENT

When listener protocol:

PLAINTEXT

Generator must suppress:

SASL properties

SCRAM properties

JAAS properties

Kerberos properties

AUTHORIZATION RULE

Emit authentication properties
only when listener protocol requires them.

VALIDATION REQUIREMENT

Reject package generation if:

PLAINTEXT listener

AND

SASL property detected.

STATUS

APPROVED
