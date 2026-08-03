from datetime import datetime, timezone


def generate_clock_state(workflow_id: str):

    now = datetime.now(timezone.utc)

    return {
        "workflow_id": workflow_id,
        "workflow_name": "SYSTEM_CLOCK",
	    "workflow_version": "1.0",
        "component_type": "OPERATIONS",
        "platform_state": "ACTIVE",
        "utc_timestamp": now.isoformat(),
        "epoch_ms": int(now.timestamp() * 1000),
        "heartbeat": "ALIVE"
    }
