from dataclasses import dataclass

@dataclass
class FillEvent:

    signal_id: str

    trade_intent_id: str

    execution_intent_id: str

    order_id: str

    fill_id: str

    status: str

    fill_quantity: int

    fill_price: int
