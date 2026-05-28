# Artifact Governance Policy

## Purpose

Prevent binary/runtime artifact contamination of institutional source authority.

## Forbidden Artifact Types

The following must not exist in Git:

- *.tar
- *.tar.gz
- *.tgz
- snapshots/
- runtime image exports
- generated archives
- replay dumps

## Artifact Ownership

Artifacts belong in:
- artifact registries
- object storage
- backup systems
- OCI registries

NOT Git.
