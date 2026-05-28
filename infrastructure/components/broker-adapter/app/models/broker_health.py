from dataclasses import dataclass

@dataclass
class BrokerHealth:

    broker: str

    connected: bool

    latency_ms: int

    heartbeat_timestamp_ns: int
