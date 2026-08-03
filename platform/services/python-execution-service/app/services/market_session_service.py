from datetime import datetime
from zoneinfo import ZoneInfo


MARKET_CONFIG = {
    "NSE": {
        "timezone": "Asia/Kolkata",
        "open_hour": 9,
        "open_minute": 15,
        "close_hour": 15,
        "close_minute": 30
    }
}


def generate_market_session_state(
    workflow_id: str,
    market: str,
    utc_timestamp: str,
    business_day: bool
):

    config = MARKET_CONFIG[market]

    timezone_name = config["timezone"]

    utc_dt = datetime.fromisoformat(
        utc_timestamp.replace("Z", "+00:00")
    )

    local_dt = utc_dt.astimezone(
        ZoneInfo(timezone_name)
    )

    current_minutes = (
        local_dt.hour * 60
        + local_dt.minute
    )

    market_open_minutes = (
        config["open_hour"] * 60
        + config["open_minute"]
    )

    market_close_minutes = (
        config["close_hour"] * 60
        + config["close_minute"]
    )

    if not business_day:

        session_state = "MARKET_CLOSED"

    elif current_minutes < market_open_minutes:

        session_state = "PRE_MARKET"

    elif current_minutes < market_close_minutes:

        session_state = "MARKET_OPEN"

    else:

        session_state = "MARKET_CLOSED"

    return {
        "workflow_id": workflow_id,
        "workflow_name": "MARKET_SESSION_CLOCK",
        "workflow_version": "1.0",
        "component_type": "OPERATIONS",

        "market": market,
        "timezone": timezone_name,

        "session_state": session_state,

        "market_open_time": "09:15",
        "market_close_time": "15:30",

        "business_day": business_day
    }
