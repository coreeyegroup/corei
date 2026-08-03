# GENERATOR STATE MACHINE

STATE

PROFILE=RECOVERY

OUTPUT

Recovery Security Manifest

STATE

PROFILE=TARGET

OUTPUT

Institutional Security Manifest

TRANSITIONS

RECOVERY

↓

VALIDATED

↓

TARGET

FAILURE RULE

Generator must reject unknown profiles.

Generator must reject mixed profiles.

Generator must reject incomplete profiles.
