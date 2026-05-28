from dataclasses import dataclass

@dataclass
class ReconciliationEvent:

    signal_id: str

    trade_intent_id: str

    execution_intent_id: str

    order_id: str

    fill_id: str

    fill_lineage_hash: str

    reconciliation_status: str

    account_halted: bool
