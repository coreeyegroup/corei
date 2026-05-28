import asyncio

class AsyncDispatchEngine:

    async def dispatch(self, follower_execution: dict):

        await asyncio.sleep(0.01)

        return {
            "follower_account_id":
                follower_execution["follower_account_id"],

            "follower_execution_id":
                follower_execution["follower_execution_id"],

            "dispatch_status": "DISPATCHED"
        }

    async def parallel_dispatch(self, executions: list):

        return await asyncio.gather(*[
            self.dispatch(execution)
            for execution in executions
        ])
