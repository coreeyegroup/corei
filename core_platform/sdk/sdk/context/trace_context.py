from dataclasses import dataclass


@dataclass
class TraceContext:

    trace_id: str
    lineage_id: str
