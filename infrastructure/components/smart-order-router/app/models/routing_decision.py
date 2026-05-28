from dataclasses import dataclass

@dataclass
class RoutingDecision:

    broker: str
    order_id: str
    account_id: str
    selected_by: str
    latency_ms: int
