CREATE TABLE ohlcv_5m (
    ts BIGINT NOT NULL,
    symbol TEXT NOT NULL,
    open BIGINT NOT NULL,
    high BIGINT NOT NULL,
    low BIGINT NOT NULL,
    close BIGINT NOT NULL,
    volume BIGINT NOT NULL
);

SELECT create_hypertable('ohlcv_5m', 'ts');
