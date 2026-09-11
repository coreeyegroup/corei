CREATE TABLE IF NOT EXISTS margin_history (
    timestamp BIGINT NOT NULL,
    account_id TEXT NOT NULL,
    used_margin BIGINT NOT NULL,
    available_margin BIGINT NOT NULL
);

SELECT create_hypertable(
    'margin_history',
    'timestamp',
    if_not_exists => TRUE
);
