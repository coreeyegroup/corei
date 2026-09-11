# EXECUTION RISK GOVERNANCE

## AUTHORITATIVE PURPOSE

This document defines deterministic pre-trade
risk governance for the execution layer.

---

## AUTHORITATIVE RISK HIERARCHY

Firm
→ Portfolio
→ Strategy
→ Trade

Lower-precedence rules MUST NOT override higher-precedence rules.

---

## REQUIRED RISK CONTROLS

The risk-engine-service MUST enforce:

- max_risk_per_trade_pct
- max_daily_loss_pct
- max_drawdown_pct
- max_open_positions
- max_position_per_instrument
- max_margin_utilization_pct
- instrument_whitelist

All limits MUST derive from governed configuration.

Hardcoded runtime limits are forbidden.

---

## EXTERNAL EXECUTION GOVERNANCE

origin_type = EXTERNAL

MUST use stricter thresholds than:

origin_type = CORE

---

## KILL SWITCH GOVERNANCE

If:

daily_loss > threshold

then:

HALT_ALL

must activate for affected accounts.

---

## RISK REJECTION GOVERNANCE

Risk rejection MUST produce:

risk_rejected events

Rejected executions MUST NOT progress further downstream.

---

## RISK REPLAY GOVERNANCE

Replay MUST reproduce:

- identical approvals
- identical rejections
- identical risk hashes
- identical limit evaluations

Risk replay divergence is forbidden.
