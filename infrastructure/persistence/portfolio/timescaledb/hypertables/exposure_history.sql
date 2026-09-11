CREATE TABLE IF NOT EXISTS exposure_history (
    timestamp BIGINT NOT NULL,
    account_id TEXT NOT NULL,
    instrument TEXT NOT NULL,
    gross_exposure BIGINT NOT NULL,
    net_exposure BIGINT NOT NULL
);

SELECT create_hypertable(
    'exposure_history',
    'timestamp',
    if_not_exists => TRUE
);
