import asyncio

from app.ingestion_service import \
    MarketDataIngestionService


async def main() -> None:

    service = MarketDataIngestionService()

    await service.run()


if __name__ == "__main__":
    asyncio.run(main())
