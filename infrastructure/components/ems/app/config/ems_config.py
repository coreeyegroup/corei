EMS_CONFIG = {
    "mock_mode": True,
    "heartbeat_interval_seconds": 5,
    "session_timeout_seconds": 30,
    "reconnect_enabled": True,
    "max_reconnect_attempts": 5
}

SUPPORTED_CONNECTORS = [
    "mt5",
    "ib",
    "ctrader",
    "fix",
    "alpaca",
    "mock"
]

DEFAULT_CONNECTOR = "mock"
