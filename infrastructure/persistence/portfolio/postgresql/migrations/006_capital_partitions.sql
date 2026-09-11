CREATE TABLE IF NOT EXISTS capital_partitions (
    id BIGSERIAL PRIMARY KEY,
    partition_id TEXT NOT NULL,
    account_group TEXT NOT NULL,
    strategy_id TEXT NOT NULL,
    partition_limit BIGINT NOT NULL,
    reserved_capital BIGINT NOT NULL,
    utilized_capital BIGINT NOT NULL,
    available_capital BIGINT NOT NULL,
    created_at BIGINT NOT NULL
);
