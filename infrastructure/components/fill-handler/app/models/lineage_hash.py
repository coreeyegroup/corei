from dataclasses import dataclass

@dataclass
class LineageHash:

    signal_id: str

    trade_intent_id: str

    execution_intent_id: str

    order_id: str

    fill_id: str

    fill_lineage_hash: str
