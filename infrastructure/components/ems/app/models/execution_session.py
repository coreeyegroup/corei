from dataclasses import dataclass

@dataclass
class ExecutionSession:

    session_id: str

    connector: str

    protocol: str

    connected: bool

    heartbeat_timestamp_ns: int
