import time

from app.connectors.base_connector import BaseBrokerConnector

class MockBrokerConnector(BaseBrokerConnector):

    def __init__(self):

        self.connected = True

        self.last_heartbeat = time.time()

    def connect(self):

        self.connected = True

        return {
            "connector": "mock",
            "connected": True
        }

    def heartbeat(self):

        self.last_heartbeat = time.time()

        return {
            "connector": "mock",
            "heartbeat": self.last_heartbeat
        }

    def dispatch_order(self, order):

        return {
            "fill_id": "fill-mock-001",
            "order_id": order["order_id"],
            "execution_intent_id": order["execution_intent_id"],
            "trade_intent_id": order.get("trade_intent_id", "trade-mock"),
            "signal_id": order.get("signal_id", "signal-mock"),
            "status": "FILLED",
            "fill_quantity": 1,
            "fill_price": 100
        }

    def status(self):

        return {
            "connector": "mock",
            "connected": self.connected,
            "last_heartbeat": self.last_heartbeat
        }
