CREATE TABLE IF NOT EXISTS positions (
    id BIGSERIAL PRIMARY KEY,
    account_id TEXT NOT NULL,
    strategy_id TEXT NOT NULL,
    instrument TEXT NOT NULL,
    direction TEXT NOT NULL,
    quantity BIGINT NOT NULL,
    avg_entry_price BIGINT NOT NULL,
    realized_pnl BIGINT NOT NULL DEFAULT 0,
    unrealized_pnl BIGINT NOT NULL DEFAULT 0,
    opened_at BIGINT NOT NULL,
    updated_at BIGINT NOT NULL
);
