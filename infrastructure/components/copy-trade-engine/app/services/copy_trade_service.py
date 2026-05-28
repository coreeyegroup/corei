import uuid
import asyncio

from app.scaling.scaling_engine import ScalingEngine
from app.followers.follower_risk_validator import FollowerRiskValidator
from app.dispatch.async_dispatch_engine import AsyncDispatchEngine

class CopyTradeService:

    def __init__(self):

        self.scaler = ScalingEngine()

        self.validator = FollowerRiskValidator()

        self.dispatcher = AsyncDispatchEngine()

    async def propagate(self, payload: dict):

        master_lot = payload["master_lot"]

        master_equity = payload["master_equity"]

        followers = payload["followers"]

        executions = []

        validation_results = []

        for follower in followers:

            validation = self.validator.validate(follower)

            validation_results.append(validation)

            if validation["eligible"]:

                scaled_quantity = self.scaler.scale(
                    master_lot,
                    master_equity,
                    follower["equity"]
                )

                executions.append({
                    "follower_account_id":
                        follower["account_id"],

                    "follower_execution_id":
                        str(uuid.uuid4()),

                    "scaled_quantity":
                        scaled_quantity
                })

        dispatch_results = await self.dispatcher.parallel_dispatch(
            executions
        )

        return {
            "signal_id": payload["signal_id"],
            "trade_intent_id": payload["trade_intent_id"],
            "execution_intent_id":
                payload["execution_intent_id"],

            "order_id": payload["order_id"],

            "fill_id": payload["fill_id"],

            "validations": validation_results,

            "dispatch_results": dispatch_results
        }
