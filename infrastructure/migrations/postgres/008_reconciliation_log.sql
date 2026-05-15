CREATE TABLE reconciliation_log (
    reconciliation_id TEXT PRIMARY KEY,
    reconciliation_type TEXT NOT NULL,
    status TEXT NOT NULL,
    details TEXT NOT NULL,
    created_at BIGINT NOT NULL
);
