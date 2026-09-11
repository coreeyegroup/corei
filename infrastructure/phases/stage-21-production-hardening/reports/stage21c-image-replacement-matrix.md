# STAGE-21C IMAGE REPLACEMENT MATRIX

STATUS: APPROVED

## N8N

Current:

docker.n8n.io/n8nio/n8n:latest

Replacement:

docker.n8n.io/n8nio/n8n:1.98.2

Reason:

Production immutable version pinning.

---

## TIMESCALEDB

Current:

timescale/timescaledb:latest-pg16

Replacement:

timescale/timescaledb:2.17.2-pg16

Reason:

Production immutable version pinning.

---

## GOVERNANCE DECISION

Vendor images:

    immutable version pinning

CORE-built services:

    git-sha image tags

Forbidden:

    latest
    latest-pg16
    stable
    nightly
    main
