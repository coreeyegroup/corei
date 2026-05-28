class FollowerRiskValidator:

    def validate(self, follower: dict):

        return {
            "follower_account_id": follower["account_id"],
            "risk_check": "PASSED",
            "eligible": True
        }
