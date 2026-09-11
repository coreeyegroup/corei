# DEPRECATED SCHEMA GOVERNANCE

## DEPRECATED CONTRACT

schemas/avro/deprecated/market-tick.avsc

## DEPRECATION REASON

Deprecated during Stage-12 governance reconciliation.

Reasons:
- string pricing fields violated fixed-point governance
- ambiguous timestamp semantics
- missing lineage governance
- missing replay governance
- overlap with authoritative Stage-12 schemas
- non-deterministic financial representation risk

## AUTHORITATIVE REPLACEMENTS

- raw_market_data_v1.avsc
- normalized_market_data_v1.avsc

## STATUS

DEPRECATED
NON-AUTHORITATIVE
NOT FOR PRODUCTION USE
