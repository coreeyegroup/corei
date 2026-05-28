import hashlib

class LineageHasher:

    @staticmethod
    def generate(payload: dict):

        lineage_string = (
            f"{payload['signal_id']}|"
            f"{payload['trade_intent_id']}|"
            f"{payload['execution_intent_id']}|"
            f"{payload['order_id']}|"
            f"{payload['fill_id']}"
        )

        return hashlib.sha256(
            lineage_string.encode()
        ).hexdigest()
