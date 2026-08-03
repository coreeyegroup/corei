def generate_broker_clock_state(
    workflow_id: str,
    broker_profile: str
):

    #
    # VERSION 1.0
    #
    # STATIC BROKER ENGINE
    #

    broker_state = "CONNECTED"

    broker_health = "HEALTHY"

    broker_available = True

    return {
        "workflow_id": workflow_id,

        "workflow_name": "BROKER_CLOCK",

        "workflow_version": "1.0",

        "component_type": "OPERATIONS",

        "broker_profile": broker_profile,

        "broker_state": broker_state,

        "broker_health": broker_health,

        "broker_available": broker_available
    }
