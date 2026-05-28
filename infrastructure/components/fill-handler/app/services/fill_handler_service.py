from app.hashing.lineage_hasher import LineageHasher
from app.reconciliation.reconciliation_service import ReconciliationService
from app.services.portfolio_update_service import PortfolioUpdateService

class FillHandlerService:

    def __init__(self):

        self.reconciliation = ReconciliationService()

        self.portfolio = PortfolioUpdateService()

    def process_fill(self, fill):

        lineage_hash = LineageHasher.generate(fill)

        reconciliation_result = self.reconciliation.reconcile(fill)

        portfolio_result = self.portfolio.propagate(fill)

        return {
            "signal_id": fill["signal_id"],
            "trade_intent_id": fill["trade_intent_id"],
            "execution_intent_id": fill["execution_intent_id"],
            "order_id": fill["order_id"],
            "fill_id": fill["fill_id"],
            "fill_lineage_hash": lineage_hash,
            "reconciliation": reconciliation_result,
            "portfolio_update": portfolio_result
        }
