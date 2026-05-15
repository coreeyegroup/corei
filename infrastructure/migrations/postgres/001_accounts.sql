CREATE TABLE accounts (
    account_id TEXT PRIMARY KEY,
    broker TEXT NOT NULL,
    base_currency TEXT NOT NULL,
    balance BIGINT NOT NULL,
    equity BIGINT NOT NULL,
    margin_used BIGINT NOT NULL,
    created_at BIGINT NOT NULL,
    updated_at BIGINT NOT NULL
);
