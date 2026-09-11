class WorkflowClient:

    def __init__(self, orchestration_url: str):

        self.orchestration_url = orchestration_url

    async def next_stage(self, pipeline_id: str):

        return {
            "pipeline_id": pipeline_id,
            "status": "resolved"
        }
