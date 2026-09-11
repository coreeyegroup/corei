BEGIN;

CREATE TABLE IF NOT EXISTS broker_providers (
    broker_id            TEXT PRIMARY KEY,
    display_name         TEXT NOT NULL,
    adapter_name         TEXT NOT NULL,
    enabled              BOOLEAN NOT NULL DEFAULT TRUE,
    metadata             JSONB NOT NULL DEFAULT '{}'::jsonb,
    created_at           TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at           TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS broker_accounts (
    account_id           TEXT PRIMARY KEY,
    broker_id            TEXT NOT NULL
                         REFERENCES broker_providers(broker_id),
    display_name         TEXT NOT NULL,
    environment          TEXT NOT NULL DEFAULT 'LIVE',
    enabled              BOOLEAN NOT NULL DEFAULT TRUE,
    credential_id        TEXT,
    metadata             JSONB NOT NULL DEFAULT '{}'::jsonb,
    created_at           TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at           TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS broker_credentials (
    credential_id        TEXT PRIMARY KEY,
    broker_id            TEXT NOT NULL
                         REFERENCES broker_providers(broker_id),
    account_id           TEXT NOT NULL
                         REFERENCES broker_accounts(account_id)
                         ON DELETE CASCADE,
    credential_ref       TEXT NOT NULL,
    credential_type      TEXT NOT NULL DEFAULT 'OAUTH',
    environment          TEXT NOT NULL DEFAULT 'LIVE',
    enabled              BOOLEAN NOT NULL DEFAULT TRUE,
    metadata             JSONB NOT NULL DEFAULT '{}'::jsonb,
    created_at           TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at           TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CONSTRAINT broker_credentials_account_unique
        UNIQUE (account_id, credential_type)
);

ALTER TABLE broker_accounts
    ADD CONSTRAINT broker_accounts_credential_fk
    FOREIGN KEY (credential_id)
    REFERENCES broker_credentials(credential_id)
    DEFERRABLE INITIALLY DEFERRED;

CREATE INDEX IF NOT EXISTS idx_broker_accounts_broker
    ON broker_accounts(broker_id);

CREATE INDEX IF NOT EXISTS idx_broker_credentials_broker
    ON broker_credentials(broker_id);

CREATE INDEX IF NOT EXISTS idx_broker_credentials_account
    ON broker_credentials(account_id);

CREATE INDEX IF NOT EXISTS idx_broker_credentials_ref
    ON broker_credentials(credential_ref);

INSERT INTO broker_providers
    (broker_id, display_name, adapter_name)
VALUES
    ('mock', 'Mock Broker', 'mock'),
    ('upstox', 'Upstox', 'upstox')
ON CONFLICT (broker_id) DO NOTHING;

COMMIT;
