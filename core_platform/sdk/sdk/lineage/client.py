import hashlib


class LineageClient:

    def hash_entity(self, payload: str):

        return hashlib.sha256(
            payload.encode()
        ).hexdigest()
