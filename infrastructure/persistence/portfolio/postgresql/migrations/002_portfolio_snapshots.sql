CREATE TABLE IF NOT EXISTS portfolio_snapshots (
    id BIGSERIAL PRIMARY KEY,
    account_id TEXT NOT NULL,
    equity BIGINT NOT NULL,
    used_margin BIGINT NOT NULL,
    available_margin BIGINT NOT NULL,
    realized_pnl BIGINT NOT NULL,
    unrealized_pnl BIGINT NOT NULL,
    drawdown_bps BIGINT NOT NULL,
    snapshot_timestamp BIGINT NOT NULL
);
