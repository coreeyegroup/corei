class EventClient:

    def __init__(self, gateway_url: str):

        self.gateway_url = gateway_url

    async def publish(self, topic: str, payload: dict):

        return {
            "status": "accepted",
            "topic": topic,
            "gateway": self.gateway_url
        }
