# GENERATOR V2 ARCHITECTURE

COMPONENTS

1.
State Collector

2.
Manifest Parser

3.
Mutation Engine

4.
Validation Engine

5.
Manifest Generator

6.
Deployment Packager

FLOW

Collect

Parse

Mutate

Validate

Generate

Package

Deploy

FAILURE POLICY

Fail Closed

No deployment permitted on validation failure.
