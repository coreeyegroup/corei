ADAPTER_CONFIG = {
    "mock_mode": True,
    "latency_ms": 50,
    "partial_fill_probability": 0.20,
    "heartbeat_interval_seconds": 5
}

SUPPORTED_ADAPTERS = [
    "mock",
    "mt5",
    "ib",
    "ctrader",
    "fix",
    "alpaca"
]

DEFAULT_ADAPTER = "mock"
