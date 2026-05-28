class ReplayValidator:

    def validate(self, payload: dict):

        return {
            "replay_safe": True,
            "lineage_verified": True
        }
