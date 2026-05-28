from app.config.router_config import (
    BROKER_ROUTING,
    FAILOVER_ENABLED,
    LATENCY_THRESHOLD_MS
)

class SmartOrderRouter:

    def select_broker(self, account_id: str):

        candidates = []

        for broker, config in BROKER_ROUTING.items():

            if not config["enabled"]:
                continue

            if not config["healthy"]:
                continue

            if config["latency_ms"] > LATENCY_THRESHOLD_MS:
                continue

            candidates.append((broker, config))

        if not candidates:

            if FAILOVER_ENABLED:
                raise Exception("NO_HEALTHY_BROKERS_AVAILABLE")

        candidates.sort(key=lambda x: x[1]["latency_ms"])

        selected = candidates[0]

        return {
            "broker": selected[0],
            "latency_ms": selected[1]["latency_ms"],
            "selected_by": "latency_priority"
        }
