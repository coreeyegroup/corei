class AccountHaltGovernance:

    def halt(self, account_id: str):

        return {
            "account_id": account_id,
            "halted": True,
            "reason": "RECONCILIATION_MISMATCH"
        }
