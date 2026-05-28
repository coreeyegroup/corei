class ReconciliationEngine:

    def reconcile(self, payload: dict):

        broker_order_id = payload.get("broker_order_id")

        internal_order_id = payload.get("order_id")

        if broker_order_id != internal_order_id:

            return {
                "reconciliation_status": "MISMATCH",
                "account_halted": True
            }

        return {
            "reconciliation_status": "MATCHED",
            "account_halted": False
        }
