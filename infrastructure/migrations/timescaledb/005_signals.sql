CREATE TABLE signals (
    ts BIGINT NOT NULL,
    strategy_id TEXT NOT NULL,
    symbol TEXT NOT NULL,
    signal_type TEXT NOT NULL,
    confidence BIGINT NOT NULL
);

SELECT create_hypertable('signals', 'ts');
