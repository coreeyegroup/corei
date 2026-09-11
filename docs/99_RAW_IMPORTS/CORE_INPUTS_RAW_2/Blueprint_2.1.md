STAGE 1: COMPLETE PLATFORM BLUEPRINT
In-Depth Design Guide — Scalable from Minimum to Maximum

1.1 REQUIREMENTS DOCUMENT
Minimum Now → Maximum at Scale

ACCOUNTS & BROKERS
                    NOW (MIN)          SCALE (MAX)
                    ─────────────────────────────
Accounts            5–10               500–1000
Brokers             2 (MT5 + IB)       20+ all types
Account Groups      2                  50+
Trade Copier        1 master           Unlimited masters
Concurrent Orders   10                 10,000+
Order Types         Market, Limit      All types + algos

STRATEGIES
                    NOW (MIN)          SCALE (MAX)
                    ─────────────────────────────
Active Strategies   2                  100+
Symbols Tracked     10                 5,000+
Timeframes          1min, 1H           Tick to Monthly
Signal Frequency    Low (1H bars)      High (per tick)
Strategy Types      Trend, Mean Rev    All types
ML Strategies       No                 Yes (RL, LSTM)
News Trading        No                 Yes
Arbitrage           No                 Yes

DATA REQUIREMENTS
                    NOW (MIN)          SCALE (MAX)
                    ─────────────────────────────
Tick Storage        30 days            10 years
Symbols             10                 5,000
Data Feeds          1 broker feed      5+ feeds
Historical          1 year             20 years
Alternative Data    No                 News, sentiment
Data Volume         ~1GB/day           ~1TB/day
Query Speed         <1 second          <10ms

EXECUTION & LATENCY
                    NOW (MIN)          SCALE (MAX)
                    ─────────────────────────────
Target Latency      <100ms             <1ms
Order Routing       Single broker      Smart multi-broker
Execution Engine    Python async       C++/Rust core
Co-location         Cloud VPS          Equinix NY4/LD4
FIX Connectivity    No                 Yes
Orders/Second       1–5                10,000+

RISK MANAGEMENT
                    NOW (MIN)          SCALE (MAX)
                    ─────────────────────────────
Risk Rules          5 basic rules      50+ complex rules
Risk Calculation    Per order          Real-time portfolio
Drawdown Control    Daily limit        Intraday real-time
Margin Monitoring   Manual check       Auto kill switch
Correlation Engine  No                 Yes (full matrix)
VaR Calculation     No                 Real-time VaR

1.2 FULL SERVICE MAP
Every Service, Every Connection, Every Data Flow

