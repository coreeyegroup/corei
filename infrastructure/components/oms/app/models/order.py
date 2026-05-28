from dataclasses import dataclass
from app.models.order_state import OrderState

@dataclass
class OMSOrder:

    signal_id: str

    trade_intent_id: str

    execution_intent_id: str

    order_id: str

    account_id: str

    broker: str

    symbol: str

    quantity: int

    state: OrderState
