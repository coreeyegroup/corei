# SCHEMA GOVERNANCE

## AUTHORITATIVE RULES

- Avro only
- backward compatible only
- no float
- no decimal
- int64 for all financial fields

## BREAKING CHANGE RULE

Breaking schema changes require:
- new topic version
- migration plan
- replay validation
