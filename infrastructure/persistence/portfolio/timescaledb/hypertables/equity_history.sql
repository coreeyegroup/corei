CREATE TABLE IF NOT EXISTS equity_history (
    timestamp BIGINT NOT NULL,
    account_id TEXT NOT NULL,
    equity BIGINT NOT NULL,
    drawdown_bps BIGINT NOT NULL
);

SELECT create_hypertable(
    'equity_history',
    'timestamp',
    if_not_exists => TRUE
);
