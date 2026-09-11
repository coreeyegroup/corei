BEGIN;

ALTER TABLE broker_accounts
    ADD COLUMN IF NOT EXISTS credential_id TEXT;

ALTER TABLE broker_accounts
    DROP CONSTRAINT IF EXISTS broker_accounts_credential_fk;

ALTER TABLE broker_accounts
    ADD CONSTRAINT broker_accounts_credential_fk
    FOREIGN KEY (credential_id)
    REFERENCES broker_credentials(credential_id)
    DEFERRABLE INITIALLY DEFERRED;

CREATE INDEX IF NOT EXISTS idx_broker_accounts_credential
    ON broker_accounts(credential_id);

COMMIT;
