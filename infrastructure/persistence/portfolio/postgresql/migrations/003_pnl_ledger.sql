CREATE TABLE IF NOT EXISTS pnl_ledger (
    id BIGSERIAL PRIMARY KEY,
    account_id TEXT NOT NULL,
    instrument TEXT NOT NULL,
    realized_pnl BIGINT NOT NULL,
    unrealized_pnl BIGINT NOT NULL,
    fees BIGINT NOT NULL,
    recorded_at BIGINT NOT NULL
);
