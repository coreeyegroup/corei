from dataclasses import dataclass

@dataclass
class FillEvent:

    fill_id: str

    order_id: str

    execution_intent_id: str

    trade_intent_id: str

    signal_id: str

    status: str

    fill_quantity: int

    fill_price: int
