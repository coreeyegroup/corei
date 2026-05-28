from sqlalchemy import create_engine
import pandas as pd

DATABASE_URL = (
    "postgresql://research_user:"
    "research_password@timescaledb.database.svc.cluster.local:5432/marketdata"
)

engine = create_engine(DATABASE_URL)

def get_latest_ticks(symbol="GOLD.FX", limit=100):
    query = f"""
    SELECT
        symbol,
        event_time,
        bid_price,
        ask_price,
        source
    FROM ticks
    WHERE symbol = '{symbol}'
    ORDER BY event_time DESC
    LIMIT {limit}
    """

    return pd.read_sql(query, engine)

def get_ohlcv(symbol="GOLD.FX"):
    query = f"""
    SELECT
        symbol,
        candle_open_time,
        high,
        low,
        ticks
    FROM ohlcv_1m
    WHERE symbol = '{symbol}'
    ORDER BY candle_open_time DESC
    LIMIT 100
    """

    return pd.read_sql(query, engine)
