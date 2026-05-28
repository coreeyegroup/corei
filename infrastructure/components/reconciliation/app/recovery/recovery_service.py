class RecoveryService:

    def recover(self, payload: dict):

        return {
            "recovery_status": "RECOVERED",
            "order_id": payload["order_id"]
        }
