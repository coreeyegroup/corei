class PortfolioUpdateService:

    def propagate(self, fill):

        return {
            "portfolio_update": "EMITTED",
            "order_id": fill["order_id"],
            "fill_id": fill["fill_id"]
        }
