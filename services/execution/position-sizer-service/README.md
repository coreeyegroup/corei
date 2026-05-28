# position-sizer-service

## PURPOSE

Converts:

PolicyDecision
→ SizedExecutionIntent

under deterministic institutional sizing governance.

## RESPONSIBILITIES

- ATR-based sizing
- fixed-point arithmetic
- broker lot governance
- overflow-safe calculations
- deterministic size hashing
- account scaling governance

## GOVERNANCE RULES

- NO floating point arithmetic
- deterministic sizing mandatory
- replay-safe size hashing mandatory
- overflow-safe arithmetic mandatory
- broker constraints mandatory
