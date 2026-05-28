# PORTFOLIO-SERVICE

## PURPOSE

Authoritative financial state authority.

## AUTHORITATIVE OWNERSHIP

Owns:
- positions
- realized pnl
- unrealized pnl
- drawdown
- account equity
- margin state
- portfolio snapshots

## DOES NOT OWN

Does NOT own:
- execution routing
- broker execution
- strategy generation
- exposure aggregation
- capital partitioning

## AUTHORITATIVE STATE LAW

State(t) = f(EventLog[0→t])

## EVENT INPUTS

Consumes:
- fill_stream
- execution_order_stream
- risk_event_stream

## EVENT OUTPUTS

Produces:
- portfolio_state_stream
- position_state_stream
- pnl_stream

## FINANCIAL GOVERNANCE

All financial arithmetic:
- BIGINT
- fixed-point
- deterministic

FLOAT prohibited.
