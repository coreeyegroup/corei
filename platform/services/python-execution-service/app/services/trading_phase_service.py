def generate_trading_phase_state(
    workflow_id: str,
    market: str,
    session_state: str,
    health_state: str,
    trading_allowed: bool
):

    if health_state != "HEALTHY":

        phase_state = "PLATFORM_DEGRADED"

    elif session_state == "PRE_MARKET":

        phase_state = "PRE_MARKET"

    elif (
        session_state == "MARKET_OPEN"
        and trading_allowed
    ):

        phase_state = "ACTIVE_TRADING"

    elif session_state == "MARKET_CLOSED":

        phase_state = "POST_MARKET"

    else:

        phase_state = "POST_MARKET"

    return {
        "workflow_id": workflow_id,

        "workflow_name": "TRADING_PHASE_CLOCK",

        "workflow_version": "1.0",

        "component_type": "OPERATIONS",

        "market": market,

        "phase_state": phase_state,

        "trading_allowed": trading_allowed,

        "session_state": session_state,

        "health_state": health_state
    }
