from app.services.reconciliation_engine import ReconciliationEngine
from app.governance.account_halt import AccountHaltGovernance
from app.replay.replay_validator import ReplayValidator
from app.recovery.recovery_service import RecoveryService

class ReconciliationService:

    def __init__(self):

        self.engine = ReconciliationEngine()

        self.halt = AccountHaltGovernance()

        self.replay = ReplayValidator()

        self.recovery = RecoveryService()

    def reconcile(self, payload: dict):

        reconciliation_result = self.engine.reconcile(payload)

        replay_result = self.replay.validate(payload)

        recovery_result = self.recovery.recover(payload)

        halt_result = None

        if reconciliation_result["account_halted"]:

            halt_result = self.halt.halt(
                payload.get("account_id", "unknown-account")
            )

        return {
            "signal_id": payload["signal_id"],
            "trade_intent_id": payload["trade_intent_id"],
            "execution_intent_id": payload["execution_intent_id"],
            "order_id": payload["order_id"],
            "fill_id": payload["fill_id"],
            "fill_lineage_hash": payload["fill_lineage_hash"],
            "reconciliation": reconciliation_result,
            "replay_validation": replay_result,
            "recovery": recovery_result,
            "halt_governance": halt_result
        }
