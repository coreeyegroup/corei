CREATE TABLE IF NOT EXISTS reconciliation_log (
    id BIGSERIAL PRIMARY KEY,
    reconciliation_type TEXT NOT NULL,
    reconciliation_status TEXT NOT NULL,
    reconciliation_hash TEXT NOT NULL,
    created_at BIGINT NOT NULL
);
