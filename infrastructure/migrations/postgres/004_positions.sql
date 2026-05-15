CREATE TABLE positions (
    position_id TEXT PRIMARY KEY,
    account_id TEXT NOT NULL,
    symbol TEXT NOT NULL,
    quantity BIGINT NOT NULL,
    average_price BIGINT NOT NULL,
    unrealized_pnl BIGINT NOT NULL,
    realized_pnl BIGINT NOT NULL,
    updated_at BIGINT NOT NULL
);
