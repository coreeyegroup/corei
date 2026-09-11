# EVENT GOVERNANCE

## REQUIRED EVENT FIELDS

Every event MUST contain:

- event_id
- event_type
- event_version
- event_time
- ingestion_time
- trace_id
- lineage_id
- producer
- schema_version

## EVENT RULES

- event_time = int64 nanoseconds UTC
- no string timestamps
- no float values
- immutable events only
- replay-safe ordering required
