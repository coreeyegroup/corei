BEGIN;

CREATE TABLE IF NOT EXISTS broker_providers (
    broker_id            TEXT PRIMARY KEY,
    display_name         TEXT NOT NULL,
    adapter_name         TEXT NOT NULL,
    enabled               BOOLEAN NOT NULL DEFAULT TRUE,
    metadata              JSONB NOT NULL DEFAULT '{}'::jsonb,
    created_at            TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at            TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS broker_accounts (
    account_id            TEXT PRIMARY KEY,
    broker_id             TEXT NOT NULL
                          REFERENCES broker_providers(broker_id),
    display_name          TEXT NOT NULL,
    environment           TEXT NOT NULL DEFAULT 'LIVE',
    enabled               BOOLEAN NOT NULL DEFAULT TRUE,
    metadata              JSONB NOT NULL DEFAULT '{}'::jsonb,
    created_at            TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at            TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_broker_accounts_broker
    ON broker_accounts(broker_id);

CREATE INDEX IF NOT EXISTS idx_broker_accounts_enabled
    ON broker_accounts(enabled);

CREATE TABLE IF NOT EXISTS broker_credentials (
    credential_id         TEXT PRIMARY KEY,
    broker_id             TEXT NOT NULL,
    account_id            TEXT NOT NULL,
    credential_type       TEXT NOT NULL DEFAULT 'OAUTH',
    provider              TEXT NOT NULL DEFAULT 'kubernetes',
    secret_ref            TEXT NOT NULL,
    environment           TEXT NOT NULL DEFAULT 'LIVE',
    enabled               BOOLEAN NOT NULL DEFAULT TRUE,
    metadata              JSONB NOT NULL DEFAULT '{}'::jsonb,
    created_at            TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at            TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CONSTRAINT fk_broker_credentials_broker
        FOREIGN KEY (broker_id)
        REFERENCES broker_providers(broker_id),

    CONSTRAINT fk_broker_credentials_account
        FOREIGN KEY (account_id)
        REFERENCES broker_accounts(account_id)
        ON DELETE CASCADE,

    CONSTRAINT uq_broker_credentials_account
        UNIQUE (account_id)
);

CREATE INDEX IF NOT EXISTS idx_broker_credentials_broker
    ON broker_credentials(broker_id);

CREATE INDEX IF NOT EXISTS idx_broker_credentials_account
    ON broker_credentials(account_id);

CREATE INDEX IF NOT EXISTS idx_broker_credentials_enabled
    ON broker_credentials(enabled);

INSERT INTO broker_providers (
    broker_id,
    display_name,
    adapter_name
)
VALUES
    ('mock', 'Mock Broker', 'mock'),
    ('upstox', 'Upstox', 'upstox')
ON CONFLICT (broker_id)
DO UPDATE SET
    display_name = EXCLUDED.display_name,
    adapter_name = EXCLUDED.adapter_name,
    updated_at = NOW();

COMMIT;
