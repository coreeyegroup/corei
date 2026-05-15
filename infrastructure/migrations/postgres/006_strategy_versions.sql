CREATE TABLE strategy_versions (
    strategy_id TEXT PRIMARY KEY,
    version TEXT NOT NULL,
    checksum TEXT NOT NULL,
    deployed_at BIGINT NOT NULL
);
