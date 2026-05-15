CREATE TABLE ticks (
    ts BIGINT NOT NULL,
    symbol TEXT NOT NULL,
    bid BIGINT NOT NULL,
    ask BIGINT NOT NULL,
    last BIGINT NOT NULL,
    volume BIGINT NOT NULL
);

SELECT create_hypertable('ticks', 'ts');

ALTER TABLE ticks SET (
    timescaledb.compress,
    timescaledb.compress_segmentby = 'symbol'
);
