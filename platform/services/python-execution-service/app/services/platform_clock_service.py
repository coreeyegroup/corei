def generate_platform_clock_state(
    workflow_id: str,
    utc_timestamp: str,
    business_day: bool,
    session_state: str,
    health_state: str,
    trading_allowed: bool,
    phase_state: str,
    window_state: str,
    event_type: str,
    event_state: str,
    event_active: bool,
    broker_state: str,
    broker_health: str,
    broker_available: bool,
    data_state: str,
    data_health: str,
    data_freshness: str,
    data_available: bool
):

    return {
        "workflow_id": workflow_id,

        "workflow_name": "CLOCK_ENGINE",

        "workflow_version": "1.0",

        "component_type": "OPERATIONS",

        "utc_timestamp": utc_timestamp,

        "business_day": business_day,

        "session_state": session_state,

        "health_state": health_state,

        "trading_allowed": trading_allowed,

        "phase_state": phase_state,

        "window_state": window_state,

        "event_type": event_type,

        "event_state": event_state,

        "event_active": event_active,

        "broker_state": broker_state,

        "broker_health": broker_health,

        "broker_available": broker_available,

        "data_state": data_state,

        "data_health": data_health,

        "data_freshness": data_freshness,

        "data_available": data_available
    }
