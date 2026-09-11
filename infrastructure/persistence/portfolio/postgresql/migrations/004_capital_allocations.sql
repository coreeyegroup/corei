CREATE TABLE IF NOT EXISTS capital_allocations (
    id BIGSERIAL PRIMARY KEY,
    account_group TEXT NOT NULL,
    strategy_id TEXT NOT NULL,
    allocated_capital BIGINT NOT NULL,
    used_capital BIGINT NOT NULL,
    available_capital BIGINT NOT NULL,
    allocation_timestamp BIGINT NOT NULL
);
