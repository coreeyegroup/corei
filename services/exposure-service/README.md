# EXPOSURE-SERVICE

## PURPOSE

Derived exposure aggregation authority.

## AUTHORITATIVE OWNERSHIP

Owns:
- account exposure
- strategy exposure
- currency exposure
- instrument exposure
- aggregate leverage exposure

## DOES NOT OWN

Does NOT own:
- positions
- pnl
- execution state
- allocations

## EVENT INPUTS

Consumes:
- portfolio_state_stream
- position_state_stream

## EVENT OUTPUTS

Produces:
- exposure_stream
- exposure_alert_stream

## GOVERNANCE

Exposure is derived state only.

Kafka lineage remains authoritative.
