CREATE TABLE portfolio_snapshots (
    snapshot_id TEXT PRIMARY KEY,
    account_id TEXT NOT NULL,
    equity BIGINT NOT NULL,
    pnl BIGINT NOT NULL,
    margin_used BIGINT NOT NULL,
    created_at BIGINT NOT NULL
);
