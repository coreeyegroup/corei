import asyncpg

from app.config import DATABASE_URL


async def get_connection():
    return await asyncpg.connect(DATABASE_URL)
