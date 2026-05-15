CREATE TABLE config_snapshots (
    snapshot_id TEXT PRIMARY KEY,
    config_type TEXT NOT NULL,
    checksum TEXT NOT NULL,
    created_at BIGINT NOT NULL
);
