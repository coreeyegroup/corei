class ConfigClient:

    def __init__(self, config_url: str):

        self.config_url = config_url

    async def get(self, key: str):

        return {
            "key": key,
            "value": "placeholder"
        }
