from app.models.order_state import OrderState
from app.sequencing.sequence_manager import SequenceManager

class OMSService:

    def __init__(self):

        self.sequence_manager = SequenceManager()

    def accept_order(self, order):

        sequence = self.sequence_manager.next_sequence()

        return {
            "order_id": order["order_id"],
            "execution_intent_id": order["execution_intent_id"],
            "state": OrderState.ACCEPTED,
            "sequence": sequence
        }

    def dispatch_order(self, order):

        sequence = self.sequence_manager.next_sequence()

        return {
            "order_id": order["order_id"],
            "execution_intent_id": order["execution_intent_id"],
            "state": OrderState.DISPATCHED,
            "sequence": sequence
        }
