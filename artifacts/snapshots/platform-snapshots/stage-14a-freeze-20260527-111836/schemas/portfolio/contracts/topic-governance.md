# PORTFOLIO TOPIC GOVERNANCE

## AUTHORITATIVE TOPICS

portfolio_state_stream
position_state_stream
pnl_stream
exposure_stream
allocation_stream
capital_state_stream
exposure_alert_stream

## PARTITION GOVERNANCE

partition_key = account_id + instrument

## ORDERING GOVERNANCE

Financial event ordering must remain deterministic.

Replay ordering mandatory.

## REPLAY GOVERNANCE

Replay(state_t) == Original(state_t)
