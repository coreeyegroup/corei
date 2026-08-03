# GENERATOR TECHNOLOGY DECISION

STATUS

APPROVED

ORCHESTRATION

Shell

PROCESSING

Python

YAML ENGINE

PyYAML

PROHIBITED

sed YAML mutation

awk YAML mutation

grep-based YAML mutation

manual YAML repair

RATIONALE

Stage-21 rollout failure originated from
manifest mutation behavior.

Structured parsing removes
an entire class of deployment failures.
