# CAPITAL-PARTITION-SERVICE

## PURPOSE

Deterministic capital allocation isolation authority.

## AUTHORITATIVE OWNERSHIP

Owns:
- account partitions
- strategy allocations
- capital reservation governance
- allocation limits

## DOES NOT OWN

Does NOT own:
- positions
- execution
- pnl
- exposure

## GOVERNANCE LAW

No capital bleed permitted between partitions.

## EVENT INPUTS

Consumes:
- config_event_stream
- portfolio_state_stream

## EVENT OUTPUTS

Produces:
- allocation_stream
- capital_state_stream

## CAPITAL GOVERNANCE

All allocation transitions must remain:
- deterministic
- replay-safe
- lineage-reconstructable
