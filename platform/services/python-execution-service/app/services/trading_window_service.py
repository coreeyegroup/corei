from datetime import datetime
from zoneinfo import ZoneInfo


def generate_trading_window_state(
    workflow_id: str,
    market: str,
    market_profile: str,
    utc_timestamp: str,
    phase_state: str
):

    if phase_state != "ACTIVE_TRADING":

        return {
            "workflow_id": workflow_id,
            "workflow_name": "TRADING_WINDOW_CLOCK",
            "workflow_version": "1.0",
            "component_type": "OPERATIONS",
            "market": market,
            "market_profile": market_profile,
            "phase_state": phase_state,
            "window_state": "SESSION_CLOSED",
            "window_start": "",
            "window_end": ""
        }

    #
    # NSE EQUITY PROFILE
    #

    if market_profile == "NSE_EQUITY":

        dt_utc = datetime.fromisoformat(
            utc_timestamp.replace("Z", "+00:00")
        )

        dt_local = dt_utc.astimezone(
            ZoneInfo("Asia/Kolkata")
        )

        current_time = dt_local.strftime("%H:%M")

        if "09:15" <= current_time < "09:20":

            window_state = "OPENING_WINDOW"
            window_start = "09:15"
            window_end = "09:20"

        elif "09:20" <= current_time < "15:15":

            window_state = "CORE_SESSION"
            window_start = "09:20"
            window_end = "15:15"

        elif "15:15" <= current_time <= "15:30":

            window_state = "CLOSING_WINDOW"
            window_start = "15:15"
            window_end = "15:30"

        else:

            window_state = "SESSION_CLOSED"
            window_start = ""
            window_end = ""

    else:

        #
        # Placeholder for future profiles:
        #
        # FOREX_SPOT
        # CRYPTO_SPOT
        # NYSE_EQUITY
        # NASDAQ_EQUITY
        # MCX_COMMODITY
        #

        window_state = "SESSION_CLOSED"
        window_start = ""
        window_end = ""

    return {
        "workflow_id": workflow_id,
        "workflow_name": "TRADING_WINDOW_CLOCK",
        "workflow_version": "1.0",
        "component_type": "OPERATIONS",
        "market": market,
        "market_profile": market_profile,
        "phase_state": phase_state,
        "window_state": window_state,
        "window_start": window_start,
        "window_end": window_end
    }