COMPLETE SYSTEM MAP
╔══════════════════════════════════════════════════════════════════════════╗
║                         EXTERNAL WORLD                                  ║
║                                                                          ║
║  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────────┐  ║
║  │  MT5     │ │ cTrader  │ │   IB     │ │  FIX API │ │   Crypto     │  ║
║  │ Broker   │ │ Broker   │ │ Broker   │ │ Broker   │ │  Exchange    │  ║
║  └────┬─────┘ └────┬─────┘ └────┬─────┘ └────┬─────┘ └──────┬───────┘  ║
╚═══════╪═══════════╪═════════════╪═════════════╪══════════════╪══════════╝
        │           │             │             │              │
        └───────────┴─────────────┴─────────────┴──────────────┘
                                  │
                    ╔═════════════▼══════════════╗
                    ║    BROKER CONNECTOR LAYER  ║
                    ║  ┌─────────────────────┐   ║
                    ║  │ MT5Connector        │   ║
                    ║  │ CTraderConnector    │   ║
                    ║  │ IBConnector         │   ║
                    ║  │ FIXConnector        │   ║
                    ║  │ BinanceConnector    │   ║
                    ║  │ UniversalAdapter    │   ║
                    ║  └─────────────────────┘   ║
                    ╚═════════════╤══════════════╝
                                  │
              ┌───────────────────┼────────────────────┐
              │                   │                    │
    ╔═════════▼═════╗   ╔═════════▼══════╗  ╔══════════▼══════╗
    ║  DATA SERVICE ║   ║ ORDER MANAGER  ║  ║ ACCOUNT MANAGER ║
    ║               ║   ║                ║  ║                 ║
    ║ • Tick Ingest ║   ║ • Order CRUD   ║  ║ • Balance Track ║
    ║ • Normalize   ║   ║ • Smart Route  ║  ║ • Group Manage  ║
    ║ • OHLCV Build ║   ║ • Fill Track   ║  ║ • Trade Copy    ║
    ║ • Store Ticks ║   ║ • Order State  ║  ║ • Lot Scaling   ║
    ║ • Serve Hist  ║   ║   Machine      ║  ║ • Equity Track  ║
    ╚═════════╤═════╝   ╚═════════╤══════╝  ╚══════════╤══════╝
              │                   │                    │
              │         ╔═════════▼══════╗             │
              │         ║  RISK ENGINE   ║             │
              │         ║                ║             │
              │         ║ • Pre-trade    ║             │
              │         ║   Check        ║             │
              │         ║ • Post-trade   ║             │
              │         ║   Monitor      ║             │
              │         ║ • Kill Switch  ║             │
              │         ║ • Margin Watch ║             │
              │         ║ • Correlation  ║             │
              │         ╚═════════╤══════╝             │
              │                   │                    │
    ╔═════════▼═══════════════════▼════════════════════▼══════╗
    ║                    MESSAGE BUS                          ║
    ║              Redis Pub/Sub (now) → Kafka (scale)        ║
    ║                                                         ║
    ║  Channels:                                              ║
    ║  • ticks.{symbol}          • signals.{strategy}        ║
    ║  • orders.placed           • orders.filled             ║
    ║  • risk.breach             • risk.kill_switch          ║
    ║  • account.update          • system.health             ║
    ╚═════════╤═══════════════════════════════════════════════╝
              │
    ╔═════════▼══════════════════════════════════╗
    ║            STRATEGY ENGINE                 ║
    ║                                            ║
    ║  ┌────────────────┐  ┌─────────────────┐  ║
    ║  │ Gold Monitor   │  │ Stock Scanner   │  ║
    ║  │ Strategy       │  │ + Momentum      │  ║
    ║  │ • ATR filter   │  │ Strategy        │  ║
    ║  │ • DXY correl   │  │ • Score & rank  │  ║
    ║  │ • Session time │  │ • Volume filter │  ║
    ║  │ • RSI + BB     │  │ • MA cross      │  ║
    ║  └────────────────┘  └─────────────────┘  ║
    ║                                            ║
    ║  ┌────────────────┐  ┌─────────────────┐  ║
    ║  │ Mean Reversion │  │ News Trading    │  ║
    ║  │ Strategy       │  │ Strategy        │  ║
    ║  │ (future)       │  │ (future)        │  ║
    ║  └────────────────┘  └─────────────────┘  ║
    ║                                            ║
    ║  ┌──────────────────────────────────────┐  ║
    ║  │        Signal Aggregator             │  ║
    ║  │  Combines signals from all strategies│  ║
    ║  │  Weighted voting + confidence score  │  ║
    ║  └──────────────────────────────────────┘  ║
    ╚════════════════════════════════════════════╝
              │
    ╔═════════▼════════════════════════════════════╗
    ║         PORTFOLIO TRACKER                    ║
    ║                                              ║
    ║ • Real-time P&L (realized + unrealized)      ║
    ║ • Position aggregation across all accounts   ║
    ║ • Performance metrics (Sharpe, drawdown)     ║
    ║ • Daily/weekly/monthly reporting             ║
    ╚═════════╤════════════════════════════════════╝
              │
    ╔═════════▼════════════════════════════════════╗
    ║              DATA LAYER                      ║
    ║                                              ║
    ║  ┌──────────────┐ ┌──────────┐ ┌──────────┐ ║
    ║  │ TimescaleDB  │ │Postgres  │ │  Redis   │ ║
    ║  │ (tick data)  │ │(business)│ │ (cache)  │ ║
    ║  └──────────────┘ └──────────┘ └──────────┘ ║
    ╚═════════╤════════════════════════════════════╝
              │
    ╔═════════▼════════════════════════════════════╗
    ║           API GATEWAY (FastAPI)              ║
    ║                                              ║
    ║  REST endpoints + WebSocket streams          ║
    ║  JWT Auth + Rate Limiting + SSL              ║
    ╚═════════╤════════════════════════════════════╝
              │
    ╔═════════▼════════════════════════════════════╗
    ║         FRONTEND DASHBOARD                   ║
    ║                                              ║
    ║  ┌──────────┐ ┌──────────┐ ┌─────────────┐  ║
    ║  │Portfolio │ │Strategy  │ │Gold Monitor │  ║
    ║  │Overview  │ │Control   │ │+ Scanner    │  ║
    ║  └──────────┘ └──────────┘ └─────────────┘  ║
    ║  ┌──────────┐ ┌──────────┐ ┌─────────────┐  ║
    ║  │Orders &  │ │Risk      │ │System       │  ║
    ║  │Positions │ │Dashboard │ │Health       │  ║
    ║  └──────────┘ └──────────┘ └─────────────┘  ║
    ╚══════════════════════════════════════════════╝
              │
    ╔═════════▼════════════════════════════════════╗
    ║           ALERT SERVICE                      ║
    ║                                              ║
    ║  Telegram Bot │ Email │ SMS │ Webhook        ║
    ╚══════════════════════════════════════════════╝

DETAILED SERVICE SPECIFICATIONS
Service 1: Data Service
PURPOSE:
Single source of truth for all market data.
Every other service gets data from here — never
directly from brokers.

INPUTS:
├── Price ticks from Broker Connector
├── Historical data requests from Strategy Engine
├── Scanner requests from Dashboard
└── Macro data (DXY, yields) from external APIs

OUTPUTS:
├── Normalized ticks → Redis pub/sub
├── OHLCV bars → Redis pub/sub
├── Historical data → Strategy Engine (on request)
├── Stock rankings → Redis (updated every 5 min)
└── Gold macro signals → Redis (updated every 1 min)

INTERNAL COMPONENTS:
├── FeedNormalizer     → standard {time,sym,bid,ask,vol}
├── BarBuilder         → tick → OHLCV aggregator
├── TickStore          → write ticks to TimescaleDB
├── HistoricalServer   → serve OHLCV from TimescaleDB
├── StockScanner       → score and rank symbols
├── AssetMonitor       → Gold deep analysis module
└── MacroDataFetcher   → DXY, yields, VIX

SCALING PATH:
Now:   Single process, handles 10 symbols, 1 feed
Scale: Multiple workers, 5000 symbols, 5 feeds
       Add Kafka for high-throughput tick streaming

