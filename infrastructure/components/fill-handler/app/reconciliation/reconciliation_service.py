class ReconciliationService:

    def reconcile(self, fill):

        return {
            "reconciliation_status": "MATCHED",
            "order_id": fill["order_id"],
            "fill_id": fill["fill_id"]
        }
