from dataclasses import dataclass


@dataclass
class ExecutionContext:

    service_name: str
    environment: str
    trace_id: str
