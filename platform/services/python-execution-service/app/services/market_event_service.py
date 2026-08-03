def generate_market_event_state(
    workflow_id: str,
    market: str,
    market_profile: str,
    window_state: str
):

    #
    # V1
    # Static Event Engine
    #

    event_type = "NORMAL_SESSION"

    event_state = "INACTIVE"

    event_severity = "NONE"

    event_active = False

    return {
        "workflow_id": workflow_id,

        "workflow_name": "MARKET_EVENT_CLOCK",

        "workflow_version": "1.0",

        "component_type": "OPERATIONS",

        "market": market,

        "market_profile": market_profile,

        "event_type": event_type,

        "event_state": event_state,

        "event_severity": event_severity,

        "event_active": event_active,

        "window_state": window_state
    }
