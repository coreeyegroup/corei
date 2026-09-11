CREATE OR REPLACE FUNCTION prevent_pnl_ledger_mutation()
RETURNS trigger AS $$
BEGIN
    RAISE EXCEPTION 'pnl_ledger is immutable';
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER pnl_ledger_immutable
BEFORE UPDATE OR DELETE ON pnl_ledger
FOR EACH ROW
EXECUTE FUNCTION prevent_pnl_ledger_mutation();
