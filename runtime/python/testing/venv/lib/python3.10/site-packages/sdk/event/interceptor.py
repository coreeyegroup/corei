class EventGovernanceInterceptor:

    def validate(self, payload: dict):

        if "event_id" not in payload:
            raise ValueError(
                "Missing required field: event_id"
            )

        return True
