class ScalingEngine:

    @staticmethod
    def scale(
        master_lot: float,
        master_equity: float,
        follower_equity: float
    ):

        return round(
            master_lot * (
                follower_equity / master_equity
            ),
            4
        )