Service 2: Strategy Engine
PURPOSE:
Runs all trading strategies. Subscribes to data,
generates signals, publishes to Order Manager.
Completely isolated — strategies never talk to
brokers directly.

INPUTS:
├── Ticks from Data Service (via Redis)
├── OHLCV bars from Data Service (via Redis)
├── Macro signals from Data Service
└── Control commands from Dashboard (start/stop)

OUTPUTS:
├── Trading signals → Redis pub/sub
│   Format: {strategy_id, symbol, side, confidence,
│            entry_price, stop_loss, take_profit,
│            timestamp, expiry}
└── Strategy metrics → PostgreSQL (win rate, P&L)

INTERNAL COMPONENTS:
├── StrategyLoader     → dynamically load strategies
├── StrategyRunner     → execute on_tick / on_bar
├── IndicatorEngine    → TA-Lib calculations
├── SignalAggregator   → combine multi-strategy votes
├── BacktestModule     → test strategies on history
└── PerformanceTracker → track strategy metrics

GOLD MONITOR DEEP LOGIC:
├── Price feed:    XAUUSD tick from Data Service
├── Macro inputs:  DXY, US10Y yield, VIX
├── Indicators:    ATR(14), RSI(14), BB(20),
│                  VWAP, EMA(20,50,200)
├── Session filter: London + NY open hours only
├── Correlation:   DXY inverse, yield inverse
├── Entry logic:   5-factor confluence required
├── Exit logic:    ATR trailing stop or target hit
└── Signal output: BUY/SELL + stop + target prices

SCALING PATH:
Now:   2 strategies, Python single process
Scale: 100 strategies, parallel workers per strategy
       Add ML strategies (FinRL, LSTM)
       Add Rust execution core for ultra-low latency

Service 3: Order Manager (OMS)
PURPOSE:
The only service that places real orders with brokers.
Receives signals, validates with Risk Engine,
sizes positions, routes to correct broker/account.

INPUTS:
├── Signals from Strategy Engine (via Redis)
├── Risk approvals from Risk Engine
├── Account info from Account Manager
└── Manual orders from Dashboard

OUTPUTS:
├── Orders → Broker Connector Layer
├── Order updates → Redis pub/sub
├── Order records → PostgreSQL
└── Fill notifications → Portfolio Tracker

INTERNAL COMPONENTS:
├── SignalConsumer     → subscribe to signal channel
├── PositionSizer      → calculate lot size
│   ├── Fixed fractional (risk % of equity)
│   ├── Kelly Criterion (optimal sizing)
│   └── Volatility adjusted (ATR-based)
├── SmartRouter        → select best broker
│   ├── Compare spreads across connected brokers
│   ├── Check recent fill quality per broker
│   └── Check margin availability
├── OrderBuilder       → construct order object
├── OrderStateManager  → track PENDING→FILLED→CLOSED
├── FillProcessor      → handle partial fills
└── SlippageTracker    → measure actual vs expected

ORDER STATE MACHINE:
CREATED
  → RISK_CHECK (sent to Risk Engine)
    → REJECTED (risk check failed)
    → APPROVED
      → SUBMITTED (sent to broker)
        → PENDING (waiting fill)
          → FILLED (execution confirmed)
            → OPEN (position now tracked)
              → CLOSING (exit signal received)
                → CLOSED (position closed)
          → PARTIAL_FILL (partial execution)
          → REJECTED (broker rejected)
          → TIMEOUT (no fill in time window)

SCALING PATH:
Now:   Sequential processing, 5 orders/sec
Scale: Async parallel, 10,000 orders/sec
       Smart routing across 20 brokers
       FPGA order execution (ultra-high frequency)

Service 4: Risk Engine
PURPOSE:
Guardian of all capital. Every order MUST pass
through Risk Engine before execution. Cannot be
bypassed by any other service.

INPUTS:
├── Order requests from OMS
├── Position updates from Portfolio Tracker
├── Account balances from Account Manager
└── Market data from Data Service

OUTPUTS:
├── APPROVE / REJECT per order request
├── Risk alerts → Alert Service
├── Kill switch commands → OMS
└── Risk reports → PostgreSQL

RISK RULES HIERARCHY:
Level 1 - Hard Limits (never override):
├── Max loss per trade: 2% of account equity
├── Max daily loss: 5% of account equity
├── Max drawdown from peak: 15%
├── Max margin utilization: 50%
└── Max position size: $100,000 notional

Level 2 - Soft Limits (configurable):
├── Max open positions: 10 per account
├── Max same-direction trades: 3
├── Max exposure per symbol: 5% portfolio
├── Max sector exposure: 20% portfolio
└── Time-based: no new trades last 30min of session

Level 3 - Dynamic Rules (market-condition based):
├── Reduce size when volatility > 2x normal (VIX)
├── No trades during news blackout window
├── Tighten stops when spread widens > 3x
└── Pause strategy after 3 consecutive losses

KILL SWITCH CASCADE:
Trigger conditions:
├── Daily loss > 5%     → Pause all strategies
├── Daily loss > 8%     → Close all positions
├── Broker disconnect   → Cancel pending orders
├── System error        → Emergency close all
└── Manual trigger      → Immediate full stop

SCALING PATH:
Now:   Rule-based, Python, per-order checks
Scale: Real-time VaR, Monte Carlo simulation,
       ML-based anomaly detection,
       Regulatory capital calculations

Service 5: Account Manager
PURPOSE:
Manages all trading accounts across all brokers.
Handles trade copying, lot scaling, group management.

