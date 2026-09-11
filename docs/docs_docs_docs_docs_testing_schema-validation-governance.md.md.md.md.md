# SCHEMA VALIDATION GOVERNANCE

All Avro schemas MUST:

- preserve backward compatibility
- avoid float types
- support replay-safe deserialization
- preserve deterministic ordering

Breaking schema changes are forbidden.
