# Repository Freeze Governance Policy

## Purpose

Define institutional release-freeze conditions.

## Freeze Requirements

A repository freeze is valid ONLY IF:

- git status --short returns empty
- no runtime artifacts tracked
- no node_modules tracked
- no virtual environments tracked
- no logs tracked
- no reports tracked
- no snapshots tracked
- no recovery dumps tracked
- no generated artifacts tracked

## Freeze Violations

The following invalidate release certification:

- mutable runtime state in Git
- operational telemetry in Git
- generated artifacts in Git
- container archives in Git
- secrets in Git
- recovery exports in Git

## Activation Governance

No live activation may proceed without:
- deterministic freeze state
- governance convergence
- release certification