INPUTS:
├── Account updates from Broker Connectors
├── Fill confirmations from OMS
└── Configuration from Dashboard

OUTPUTS:
├── Account info → all services that need it
├── Scaled copy orders → OMS
└── Account snapshots → PostgreSQL (daily)

ACCOUNT GROUPS (configurable):
├── Group A: Gold Trading
│   └── Accounts: ACC001, ACC002, ACC003
│       Strategy: GOLD_TIMING_V1
│       Risk per trade: 1%
│
├── Group B: Stock Momentum
│   └── Accounts: ACC004, ACC005
│       Strategy: STOCK_MOMENTUM_V1
│       Risk per trade: 1.5%
│
└── Master Account: ACC_MASTER
    └── Followers: All groups
        Copy ratio: Proportional to equity

TRADE COPIER LOGIC:
Master places 1.0 lot on XAUUSD BUY
    → Follower ACC001 equity = 50% of master
    → Follower gets 0.5 lot XAUUSD BUY
    → Follower ACC002 equity = 25% of master
    → Follower gets 0.25 lot XAUUSD BUY
    (All placed simultaneously within 50ms)

SCALING PATH:
Now:   10 accounts, manual group config
Scale: 1000 accounts, dynamic group assignment,
       White-label multi-user platform,
       Investor portal with PAMM/MAM support

Service 6: Portfolio Tracker
PURPOSE:
Real-time aggregated view of all positions,
P&L, performance metrics across all accounts.

INPUTS:
├── Fill confirmations from OMS
├── Price ticks from Data Service
└── Account updates from Account Manager

OUTPUTS:
├── Real-time P&L → Redis (for dashboard)
├── Performance metrics → PostgreSQL
├── Daily reports → Alert Service
└── Risk exposure → Risk Engine

METRICS CALCULATED:
Real-time:
├── Unrealized P&L per position
├── Unrealized P&L per account
├── Unrealized P&L per strategy
├── Total portfolio exposure
└── Margin used / available

Historical:
├── Realized P&L (daily/weekly/monthly)
├── Sharpe Ratio (rolling 30-day)
├── Sortino Ratio
├── Maximum Drawdown
├── Win Rate per strategy
├── Average R:R per strategy
├── Profit Factor
└── Calmar Ratio

SCALING PATH:
Now:   Simple P&L calculation, 10 accounts
Scale: Full attribution analysis,
       Multi-currency NAV calculation,
       Investor-grade performance reporting,
       Tax lot accounting

Service 7: Alert Service
PURPOSE:
Unified notification hub. All alerts from all
services flow here and get dispatched to the
right channels.

ALERT TYPES & ROUTING:
├── Trade Executed     → Telegram + Email
├── Strategy Signal    → Telegram
├── Risk Breach        → Telegram + SMS + Email
├── Kill Switch        → SMS + Telegram + Email
├── Daily P&L Summary  → Email + Telegram
├── System Error       → SMS + PagerDuty
├── Broker Disconnect  → SMS + Telegram
└── New High/Drawdown  → Telegram + Email

TELEGRAM BOT MESSAGES:
✅ BUY XAUUSD @ 2350.50
   Account: ACC001 | Size: 0.5 lot
   SL: 2340.00 | TP: 2370.00
   Strategy: GOLD_TIMING_V1

⚠️ RISK ALERT: Daily loss 4.8%
   Account: ACC002 | Approaching limit (5%)
   Open positions: 3 | Unrealized: -$240

🔴 KILL SWITCH ACTIVATED
   Account: ACC003 | Daily loss: 5.2%
   All positions closed. Trading paused.
   Resume tomorrow 00:00 UTC

SCALING PATH:
Now:   Telegram + Email
Scale: Add SMS, WhatsApp, Slack, Discord,
       Push notifications, Webhook integrations

1.3 TECHNOLOGY STACK
Best Fit — Minimum Now, Maximum at Scale

COMPLETE TECH STACK DECISION MATRIX
COMPONENT          NOW (MIN)              SCALE (MAX)
══════════════════════════════════════════════════════════

LANGUAGE
Strategy Logic     Python 3.11            Python + Rust core
Execution Layer    Python asyncio         Rust / C++ (HFT)
API Gateway        Python FastAPI         Go (higher perf)
Frontend           React.js               React.js (same)
Database Scripts   SQL + Python           Same

WHY PYTHON NOW:
├── Fastest development speed
├── Best ecosystem for quant finance
├── TA-Lib, pandas, numpy, scikit-learn
├── MT5, IB, ccxt all have Python libraries
└── Easy to hire / onboard developers

WHY RUST/C++ LATER:
├── 10-100x faster execution than Python
├── Sub-millisecond order placement
├── Direct FIX protocol implementation
└── Required for true HFT latency targets

BACKEND SERVICES
python# FRAMEWORK: FastAPI
# Why: Fastest Python web framework
#      Native async support
#      Auto API documentation
#      Best WebSocket support
#      Scales to 50,000 req/sec

# NOW - Install:
pip install fastapi uvicorn websockets
pip install sqlalchemy asyncpg alembic
pip install redis aioredis
pip install pydantic python-jose

# SCALE: Add:
# - Multiple uvicorn workers
# - Gunicorn process manager
# - Nginx load balancer in front
# - Horizontal scaling via Kubernetes

