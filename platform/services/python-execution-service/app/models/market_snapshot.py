from pydantic import BaseModel


class MarketSnapshotRequest(BaseModel):
    workflow_id: str

    market: str
    market_profile: str

    data_provider: str

    feed_health: str
    feed_freshness: str

    feed_trusted: bool


class MarketSnapshotResponse(BaseModel):
    workflow_id: str

    workflow_name: str
    workflow_version: str

    component_type: str

    market: str
    market_profile: str

    data_provider: str

    snapshot_timestamp: str

    snapshot_state: str

    feed_health: str
    feed_freshness: str

    snapshot_trusted: bool
