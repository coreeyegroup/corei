import asyncio
import os
import time
import uuid
from decimal import Decimal
from typing import Any

import upstox_client

from app.connectors.base_connector import BaseBrokerConnector
from app.models.market_tick import MarketTick


class UpstoxConnector(BaseBrokerConnector):
    """
    Upstox Market Data Feed V3 connector.

    The connector owns one persistent WebSocket session and exposes
    incoming observations through the existing async connector contract.
    """

    def __init__(self) -> None:
        self.access_token = os.getenv("UPSTOX_ACCESS_TOKEN", "").strip()

        instrument_keys = os.getenv(
            "UPSTOX_INSTRUMENT_KEYS",
            "",
        )

        self.instrument_keys = [
            key.strip()
            for key in instrument_keys.split(",")
            if key.strip()
        ]

        self.queue: asyncio.Queue[MarketTick] = asyncio.Queue()

        self._loop: asyncio.AbstractEventLoop | None = None
        self._streamer: Any | None = None
        self._connected = False

    async def connect(self) -> None:
        if not self.access_token:
            raise RuntimeError(
                "UPSTOX_ACCESS_TOKEN is required"
            )

        if not self.instrument_keys:
            raise RuntimeError(
                "UPSTOX_INSTRUMENT_KEYS is required"
            )

        self._loop = asyncio.get_running_loop()

        configuration = upstox_client.Configuration()
        configuration.access_token = self.access_token

        self._streamer = upstox_client.MarketDataStreamerV3(
            upstox_client.ApiClient(configuration),
            self.instrument_keys,
            "full",
        )

        self._streamer.on(
            "open",
            self._on_open,
        )

        self._streamer.on(
            "message",
            self._on_message,
        )

        self._streamer.on(
            "close",
            self._on_disconnect,
        )

        self._streamer.on(
            "error",
            self._on_error,
        )

        self._streamer.connect()

        await self._wait_until_connected()

    async def disconnect(self) -> None:
        self._connected = False

        if self._streamer is not None:
            self._streamer.disconnect()
            self._streamer = None

    async def get_next_tick(self) -> MarketTick:
        return await self.queue.get()

    async def _wait_until_connected(self) -> None:
        deadline = time.monotonic() + 15.0

        while not self._connected:
            if time.monotonic() >= deadline:
                raise TimeoutError(
                    "Timed out waiting for Upstox V3 market-data connection"
                )

            await asyncio.sleep(0.05)

    def _on_open(self, *_args: Any) -> None:
        self._connected = True

    def _on_disconnect(self, *_args: Any) -> None:
        self._connected = False

    def _on_error(self, error: Any) -> None:
        print(f"UPSTOX V3 ERROR: {error}")

    def _on_message(self, message: Any) -> None:
        try:
            tick = self._message_to_tick(message)

            if tick is None:
                return

            if self._loop is None:
                return

            self._loop.call_soon_threadsafe(
                self.queue.put_nowait,
                tick,
            )

        except Exception as exc:
            print(
                f"UPSTOX V3 MESSAGE ERROR: {exc}"
            )

    def _message_to_tick(
        self,
        message: Any,
    ) -> MarketTick | None:
        if not isinstance(message, dict):
            return None

        feeds = message.get("feeds", {})

        if not isinstance(feeds, dict):
            return None

        for instrument, feed in feeds.items():
            tick = self._extract_tick(
                instrument,
                feed,
            )

            if tick is not None:
                return tick

        return None

    def _extract_tick(
        self,
        instrument: str,
        feed: Any,
    ) -> MarketTick | None:
        if not isinstance(feed, dict):
            return None

        full_feed = feed.get("fullFeed", {})

        if not isinstance(full_feed, dict):
            return None

        market_ff = full_feed.get("marketFF")
        index_ff = full_feed.get("indexFF")

        if isinstance(market_ff, dict):
            market_feed = market_ff
        elif isinstance(index_ff, dict):
            market_feed = index_ff
        else:
            return None

        ltpc = market_feed.get("ltpc")

        if not isinstance(ltpc, dict):
            return None

        last_price = ltpc.get("ltp")

        bid_price = None
        ask_price = None
        bid_size = None
        ask_size = None

        depth = market_feed.get("marketLevel", {})
        bid_ask_quote = depth.get("bidAskQuote", [])

        if isinstance(bid_ask_quote, list):
            for level in bid_ask_quote:
                if not isinstance(level, dict):
                    continue

                bid = level.get("bidP")
                ask = level.get("askP")

                if bid_price is None and bid is not None:
                    bid_price = bid
                    bid_size = level.get("bidQ", 0)

                if ask_price is None and ask is not None:
                    ask_price = ask
                    ask_size = level.get("askQ", 0)

        if bid_price is None or ask_price is None:
            return None

        if last_price is None:
            return None

        exchange_timestamp = ltpc.get("ltt")

        if exchange_timestamp is None:
            exchange_timestamp_ns = time.time_ns()
        else:
            exchange_timestamp_ns = int(exchange_timestamp) * 1_000_000

        return MarketTick(
            event_id=str(uuid.uuid4()),
            instrument=instrument,
            exchange_timestamp_ns=exchange_timestamp_ns,
            ingestion_timestamp_ns=time.time_ns(),
            bid_price=Decimal(str(bid_price)),
            ask_price=Decimal(str(ask_price)),
            bid_size=Decimal(str(bid_size or 0)),
            ask_size=Decimal(str(ask_size or 0)),
            source="upstox-v3",
        )