# SERVICE COMMUNICATION: gRPC (scale)
# Why gRPC over REST for inter-service:
# - 7x faster than REST/JSON
# - Strongly typed contracts
# - Native streaming support
# - Better for high-frequency internal calls

# NOW: REST/Redis for simplicity
# SCALE: gRPC for service-to-service

MESSAGE BUS
yamlNOW - Redis Pub/Sub:
  Why:
    - Zero additional infrastructure
    - Already using Redis for cache
    - Sufficient for < 10,000 msg/sec
    - Simple to implement and debug

  Limitations:
    - No message persistence
    - No consumer groups
    - No replay capability

  Install: redis:7-alpine (Docker)

SCALE - Apache Kafka:
  Why:
    - Handles millions of messages/sec
    - Message persistence (replay ticks)
    - Consumer groups (parallel processing)
    - Exactly-once delivery guarantee
    - Industry standard for fintech

  Migrate when:
    - Tracking > 100 symbols
    - Running > 10 strategies
    - Need tick replay for backtesting
    - Processing > 10,000 msg/sec

  Deploy: Kafka + Zookeeper on Kubernetes
          or Confluent Cloud (managed)

MIGRATION PATH (Redis → Kafka):
  Step 1: Run both in parallel
  Step 2: Services write to both
  Step 3: Services read from Kafka
  Step 4: Remove Redis pub/sub
  (Redis stays for caching)

DATABASE LAYER
sql/* ═══════════════════════════════════════
   TIMESCALEDB — TICK DATA
   ═══════════════════════════════════════

   NOW:
   - Single TimescaleDB instance
   - 30-day retention
   - Handles 10 symbols, ~1M ticks/day

   SCALE:
   - TimescaleDB multi-node cluster
   - Unlimited retention with compression
   - 5000 symbols, ~1B ticks/day
   - Continuous aggregates for fast queries

   WHY TimescaleDB over plain Postgres:
   - 10-100x faster time-series queries
   - Automatic partitioning by time
   - Built-in compression (90%+ reduction)
   - Native time-series functions
*/

-- NOW setup:
CREATE TABLE ticks (
    time        TIMESTAMPTZ NOT NULL,
    symbol      TEXT NOT NULL,
    broker      TEXT NOT NULL,
    bid         DOUBLE PRECISION NOT NULL,
    ask         DOUBLE PRECISION NOT NULL,
    spread      DOUBLE PRECISION GENERATED ALWAYS AS (ask - bid) STORED,
    volume      DOUBLE PRECISION DEFAULT 0
);
SELECT create_hypertable('ticks', 'time',
    chunk_time_interval => INTERVAL '1 day');

-- Continuous aggregate for OHLCV (auto-updates)
CREATE MATERIALIZED VIEW ohlcv_1min
WITH (timescaledb.continuous) AS
SELECT
    time_bucket('1 minute', time) AS bucket,
    symbol,
    broker,
    FIRST(bid, time) AS open,
    MAX(bid) AS high,
    MIN(bid) AS low,
    LAST(bid, time) AS close,
    SUM(volume) AS volume
FROM ticks
GROUP BY bucket, symbol, broker;

-- Auto compression after 7 days
SELECT add_compression_policy('ticks',
    INTERVAL '7 days');

-- Auto retention (drop data older than 90 days)
-- SCALE: remove this, keep everything
SELECT add_retention_policy('ticks',
    INTERVAL '90 days');

/* ═══════════════════════════════════════
   POSTGRESQL — CORE BUSINESS DATA
   ═══════════════════════════════════════

   NOW:
   - Single Postgres instance
   - All business tables here

   SCALE:
   - Primary + Read Replicas
   - Connection pooling (PgBouncer)
   - Partitioning for orders table
*/

