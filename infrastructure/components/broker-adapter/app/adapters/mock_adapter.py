import time
import random

from app.adapters.base_adapter import BaseBrokerAdapter

class MockBrokerAdapter(BaseBrokerAdapter):

    def __init__(self):

        self.connected = True

        self.latency_ms = 50

    def connect(self):

        return {
            "adapter": "mock",
            "connected": True
        }

    def health(self):

        return {
            "adapter": "mock",
            "connected": self.connected,
            "latency_ms": self.latency_ms,
            "heartbeat_timestamp_ns": time.time_ns()
        }

    def simulate_fill(self, order):

        time.sleep(self.latency_ms / 1000)

        partial_fill = random.random() < 0.20

        fill_quantity = 1

        fill_status = "FILLED"

        if partial_fill:
            fill_quantity = 0
            fill_status = "PARTIAL_FILL"

        return {
            "fill_id": "fill-mock-001",
            "order_id": order["order_id"],
            "execution_intent_id": order["execution_intent_id"],
            "trade_intent_id": order.get("trade_intent_id", "trade-mock"),
            "signal_id": order.get("signal_id", "signal-mock"),
            "status": fill_status,
            "fill_quantity": fill_quantity,
            "fill_price": 100
        }
