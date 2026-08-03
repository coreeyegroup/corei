def generate_market_data_clock_state(
    workflow_id: str,
    market: str,
    market_profile: str
):

    #
    # VERSION 1.0
    #
    # STATIC MARKET DATA ENGINE
    #

    data_state = "CONNECTED"

    data_health = "HEALTHY"

    data_freshness = "REALTIME"

    data_available = True

    return {
        "workflow_id": workflow_id,

        "workflow_name": "MARKET_DATA_CLOCK",

        "workflow_version": "1.0",

        "component_type": "OPERATIONS",

        "market": market,

        "market_profile": market_profile,

        "data_state": data_state,

        "data_health": data_health,

        "data_freshness": data_freshness,

        "data_available": data_available
    }
