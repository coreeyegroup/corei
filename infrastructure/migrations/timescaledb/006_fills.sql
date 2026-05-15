CREATE TABLE fills (
    ts BIGINT NOT NULL,
    fill_id TEXT NOT NULL,
    order_id TEXT NOT NULL,
    symbol TEXT NOT NULL,
    quantity BIGINT NOT NULL,
    price BIGINT NOT NULL
);

SELECT create_hypertable('fills', 'ts');
