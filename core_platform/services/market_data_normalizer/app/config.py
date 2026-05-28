from pydantic import BaseModel


class Settings(BaseModel):
    kafka_bootstrap_servers: str = "kafka.kafka.svc.cluster.local:9092"

    raw_topic: str = "raw_market_data_stream"

    normalized_topic: str = "normalized_market_data_stream"


settings = Settings()
