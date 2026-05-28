from fastapi import FastAPI
from fastapi.responses import JSONResponse

from app.database import get_connection


app = FastAPI()


@app.get("/health")
async def health():
    return {"status": "healthy"}


@app.get("/ticks")
async def get_ticks(
    symbol: str = "GOLD.FX",
    limit: int = 10,
):
    conn = await get_connection()

    rows = await conn.fetch(
        """
        SELECT
            event_id,
            symbol,
            event_time,
            bid_price,
            ask_price,
            bid_size,
            ask_size,
            normalized_timestamp_ns,
            source
        FROM ticks
        WHERE symbol = $1
        ORDER BY event_time DESC
        LIMIT $2
        """,
        symbol,
        limit,
    )

    await conn.close()

    result = [dict(row) for row in rows]

    return JSONResponse(content=result)


@app.get("/ohlcv")
async def get_ohlcv(
    symbol: str = "GOLD.FX",
    limit: int = 10,
):
    conn = await get_connection()

    rows = await conn.fetch(
        """
        SELECT
            symbol,
            MIN(event_time) AS candle_open_time,
            MAX(bid_price) AS high,
            MIN(bid_price) AS low,
            COUNT(*) AS ticks
        FROM ticks
        WHERE symbol = $1
        GROUP BY symbol
        LIMIT $2
        """,
        symbol,
        limit,
    )

    await conn.close()

    result = [dict(row) for row in rows]

    return JSONResponse(content=result)
