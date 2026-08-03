def generate_trading_day_state(
    workflow_id: str,
    market: str,
    business_day: bool,
    session_state: str,
    health_state: str
):

    trading_allowed = (
        business_day
        and session_state == "MARKET_OPEN"
        and health_state == "HEALTHY"
    )

    trading_state = (
        "TRADING_ALLOWED"
        if trading_allowed
        else "TRADING_BLOCKED"
    )

    return {
        "workflow_id": workflow_id,

        "workflow_name": "TRADING_DAY_CLOCK",

        "workflow_version": "1.0",

        "component_type": "OPERATIONS",

        "trading_allowed": trading_allowed,

        "trading_state": trading_state,

        "market": market,

        "session_state": session_state,

        "business_day": business_day,

        "health_state": health_state
    }
