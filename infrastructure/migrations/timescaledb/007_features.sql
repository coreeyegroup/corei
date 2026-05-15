CREATE TABLE features (
    ts BIGINT NOT NULL,
    feature_set TEXT NOT NULL,
    symbol TEXT NOT NULL,
    feature_value BIGINT NOT NULL
);

SELECT create_hypertable('features', 'ts');

ALTER TABLE features SET (
    timescaledb.compress,
    timescaledb.compress_segmentby = 'symbol'
);
