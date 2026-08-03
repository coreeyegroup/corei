def generate_system_health_state(
    workflow_id: str
):

    kubernetes_status = True

    n8n_status = True

    python_service_status = True

    if (
        kubernetes_status
        and n8n_status
        and python_service_status
    ):
        health_state = "HEALTHY"

    elif (
        kubernetes_status
        or n8n_status
        or python_service_status
    ):
        health_state = "DEGRADED"

    else:
        health_state = "CRITICAL"

    return {
        "workflow_id": workflow_id,

        "workflow_name": "SYSTEM_HEALTH_CLOCK",

        "workflow_version": "1.0",

        "component_type": "OPERATIONS",

        "health_state": health_state,

        "kubernetes_status": kubernetes_status,

        "n8n_status": n8n_status,

        "python_service_status": python_service_status
    }
