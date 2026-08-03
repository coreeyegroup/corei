# GENERATOR V2 SPECIFICATION

PURPOSE

Generate deployable Kafka security manifests.

INPUT

Live StatefulSet YAML

OUTPUT

Validated secured StatefulSet YAML

DESIGN PRINCIPLE

Read
Validate
Transform
Validate
Emit

NO POST PROCESSING

NO PATCH SCRIPTS

NO MANUAL REPAIRS

PIPELINE

1.
Load live StatefulSet

2.
Locate kafka container

3.
Validate container exists

4.
Locate init containers

5.
Validate init container structure

6.
Apply security mutations

7.
Validate mutations

8.
Generate output manifest

9.
Generate validation report

10.
Fail closed on any validation error

