from dataclasses import dataclass

@dataclass
class BrokerHealth:

    broker: str
    healthy: bool
    latency_ms: int
    heartbeat_timestamp_ns: int