-- Full schema:

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Brokers
CREATE TABLE brokers (
    id          UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name        TEXT UNIQUE NOT NULL,
    type        TEXT NOT NULL, -- MT5, CTRADER, IB, FIX
    server      TEXT,
    is_active   BOOLEAN DEFAULT true,
    created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- Accounts
CREATE TABLE accounts (
    id              UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    broker_id       UUID REFERENCES brokers(id),
    account_number  TEXT NOT NULL,
    account_name    TEXT,
    currency        TEXT DEFAULT 'USD',
    balance         DECIMAL(20,8) DEFAULT 0,
    equity          DECIMAL(20,8) DEFAULT 0,
    margin_used     DECIMAL(20,8) DEFAULT 0,
    margin_free     DECIMAL(20,8) DEFAULT 0,
    group_name      TEXT,
    is_master       BOOLEAN DEFAULT false,
    is_active       BOOLEAN DEFAULT true,
    created_at      TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(broker_id, account_number)
);

-- Strategies
CREATE TABLE strategies (
    id              UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    strategy_id     TEXT UNIQUE NOT NULL,
    name            TEXT NOT NULL,
    description     TEXT,
    symbols         TEXT[],
    timeframes      TEXT[],
    parameters      JSONB,
    is_active       BOOLEAN DEFAULT false,
    created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- Account-Strategy mapping
CREATE TABLE account_strategies (
    account_id      UUID REFERENCES accounts(id),
    strategy_id     UUID REFERENCES strategies(id),
    risk_pct        DECIMAL(5,4) DEFAULT 0.01,
    max_positions   INTEGER DEFAULT 5,
    is_active       BOOLEAN DEFAULT true,
    PRIMARY KEY (account_id, strategy_id)
);

-- Orders (partitioned for scale)
CREATE TABLE orders (
    id              UUID DEFAULT uuid_generate_v4(),
    account_id      UUID REFERENCES accounts(id),
    broker_order_id TEXT,
    symbol          TEXT NOT NULL,
    order_type      TEXT NOT NULL, -- MARKET,LIMIT,STOP,STOP_LIMIT
    side            TEXT NOT NULL, -- BUY, SELL
    quantity        DECIMAL(20,8) NOT NULL,
    requested_price DECIMAL(20,8),
    fill_price      DECIMAL(20,8),
    slippage        DECIMAL(20,8),
    commission      DECIMAL(20,8),
    status          TEXT NOT NULL DEFAULT 'CREATED',
    strategy_id     TEXT,
    signal_id       UUID,
    stop_loss       DECIMAL(20,8),
    take_profit     DECIMAL(20,8),
    error_message   TEXT,
    created_at      TIMESTAMPTZ DEFAULT NOW(),
    submitted_at    TIMESTAMPTZ,
    filled_at       TIMESTAMPTZ,
    cancelled_at    TIMESTAMPTZ,
    PRIMARY KEY (id, created_at)
) PARTITION BY RANGE (created_at);

-- Create monthly partitions
CREATE TABLE orders_2026_01
    PARTITION OF orders
    FOR VALUES FROM ('2026-01-01') TO ('2026-02-01');

-- Positions
CREATE TABLE positions (
    id              UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    account_id      UUID REFERENCES accounts(id),
    symbol          TEXT NOT NULL,
    side            TEXT NOT NULL,
    quantity        DECIMAL(20,8) NOT NULL,
    entry_price     DECIMAL(20,8) NOT NULL,
    current_price   DECIMAL(20,8),
    stop_loss       DECIMAL(20,8),
    take_profit     DECIMAL(20,8),
    unrealized_pnl  DECIMAL(20,8) DEFAULT 0,
    realized_pnl    DECIMAL(20,8) DEFAULT 0,
    commission      DECIMAL(20,8) DEFAULT 0,
    swap            DECIMAL(20,8) DEFAULT 0,
    strategy_id     TEXT,
    opened_at       TIMESTAMPTZ DEFAULT NOW(),
    closed_at       TIMESTAMPTZ,
    is_open         BOOLEAN DEFAULT true
);

-- Daily snapshots for performance tracking
CREATE TABLE daily_snapshots (
    id              UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    account_id      UUID REFERENCES accounts(id),
    date            DATE NOT NULL,
    opening_balance DECIMAL(20,8),
    closing_balance DECIMAL(20,8),
    daily_pnl       DECIMAL(20,8),
    daily_pnl_pct   DECIMAL(10,6),
    trades_count    INTEGER DEFAULT 0,
    win_count       INTEGER DEFAULT 0,
    loss_count      INTEGER DEFAULT 0,
    max_drawdown    DECIMAL(10,6),
    UNIQUE(account_id, date)
);

-- Risk events log
CREATE TABLE risk_events (
    id              UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    account_id      UUID REFERENCES accounts(id),
    event_type      TEXT NOT NULL,
    rule_triggered  TEXT NOT NULL,
    current_value   DECIMAL(20,8),
    limit_value     DECIMAL(20,8),
    action_taken    TEXT,
    created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_orders_account_created ON orders(account_id, created_at DESC);
CREATE INDEX idx_orders_status ON orders(status) WHERE status IN ('PENDING','SUBMITTED');
CREATE INDEX idx_positions_account_open ON positions(account_id) WHERE is_open = true;
CREATE INDEX idx_positions_symbol ON positions(symbol) WHERE is_open = true;

REDIS CACHE STRUCTURE
KEY SCHEMA — PRODUCTION READY:

Price Data:
├── price:{symbol}:latest
│   Value: {bid, ask, spread, time}    TTL: 5 sec
│
├── price:{symbol}:book
│   Value: {bids[], asks[], depth}     TTL: 1 sec
│
└── price:{symbol}:history:1m
    Value: last 100 OHLCV bars         TTL: 10 min

Signals:
├── signal:{strategy_id}:{symbol}
│   Value: {side, price, sl, tp,
│           confidence, timestamp}     TTL: 60 sec

Account Data:
├── account:{id}:info
│   Value: {balance, equity,
│           margin_used, margin_free}  TTL: 5 sec
│
└── account:{id}:positions
    Value: [{symbol, side, qty, pnl}]  TTL: 5 sec

Risk:
├── risk:{account_id}:daily_pnl
│   Value: float                       TTL: EOD reset
│
└── risk:{account_id}:drawdown
    Value: float                       TTL: EOD reset

System:
├── system:status
│   Value: {all services health}       TTL: 10 sec
│
└── system:kill_switch:{account_id}
    Value: boolean                     TTL: none (manual reset)

Scanner:
└── scanner:top_stocks
    Value: [{symbol, score, reason}]   TTL: 5 min

BROKER CONNECTIVITY
python# NOW: Python libraries (fastest to implement)
# ─────────────────────────────────────────────
pip install MetaTrader5          # MT5 connector
pip install ib_insync            # Interactive Brokers
pip install ccxt                 # 100+ crypto exchanges
# cTrader: REST + WebSocket (no pip, use requests)
# FIX API: quickfix (pip install quickfix)

# SCALE: Add QuickFIX/n (C# for low latency)
# Or build custom Rust FIX engine

# CONNECTOR INTERFACE (same for all brokers):
class BaseBrokerConnector(ABC):

    # Connection
    @abstractmethod
    async def connect(self) -> bool: ...

    @abstractmethod
    async def disconnect(self): ...

    @abstractmethod
    async def is_connected(self) -> bool: ...

    # Market Data
    @abstractmethod
    async def subscribe_ticks(self,
        symbols: list[str],
        callback: Callable): ...

    @abstractmethod
    async def get_historical_data(self,
        symbol: str,
        timeframe: str,
        start: datetime,
        end: datetime) -> pd.DataFrame: ...

    # Trading
    @abstractmethod
    async def place_order(self,
        order: Order) -> OrderResult: ...

    @abstractmethod
    async def cancel_order(self,
        order_id: str) -> bool: ...

    @abstractmethod
    async def modify_order(self,
        order_id: str,
        sl: float = None,
        tp: float = None) -> bool: ...

    @abstractmethod
    async def close_position(self,
        position_id: str) -> bool: ...

    # Account
    @abstractmethod
    async def get_account_info(self) -> AccountInfo: ...

    @abstractmethod
    async def get_positions(self) -> list[Position]: ...

    @abstractmethod
    async def get_orders(self) -> list[Order]: ...

1.4 DATA FLOWS
Best Fit — Complete Flow Design

FLOW 1: TICK → INDICATOR → SIGNAL → ORDER
STEP 1: TICK ARRIVES (< 1ms)
Broker feed → BrokerConnector
    Receive: raw tick {symbol, bid, ask, volume, time}
    Normalize: standard format
    Validate: reject if spread > 3x normal
    Publish: Redis channel "ticks.XAUUSD"

STEP 2: DATA SERVICE PROCESSES (< 2ms)
Subscribes to "ticks.XAUUSD"
    Store: write to TimescaleDB (async, non-blocking)
    Update: Redis price cache
    Build bars: if bar complete, publish "bars.XAUUSD.1m"
    Publish: confirmed to "data.XAUUSD.processed"

STEP 3: STRATEGY ENGINE REACTS (< 5ms)
Subscribes to "data.XAUUSD.processed"
    Update: indicator values (ATR, RSI, BB, EMA)
    Evaluate: all entry/exit conditions
    If signal: publish to "signals.GOLD_TIMING_V1"
    Signal format: {
        strategy_id: "GOLD_TIMING_V1",
        symbol:       "XAUUSD",
        side:         "BUY",
        confidence:   0.85,
        entry_price:  2350.50,
        stop_loss:    2340.00,
        take_profit:  2375.00,
        reason:       "RSI oversold + DXY falling + London open",
        timestamp:    "2026-05-01T09:01:23.456Z",
        expiry:       "2026-05-01T09:06:23.456Z"
    }

STEP 4: ORDER MANAGER RECEIVES (< 3ms)
Subscribes to "signals.*"
    Check: signal not expired
    Route: to account group for this strategy
    For each account in group:
        → calculate position size
        → check with Risk Engine
        → if approved: build and place order

STEP 5: RISK ENGINE CHECK (< 2ms)
Synchronous check (blocking — must complete):
    ✓ Daily loss < 5%?
    ✓ Margin available?
    ✓ Max positions not reached?
    ✓ Correlation limits OK?
    ✓ Position size within limits?
    → APPROVE or REJECT with reason

STEP 6: ORDER PLACED (< 10ms via broker API)
BrokerConnector.place_order(order)
    → Broker receives order
    → Execution confirmation returned
    → Fill price, slippage recorded
    → PostgreSQL order record updated
    → Position opened in tracker
    → Dashboard updated via WebSocket
    → Telegram notification sent

TOTAL LATENCY TARGET:
    Now (Python):   50–200ms end-to-end
    Scale (Rust):   1–10ms end-to-end

FLOW 2: GOLD MONITOR — DEEP ANALYSIS
CONTINUOUS MONITORING LOOP (every tick):

┌─────────────────────────────────────────┐
│           GOLD MONITOR INPUTS           │
│                                         │
│  XAUUSD tick feed (real-time)           │
│  DXY (US Dollar Index) — every 1 min   │
│  US 10Y Yield — every 1 min            │
│  VIX (volatility) — every 5 min        │
│  Gold futures (COMEX) — every 1 min    │
└─────────────────┬───────────────────────┘
                  │
┌─────────────────▼───────────────────────┐
│         INDICATOR CALCULATIONS          │
│                                         │
│  Price indicators (from XAUUSD ticks):  │
│  ├── ATR(14) — volatility measure       │
│  ├── RSI(14) — momentum oscillator      │
│  ├── BB(20,2) — mean reversion bands    │
│  ├── EMA(20) — short trend              │
│  ├── EMA(50) — medium trend             │
│  ├── EMA(200) — long trend              │
│  └── VWAP — institutional price level  │
│                                         │
│  Macro indicators:                      │
│  ├── DXY direction (1H trend)           │
│  ├── Yield direction (1H trend)         │
│  └── VIX level (risk-on/off)           │
└─────────────────┬───────────────────────┘
                  │
┌─────────────────▼───────────────────────┐
│           ENTRY CONDITIONS              │
│                                         │
│  BUY conditions (need 4 of 5):         │
│  ├── RSI < 35 (oversold)               │
│  ├── Price at/below lower BB            │
│  ├── DXY trending DOWN (1H)            │
│  ├── EMA20 > EMA50 (uptrend)           │
│  └── London or NY session active        │
│                                         │
│  SELL conditions (need 4 of 5):        │
│  ├── RSI > 65 (overbought)             │
│  ├── Price at/above upper BB            │
│  ├── DXY trending UP (1H)              │
│  ├── EMA20 < EMA50 (downtrend)         │
│  └── London or NY session active        │
└─────────────────┬───────────────────────┘
                  │
┌─────────────────▼───────────────────────┐
│        EXIT CONDITIONS                  │
│                                         │
│  Take Profit:                           │
│  ├── Primary TP: 2x ATR from entry     │
│  └── Trailing stop: 1x ATR             │
│                                         │
│  Stop Loss:                             │
│  ├── Hard stop: 1.5x ATR from entry    │
│  └── Time stop: close if open > 4H     │
│                                         │
│  Force close:                           │
│  └── 30 min before NY close            │
└─────────────────────────────────────────┘

FLOW 3: STOCK SCANNER — RANKING SYSTEM
SCANNER RUNS EVERY 5 MINUTES:

Input: Universe of stocks (start with 100, scale to 5000)

SCORING ALGORITHM:
Each stock gets a score 0–100:

Score = (
    momentum_score  * 0.30 +   # 30% weight
    volume_score    * 0.25 +   # 25% weight
    trend_score     * 0.25 +   # 25% weight
    volatility_score* 0.10 +   # 10% weight
    sector_score    * 0.10     # 10% weight
)

MOMENTUM SCORE (0–100):
├── ROC(20) — rate of change over 20 days
├── RSI(14) between 50-65 = bullish momentum
└── Price vs 52-week high proximity

VOLUME SCORE (0–100):
├── Current volume vs 20-day average
├── Volume increasing = higher score
└── Dark pool activity (scale feature)

TREND SCORE (0–100):
├── Price > EMA20 > EMA50 > EMA200 = 100
├── Partial alignment = proportional score
└── ADX > 25 = trending, adds to score

VOLATILITY SCORE (0–100):
├── ATR% in sweet spot (not too high/low)
├── BB width expanding = opportunity
└── Historical vol vs implied vol

OUTPUT — TOP 10 STOCKS:
[
  {rank: 1, symbol: "NVDA", score: 87.5,
   reasons: ["momentum breakout",
             "volume surge 3x avg",
             "above all EMAs"]},
  {rank: 2, symbol: "AAPL", score: 82.1,
   reasons: ["trend alignment",
             "RSI bullish zone"]},
  ...
]
→ Stored in Redis: scanner:top_stocks (TTL: 5min)
→ Dashboard updated via WebSocket
→ Strategy Engine picks top 3 for execution

FLOW 4: MULTI-ACCOUNT TRADE COPY
MASTER ACCOUNT places order:
    XAUUSD BUY 1.00 lot @ 2350.50

ACCOUNT MANAGER receives fill confirmation:
    Master equity: $100,000
    Fill: 1.00 lot

COPY CALCULATION per follower:
    ACC001: $50,000 equity → 0.50 lot
    ACC002: $25,000 equity → 0.25 lot
    ACC003: $10,000 equity → 0.10 lot
    ACC004: $15,000 equity → 0.15 lot

PARALLEL PLACEMENT (all simultaneous):
    asyncio.gather(
        place_order(ACC001, 0.50 lot),
        place_order(ACC002, 0.25 lot),
        place_order(ACC003, 0.10 lot),
        place_order(ACC004, 0.15 lot)
    )
    → All orders submitted within 50ms of master fill

RISK CHECK per follower BEFORE copy:
    ├── Check follower daily loss limit
    ├── Check follower margin availability
    ├── Check follower max positions
    └── Skip follower if any check fails

COPY LATENCY TARGET:
    Now:   50–100ms after master fill
    Scale: 5–20ms after master fill

SUMMARY: BEST FIT DECISIONS
DECISION              CHOICE NOW          REASON
═══════════════════════════════════════════════════════
Language              Python 3.11         Speed of dev,
                                          best ecosystem
Framework             FastAPI             Fastest Python,
                                          native async
Message Bus           Redis Pub/Sub       Already in stack,
                                          sufficient now
Database (ticks)      TimescaleDB         Purpose-built,
                                          10x faster than PG
Database (business)   PostgreSQL          ACID, reliable,
                                          scales well
Cache                 Redis               Industry standard
Indicators            TA-Lib + pandas-ta  Best coverage,
                                          C speed
Backtesting           QuantConnect LEAN   Institutional grade,
                                          open source
MT5 Connection        MetaTrader5 Python  Official library
IB Connection         ib_insync           Best Python IB lib
Crypto Connection     ccxt                100+ exchanges
Dashboard Phase 1     Streamlit           1 day to build
Dashboard Phase 2     React.js            Production grade
Charts                TradingView Lib     Professional grade
Containers            Docker Compose      Simple, reliable
Monitoring            Grafana+Prometheus  Industry standard
Alerts                Telegram Bot        Free, instant,
                                          mobile-native

WHEN TO UPGRADE:
Redis → Kafka         When > 10,000 msg/sec
Python → Rust         When latency < 10ms required
Streamlit → React     After core platform works
Docker → Kubernetes   When scaling > 1 server
Single DB → Cluster   When data > 500GB

The most important principle: Get everything working in Python with Redis and Docker Compose first. A working platform in 10 weeks beats a theoretically perfect platform in 2 years. Every component above is designed to be replaced independently as you scale — you never need to rebuild the whole system.
