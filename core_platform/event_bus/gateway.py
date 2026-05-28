#!/usr/bin/env python3

class EventBusGateway:

    def publish(
        self,
        topic: str,
        payload: dict
    ):

        return {
            "topic": topic,
            "status": "accepted",
            "payload": payload
        }


if __name__ == "__main__":

    gateway = EventBusGateway()

    print(
        gateway.publish(
            "test-topic",
            {"event_id": "evt-001"}
        )
    )
