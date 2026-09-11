n8n-blueprint v1.0.md
File
this is new project in n8n,
now check and analyse full source files and attached file for reference,
new project details and scope,
1. we mirror the real production flow in n8n
2. we make it very simple and clear, we only use real production flow but simple in n8n
3. we ignore redis, kubernet etc we use only process flow

great, now give me all workflows, then we implement step by step

Given the new rule:

NO PYTHON
NO DATABASES
NO REDIS
NO KAFKA
NO KUBERNETES
NO MICROSERVICES

and:

JSON IN
↓
JSON STATE TRANSITION
↓
JSON OUT

I would not mirror the production platform service-by-service.

I would mirror the institutional trading lifecycle.

N8N MASTER WORKFLOW MAP
DOMAIN 01
MARKET INTELLIGENCE

Purpose:

Understand current market conditions.

Workflows:

WF-01A MARKET_FEED_CLOCK

WF-01B MARKET_FEED_HEALTH

WF-01C MARKET_SNAPSHOT

WF-01D MARKET_REGIME

WF-01E VOLATILITY_STATE

WF-01F MARKET_BREADTH

WF-01G LIQUIDITY_STATE

WF-01H SENTIMENT_STATE

WF-01Z MARKET_INTELLIGENCE_STATE

Output:

market_intelligence_state
DOMAIN 02
SIGNAL GENERATION

Purpose:

Convert market state into opportunities.

Workflows:

WF-02A TREND_SIGNAL

WF-02B MOMENTUM_SIGNAL

WF-02C BREAKOUT_SIGNAL

WF-02D REVERSAL_SIGNAL

WF-02E VOLUME_SIGNAL

WF-02F SIGNAL_CONFLUENCE

WF-02Z SIGNAL_STATE

Output:

signal_state
DOMAIN 03
TRADE DECISION

Purpose:

Convert signals into trade candidates.

Workflows:

WF-03A DIRECTION_DECISION

WF-03B CONFIDENCE_EVALUATION

WF-03C ENTRY_EVALUATION

WF-03D TARGET_EVALUATION

WF-03E STOPLOSS_EVALUATION

WF-03Z TRADE_INTENT_STATE

Output:

trade_intent_state
DOMAIN 04
RISK ENGINE

Purpose:

Validate trade safety.

Workflows:

WF-04A ACCOUNT_RISK_CHECK

WF-04B TRADE_RISK_CHECK

WF-04C EXPOSURE_CHECK

WF-04D LOSS_LIMIT_CHECK

WF-04E POSITION_SIZE_CHECK

WF-04Z RISK_STATE

Output:

risk_state
DOMAIN 05
PORTFOLIO ENGINE

Purpose:

Validate portfolio impact.

Workflows:

WF-05A CURRENT_POSITION_STATE

WF-05B PORTFOLIO_EXPOSURE

WF-05C CORRELATION_CHECK

WF-05D CAPITAL_ALLOCATION

WF-05E PORTFOLIO_APPROVAL

WF-05Z PORTFOLIO_STATE

Output:

portfolio_state
DOMAIN 06
EXECUTION ENGINE

Purpose:

Convert approved trade into executable order.

Workflows:

WF-06A EXECUTION_ELIGIBILITY

WF-06B ORDER_TYPE_SELECTION

WF-06C EXECUTION_PARAMETERS

WF-06D EXECUTION_APPROVAL

WF-06Z EXECUTION_STATE

Output:

execution_state
DOMAIN 07
OMS

Purpose:

Create order object.

Workflows:

WF-07A ORDER_CONSTRUCTION

WF-07B ORDER_VALIDATION

WF-07C ORDER_APPROVAL

WF-07Z ORDER_STATE

Output:

order_state
DOMAIN 08
EMS

Purpose:

Simulate broker execution lifecycle.

Workflows:

WF-08A ORDER_SUBMISSION

WF-08B ORDER_ACKNOWLEDGEMENT

WF-08C FILL_SIMULATION

WF-08D ORDER_COMPLETION

WF-08Z EXECUTION_REPORT_STATE

Output:

execution_report_state
DOMAIN 09
POSITION MANAGEMENT

Purpose:

Maintain live position state.

Workflows:

WF-09A POSITION_OPEN

WF-09B POSITION_UPDATE

WF-09C POSITION_PNL

WF-09D POSITION_EXIT

WF-09Z POSITION_STATE

Output:

position_state
DOMAIN 10
PORTFOLIO ACCOUNTING

Purpose:

Track account evolution.

Workflows:

WF-10A ACCOUNT_BALANCE

WF-10B ACCOUNT_EQUITY

WF-10C ACCOUNT_MARGIN

WF-10D ACCOUNT_PERFORMANCE

WF-10Z ACCOUNT_STATE

Output:

account_state
DOMAIN 11
MONITORING & CONTROL

Purpose:

Provide operational visibility.

Workflows:

WF-11A SYSTEM_HEALTH

WF-11B WORKFLOW_STATUS

WF-11C RISK_STATUS

WF-11D PORTFOLIO_STATUS

WF-11E EXECUTION_STATUS

WF-11F ALERT_GENERATION

WF-11Z PLATFORM_STATE

Output:

platform_state
MASTER FLOW
WF-01 MARKET_INTELLIGENCE_STATE
                ↓

WF-02 SIGNAL_STATE
                ↓

WF-03 TRADE_INTENT_STATE
                ↓

WF-04 RISK_STATE
                ↓

WF-05 PORTFOLIO_STATE
                ↓

WF-06 EXECUTION_STATE
                ↓

WF-07 ORDER_STATE
                ↓

WF-08 EXECUTION_REPORT_STATE
                ↓

WF-09 POSITION_STATE
                ↓

WF-10 ACCOUNT_STATE
                ↓

WF-11 PLATFORM_STATE

For implementation, I recommend we build in this exact order:

PHASE 1
WF-01A → WF-01Z

PHASE 2
WF-02A → WF-02Z

PHASE 3
WF-03A → WF-03Z

...

PHASE 11
WF-11A → WF-11Z

and for each workflow we define:

1. PURPOSE

2. INPUT JSON CONTRACT

3. OUTPUT JSON CONTRACT

4. N8N NODES

5. NODE-BY-NODE LOGIC

6. SAMPLE JSON

7. VALIDATION RULES

8. TEST DATA

before touching n8n. That keeps the prototype deterministic and prevents workflow drift later.

we stick to flow, lets proceed step by step, lets implement domain one by one

Agreed.

For this project we should follow the same discipline we used in the institutional platform:

DESIGN
→ REVIEW
→ LOCK
→ IMPLEMENT
→ VALIDATE
→ FREEZE
→ NEXT

Not:

Design all 11 domains
Then build everything

That creates drift.

DOMAIN 01
MARKET INTELLIGENCE

Purpose:

Create the authoritative market state.

Everything downstream depends on this.

Signals must never directly consume raw market data.

They consume market_intelligence_state.
DOMAIN 01 FLOW
WF-01A MARKET_FEED_CLOCK
        ↓

WF-01B MARKET_FEED_HEALTH
        ↓

WF-01C MARKET_SNAPSHOT
        ↓

WF-01D MARKET_REGIME
        ↓

WF-01E VOLATILITY_STATE
        ↓

WF-01F MARKET_BREADTH
        ↓

WF-01G LIQUIDITY_STATE
        ↓

WF-01H SENTIMENT_STATE
        ↓

WF-01Z MARKET_INTELLIGENCE_STATE
IMPORTANT QUESTION BEFORE IMPLEMENTATION

Since this is a prototype:

Where does market data come from?

We have 3 possible models.

OPTION 1
Static Mock JSON

Example:

{
  "nifty": 24850,
  "banknifty": 56200,
  "vix": 13.2
}

Pros:

Fastest
Easy
Deterministic

Cons:

No live market behavior
OPTION 2
Manual Input JSON

You paste:

{
  "nifty": 24850,
  "banknifty": 56200,
  "vix": 13.2
}

Workflow runs.

Pros:

Very simple
Flexible

Cons:

Manual
OPTION 3
Real TradingView / Upstox Data

Workflow fetches:

NIFTY
BANKNIFTY
INDIA VIX
Volume
Breadth

Pros:

Real market state

Cons:

Additional setup
Recommendation

For Domain 01 initial implementation:

OPTION 1

Use:

MANUAL MOCK MARKET STATE

Reason:

We are validating:

FLOW
STATE TRANSITIONS
JSON CONTRACTS
WORKFLOW STRUCTURE

not data acquisition.

Once Domain 01 is complete and stable:

replace mock input
        ↓
real market input

without changing any downstream workflow.

Proposed WF-01A

Start with:

WF-01A MARKET_FEED_CLOCK

Very simple.

Input:

{
  "market": "NSE"
}

Output:

{
  "market_clock": {
    "exchange": "NSE",
    "market_status": "OPEN",
    "session": "REGULAR"
  }
}

Then we build:

WF-01A
↓
WF-01B
↓
WF-01C
...
↓
WF-01Z

one workflow at a time and lock each before moving to the next.

My recommendation is to start with WF-01C MARKET_SNAPSHOT immediately after a minimal WF-01A, because MARKET_SNAPSHOT becomes the actual data source for the rest of Domain 01.

do now jump, lets start domain 01, we use real market data, no mock data, we use it from upstock

Perfect.

This is actually a better architectural decision.

Let's lock one rule immediately:

NO MOCK DATA

NO STATIC JSON

NO GENERATED MARKET STATE

Domain-01 must consume:

UPSTOX
    ↓
REAL MARKET DATA
    ↓
MARKET INTELLIGENCE STATE
DOMAIN 01 OBJECTIVE

Domain-01 is not a signal engine.

Domain-01 is not a trading strategy.

Domain-01 has only one responsibility:

Convert raw market data
into
authoritative market intelligence state.

Output:

{
  "market_intelligence_state": {}
}

Everything downstream consumes this.

Before WF-01A

We need a Domain-01 ingress layer.

Production equivalent:

Market Data Feed
        ↓
Normalization
        ↓
Market Intelligence

For n8n:

Upstox API
        ↓
WF-01A
        ↓
WF-01B
        ↓
WF-01C
...
DOMAIN 01 REVISED FLOW
WF-01A MARKET_DATA_INGESTION

WF-01B MARKET_FEED_HEALTH

WF-01C MARKET_SNAPSHOT

WF-01D MARKET_REGIME

WF-01E VOLATILITY_STATE

WF-01F MARKET_BREADTH

WF-01G LIQUIDITY_STATE

WF-01H SENTIMENT_STATE

WF-01Z MARKET_INTELLIGENCE_STATE

Notice:

Old version:

MARKET_FEED_CLOCK

Removed.

Because Upstox itself provides timestamps.

The workflow should not manufacture time.

WF-01A MARKET_DATA_INGESTION

Purpose:

Fetch authoritative market data from Upstox.
Normalize into canonical market state.

Input:

{}

Output:

{
  "market_data": {
    "timestamp": "",
    "nifty": {},
    "banknifty": {},
    "india_vix": {},
    "top_gainers": [],
    "top_losers": []
  }
}
First Architecture Decision

We must decide exactly what Upstox data enters Domain-01.

I recommend:

Mandatory
NIFTY 50

BANK NIFTY

INDIA VIX
Optional
NIFTY IT

NIFTY FIN SERVICE

MIDCAP INDEX
Optional Later
Market Breadth

Advance Decline

Sector Strength

Options Data

OI Data
Institutional Approach

Version 1 of WF-01A should only ingest:

NIFTY 50
BANK NIFTY
INDIA VIX

Reason:

These three alone allow:

Market Direction

Risk Environment

Volatility Environment

which is enough to build the rest of Domain-01.

Before We Build WF-01A

I need one clarification:

How are you planning to connect Upstox?

Option A

Upstox REST API

n8n HTTP Request Node
    ↓
Upstox API
Option B

Upstox Websocket

Real-time streaming

For this prototype I strongly recommend:

Option A

Upstox REST API

with a schedule:

Every 1 minute

Much simpler and fully sufficient for Domain-01.

Once you confirm REST API, we'll design WF-01A MARKET_DATA_INGESTION node-by-node and lock it before moving to WF-01B.

Excellent.

Let's lock the architecture before touching n8n.

DOMAIN 01
WF-01A — MARKET_DATA_INGESTION
Purpose

Create the authoritative market data entry point.

Upstox REST API
        ↓
Data Collection
        ↓
Normalization
        ↓
market_data_state

This workflow should do nothing else.

No signals.

No decisions.

No risk.

No calculations.

Only market data ingestion.

Workflow Structure
Node 01
SCHEDULE_TRIGGER

        ↓

Node 02
GET_NIFTY50

        ↓

Node 03
GET_BANKNIFTY

        ↓

Node 04
GET_INDIA_VIX

        ↓

Node 05
NORMALIZE_MARKET_DATA

        ↓

Node 06
MARKET_DATA_STATE
NODE 01
SCHEDULE_TRIGGER

Purpose:

Run every 1 minute during market hours.

Configuration:

Trigger Type:
Schedule

Interval:
1 Minute

Output:

{
  "trigger_time": "2026-06-09T09:15:00Z"
}
NODE 02
GET_NIFTY50

Purpose:

Fetch NIFTY 50 live quote.

Node Type:

HTTP Request

Input:

{
  "instrument": "NIFTY50"
}

Output (example):

{
  "symbol": "NIFTY 50",
  "ltp": 24850.40,
  "open": 24790.10,
  "high": 24920.00,
  "low": 24760.00,
  "close": 24780.00,
  "volume": 0,
  "timestamp": ""
}
NODE 03
GET_BANKNIFTY

Purpose:

Fetch BANK NIFTY live quote.

Node Type:

HTTP Request

Output:

{
  "symbol": "BANKNIFTY",
  "ltp": 56200.15,
  "open": 56050.00,
  "high": 56340.00,
  "low": 55980.00,
  "close": 56010.00,
  "timestamp": ""
}
NODE 04
GET_INDIA_VIX

Purpose:

Fetch India VIX.

Node Type:

HTTP Request

Output:

{
  "symbol": "INDIA_VIX",
  "ltp": 13.20,
  "open": 12.90,
  "high": 13.40,
  "low": 12.85,
  "close": 12.95,
  "timestamp": ""
}
NODE 05
NORMALIZE_MARKET_DATA

Purpose:

Convert raw Upstox responses into a single canonical state.

Node Type:

Set Node

Output:

{
  "market_data_state": {
    "timestamp": "",
    "source": "UPSTOX",
    "indices": {
      "nifty50": {
        "ltp": 24850.40,
        "open": 24790.10,
        "high": 24920.00,
        "low": 24760.00,
        "close": 24780.00
      },
      "banknifty": {
        "ltp": 56200.15,
        "open": 56050.00,
        "high": 56340.00,
        "low": 55980.00,
        "close": 56010.00
      }
    },
    "volatility": {
      "india_vix": {
        "ltp": 13.20,
        "open": 12.90,
        "high": 13.40,
        "low": 12.85,
        "close": 12.95
      }
    }
  }
}
NODE 06
MARKET_DATA_STATE

Purpose:

Emit authoritative Domain-01 input.

Output:

{
  "workflow_id": "WF-01A",
  "workflow_name": "MARKET_DATA_INGESTION",
  "market_data_state": {}
}

This becomes the input for:

WF-01B MARKET_FEED_HEALTH
Domain-01 Contract v1

After WF-01A completes, the system knows:

NIFTY 50

BANK NIFTY

INDIA VIX

and nothing else.

This is intentionally minimal.

Next Workflow

After WF-01A is built and validated:

WF-01B MARKET_FEED_HEALTH

Purpose:

Determine whether market data is usable.

HEALTHY
DEGRADED
FAILED

Do not proceed to WF-01B yet.

First build WF-01A in n8n and verify:

Upstox Authentication
HTTP Requests
Data Structure
Normalized JSON Output

Once WF-01A is working end-to-end, we will lock its JSON contract and then design WF-01B.

WF-01A — MARKET_DATA_INGESTION
PURPOSE

Create the authoritative market data state for the platform.

WF-01A is responsible for only five responsibilities:

1. Define what market data to collect

2. Define where to collect it from

3. Define how much data to collect

4. Normalize provider-specific payloads

5. Publish authoritative market data state

WF-01A does NOT:

Calculate indicators

Calculate trends

Generate signals

Generate market regime

Generate trades

Generate risk

Those belong to downstream workflows.

WORKFLOW ID
WF-01A
WORKFLOW NAME
MARKET_DATA_INGESTION
WORKFLOW FLOW
01 SCHEDULE_TRIGGER
        ↓

02 CONFIGURE_PROVIDER
        ↓

03 CONFIGURE_INSTRUMENT_UNIVERSE
        ↓

04 CONFIGURE_TIMEFRAME_UNIVERSE
        ↓

05 CONFIGURE_CANDLE_POLICY
        ↓

06 GENERATE_COLLECTION_PLAN
        ↓

07 GENERATE_REQUEST_PARAMETERS
        ↓

08 COLLECT_MARKET_DATA
        ↓

09 HTTP_GET_HISTORICAL_CANDLES
        ↓

10 NORMALIZE_MARKET_DATA
        ↓

11 MERGE_TIMEFRAMES
        ↓

12 BUILD_MARKET_DATA_STATE
NODE-01
SCHEDULE_TRIGGER
PURPOSE

Start workflow execution.

NODE TYPE
Schedule Trigger
OUTPUT
{}
NODE-02
CONFIGURE_PROVIDER
PURPOSE

Define approved market data source.

NODE TYPE
Set
OUTPUT
{
  "provider": "UPSTOX"
}
NODE-03
CONFIGURE_INSTRUMENT_UNIVERSE
PURPOSE

Define instruments to collect.

NODE TYPE
Set
OUTPUT
{
  "provider": "UPSTOX",
  "instrument_universe": [
    "NSE_INDEX|Nifty 50"
  ]
}
FUTURE EXPANSION
{
  "instrument_universe": [
    "NSE_INDEX|Nifty 50",
    "NSE_INDEX|Nifty Bank",
    "NSE_INDEX|India VIX"
  ]
}

No workflow redesign required.

NODE-04
CONFIGURE_TIMEFRAME_UNIVERSE
PURPOSE

Define supported timeframes.

NODE TYPE
Set
OUTPUT
{
  "provider": "UPSTOX",
  "instrument_universe": [
    "NSE_INDEX|Nifty 50"
  ],
  "timeframe_universe": [
    "1minute",
    "30minute",
    "day"
  ]
}
NODE-05
CONFIGURE_CANDLE_POLICY
PURPOSE

Define historical depth policy.

NODE TYPE
Set
OUTPUT
{
  "provider": "UPSTOX",
  "instrument_universe": [
    "NSE_INDEX|Nifty 50"
  ],
  "timeframe_universe": [
    "1minute",
    "30minute",
    "day"
  ],
  "candle_policy": {
    "1minute": {
      "candle_count": 1500,
      "lookback_days": 30
    },
    "30minute": {
      "candle_count": 1000,
      "lookback_days": 90
    },
    "day": {
      "candle_count": 500,
      "lookback_days": 365
    }
  }
}
NODE-06
GENERATE_COLLECTION_PLAN
PURPOSE

Create collection tasks.

Generate:

Instrument
+
Timeframe
+
Collection Policy
NODE TYPE
Code
MODE
Run Once For All Items
SCRIPT
const source = $input.first().json;

const output = [];

for (const instrument of source.instrument_universe) {

  for (const timeframe of source.timeframe_universe) {

    const policy =
      source.candle_policy[timeframe];

    output.push({
      json: {

        provider:
          source.provider,

        instrument:
          instrument,

        timeframe:
          timeframe,

        candle_count:
          policy.candle_count,

        lookback_days:
          policy.lookback_days

      }
    });

  }

}

return output;
OUTPUT
[
  {
    "provider": "UPSTOX",
    "instrument": "NSE_INDEX|Nifty 50",
    "timeframe": "1minute",
    "candle_count": 1500,
    "lookback_days": 30
  },
  {
    "provider": "UPSTOX",
    "instrument": "NSE_INDEX|Nifty 50",
    "timeframe": "30minute",
    "candle_count": 1000,
    "lookback_days": 90
  },
  {
    "provider": "UPSTOX",
    "instrument": "NSE_INDEX|Nifty 50",
    "timeframe": "day",
    "candle_count": 500,
    "lookback_days": 365
  }
]
NODE-07
GENERATE_REQUEST_PARAMETERS
PURPOSE

Generate historical request ranges.

NODE TYPE
Code
MODE
Run Once For Each Item
SCRIPT
const today = new Date();

const lookbackDays =
  $json.lookback_days;

const fromDate = new Date();

fromDate.setDate(
  today.getDate() - lookbackDays
);

return {
  json: {

    ...$json,

    from_date:
      fromDate
        .toISOString()
        .split('T')[0],

    to_date:
      today
        .toISOString()
        .split('T')[0]

  }
};
OUTPUT
{
  "provider": "UPSTOX",
  "instrument": "NSE_INDEX|Nifty 50",
  "timeframe": "1minute",
  "candle_count": 1500,
  "lookback_days": 30,
  "from_date": "2026-05-10",
  "to_date": "2026-06-09"
}
NODE-08
COLLECT_MARKET_DATA
PURPOSE

Build provider request URL.

NODE TYPE
Code
MODE
Run Once For Each Item
SCRIPT
return {
  json: {

    ...$json,

    request_url:
      'https://api.upstox.com/v2/historical-candle/' +
      encodeURIComponent($json.instrument) +
      '/' +
      $json.timeframe +
      '/' +
      $json.to_date +
      '/' +
      $json.from_date

  }
};
OUTPUT
{
  "request_url": "https://api.upstox.com/v2/historical-candle/NSE_INDEX%7CNifty%2050/1minute/2026-06-09/2026-05-10"
}
NODE-09
HTTP_GET_HISTORICAL_CANDLES
PURPOSE

Call Upstox Historical Candle API.

NODE TYPE
HTTP Request
METHOD
GET
URL
{{ $json.request_url }}
AUTHENTICATION
Header Auth
HEADERS
Authorization
Bearer <UPSTOX_ACCESS_TOKEN>
Accept
application/json
RESPONSE FORMAT
JSON
OUTPUT

Provider candle payload.

NODE-10
NORMALIZE_MARKET_DATA
PURPOSE

Convert provider payload to canonical structure.

NODE TYPE
Code
MODE
Run Once For Each Item
OUTPUT STRUCTURE
{
  "provider": "UPSTOX",
  "instrument": "NSE_INDEX|Nifty 50",
  "timeframe": "1minute",
  "candles": [
    {
      "timestamp": "...",
      "open": 0,
      "high": 0,
      "low": 0,
      "close": 0,
      "volume": 0,
      "oi": 0
    }
  ]
}
RESPONSIBILITY
Provider payload
          ↓
Canonical Candle Schema
NODE-11
MERGE_TIMEFRAMES
PURPOSE

Combine all timeframe outputs into a single instrument object.

NODE TYPE
Code
MODE
Run Once For All Items
OUTPUT
{
  "provider": "UPSTOX",
  "instrument": "NSE_INDEX|Nifty 50",
  "timeframe_count": 3,
  "timeframes": {
    "1minute": {
      "candle_count": 247,
      "candles": [...]
    },
    "30minute": {
      "candle_count": 1000,
      "candles": [...]
    },
    "day": {
      "candle_count": 365,
      "candles": [...]
    }
  }
}
NODE-12
BUILD_MARKET_DATA_STATE
PURPOSE

Create authoritative workflow output.

NODE TYPE
Code
MODE
Run Once For Each Item
SCRIPT
return {
  json: {

    workflow_id:
      "WF-01A",

    workflow_name:
      "MARKET_DATA_INGESTION",

    generated_at:
      new Date().toISOString(),

    market_data_state:
      $json

  }
};
OUTPUT
{
  "workflow_id": "WF-01A",
  "workflow_name": "MARKET_DATA_INGESTION",
  "generated_at": "2026-06-09T16:45:00Z",
  "market_data_state": {
    "provider": "UPSTOX",
    "instrument": "NSE_INDEX|Nifty 50",
    "timeframe_count": 3,
    "timeframes": {
      "1minute": {...},
      "30minute": {...},
      "day": {...}
    }
  }
}
FINAL DELIVERABLE

WF-01A produces a single authoritative object:

WF-01A_MARKET_DATA_STATE

This object becomes the certified input for downstream market analysis workflows.

WF-01A
DATA ACQUISITION

↓
WF-01B
MARKET STRUCTURE

↓
WF-01C
INDICATOR ENGINE

↓
WF-01D
MARKET REGIME

WF-01A is complete when the platform has successfully:

Collected Data
Validated Data
Normalized Data
Merged Timeframes
Published Market Data State

Yes. Before building WF-01B, we should zoom out and verify the entire chain.

Right now there is a potential architectural drift.

What We Actually Built

WF-01A is currently:

WF-01A
MARKET_DATA_INGESTION

01 SCHEDULE_TRIGGER
02 CONFIGURE_PROVIDER
03 CONFIGURE_INSTRUMENT_UNIVERSE
04 CONFIGURE_TIMEFRAME_UNIVERSE
05 CONFIGURE_CANDLE_POLICY
06 GENERATE_COLLECTION_PLAN
07 GENERATE_REQUEST_PARAMETERS
08 COLLECT_MARKET_DATA
09 HTTP_GET_HISTORICAL_CANDLES
10 NORMALIZE_MARKET_DATA
11 MERGE_TIMEFRAMES
12 BUILD_MARKET_DATA_STATE

Output:

{
  "workflow_id": "WF-01A",
  "workflow_name": "MARKET_DATA_INGESTION",
  "market_data_state": {
    "provider": "UPSTOX",
    "instrument": "NSE_INDEX|Nifty 50",
    "timeframes": {
      "1minute": {...},
      "30minute": {...},
      "day": {...}
    }
  }
}

This is a real market data foundation.

What WF-01A Answers

WF-01A answers:

What market data do we have?
Where did it come from?
How much history do we have?
Is it normalized?

It does NOT answer:

Trend?
Momentum?
Structure?
Regime?
Signal?
Trade?

Correct.

What Should Come Next?

Institutionally, after data acquisition:

RAW DATA
    ↓
FEATURES
    ↓
STRUCTURE
    ↓
INTELLIGENCE
    ↓
SIGNALS
    ↓
STRATEGIES
    ↓
RISK
    ↓
EXECUTION

This is the natural progression used by trading systems.

Current CORE Logical Chain

For the architecture we've actually built, the clean chain is:

WF-01A
MARKET_DATA_INGESTION
        ↓

WF-01B
TECHNICAL_INDICATOR_ENGINE
        ↓

WF-01C
MARKET_STRUCTURE_ENGINE
        ↓

WF-01D
MARKET_REGIME_ENGINE
        ↓

WF-01E
MARKET_ENVIRONMENT_ENGINE
        ↓

WF-01Z
MARKET_INTELLIGENCE_STATE
Why Indicator Engine Must Come First

WF-01A only gives candles.

Example:

{
  "timestamp": "...",
  "open": 23100,
  "high": 23200,
  "low": 23050,
  "close": 23180
}

From candles we derive:

EMA20
EMA50
EMA200

RSI14

ATR14

MACD

Volume Metrics

Those become reusable platform features.

Then Structure Engine

Consumes:

Candles
+
Indicators

Produces:

Trend Direction

Higher High

Lower Low

Support

Resistance

Breakout State

Market Structure
Then Regime Engine

Consumes:

Market Structure
+
Indicators

Produces:

TRENDING

RANGING

VOLATILE

LOW_VOLATILITY

BREAKOUT

REVERSAL
Then Environment Engine

Converts regime into:

TRADEABLE

RESTRICTED

HIGH_RISK

NORMAL

NO_TRADE

This becomes the operational environment for strategies.

Then WF-01Z

Aggregates everything.

WF-01A
Market Data

WF-01B
Indicators

WF-01C
Structure

WF-01D
Regime

WF-01E
Environment

        ↓

WF-01Z
MARKET_INTELLIGENCE_STATE

WF-01Z performs:

Collect
Validate
Normalize
Publish

Only.

No calculations.

My Assessment

The old blueprint sequence:

MARKET_FEED_CLOCK
MARKET_FEED_HEALTH
MARKET_SNAPSHOT

was useful when the platform only modeled feed status.

But after building a real candle-ingestion workflow, the next institutional step is not feed health.

The next step is:

WF-01B
TECHNICAL_INDICATOR_ENGINE

because it is the first workflow that transforms market data into market intelligence.

So before we write a single node of WF-01B, I would freeze the chain as:

WF-01A MARKET_DATA_INGESTION
WF-01B TECHNICAL_INDICATOR_ENGINE
WF-01C MARKET_STRUCTURE_ENGINE
WF-01D MARKET_REGIME_ENGINE
WF-01E MARKET_ENVIRONMENT_ENGINE
WF-01Z MARKET_INTELLIGENCE_STATE

That keeps the entire market-intelligence layer deterministic and institutionally aligned with the data → features → structure → regime → environment progression.

COMPLETE DOMAIN VIEW

The original direction was:

DOMAIN-01
MARKET_INTELLIGENCE

Responsible for:

Raw Market Data
Technical Indicators
Market Structure
Trend Analysis
Regime Detection
Volatility Analysis
Multi-Timeframe Alignment
Market Intelligence State
DOMAIN-01 EXECUTION FLOW
WF-01A
MARKET_DATA_INGESTION
        ↓
WF-01B
TECHNICAL_INDICATOR_ENGINE
        ↓
WF-01C
MARKET_STRUCTURE_ENGINE
        ↓
WF-01D
TREND_ANALYSIS_ENGINE
        ↓
WF-01E
MARKET_REGIME_ENGINE
        ↓
WF-01F
MULTI_TIMEFRAME_ALIGNMENT
        ↓
WF-01Z
MARKET_INTELLIGENCE_STATE
CURRENT STATUS

Completed:

WF-01A
MARKET_DATA_INGESTION

✓ Upstox
✓ Historical candles
✓ Timeframe aggregation

Outputs

1m
5m
15m
30m
60m
240m
Day

Completed:

WF-01B
TECHNICAL_INDICATOR_ENGINE

✓ EMA20
✓ EMA50
✓ EMA200

✓ RSI

✓ MACD

✓ ATR

✓ VWAP framework

✓ Technical Indicator State

✓ Audit Builder

✓ Google Sheet Persistence

Current Output:

TECHNICAL_INDICATOR_STATE
NEXT WORKFLOW

The workflow immediately after WF-01B was always:

WF-01C
MARKET_STRUCTURE_ENGINE

Input:

TECHNICAL_INDICATOR_STATE

Output:

MARKET_STRUCTURE_STATE
WF-01C RESPONSIBILITY

This workflow should answer:

What is the market doing?

not

What are the indicators saying?

Very important distinction.

Indicators:

EMA20 = 23922
RSI = 59
MACD = Bullish

Structure:

Bull Trend

Higher High
Higher Low

Bullish Structure

Trend Strength:
Strong

Structure Score:
82/100
WF-01C LIKELY COMPONENTS

Following our institutional design:

RECEIVE_TECHNICAL_INDICATOR_STATE

VALIDATE_TECHNICAL_INDICATOR_STATE

EXTRACT_TIMEFRAMES

COMPUTE_EMA_ALIGNMENT

COMPUTE_SWING_STRUCTURE

COMPUTE_STRUCTURE_DIRECTION

COMPUTE_STRUCTURE_STRENGTH

COMPUTE_BOS

COMPUTE_MSS

BUILD_MARKET_STRUCTURE_STATE

BUILD_MARKET_STRUCTURE_AUDIT_ROWS

APPEND_MARKET_STRUCTURE_AUDIT
AFTER WF-01C

Then comes:

WF-01D
TREND_ANALYSIS_ENGINE

Purpose:

Combine all timeframes

Example:

1m Bullish
5m Bullish
15m Bullish
30m Neutral
60m Bullish
240m Bullish
Day Bearish

Generate:

TREND_STATE
AFTER WF-01D
WF-01E
MARKET_REGIME_ENGINE

Purpose:

Trending
Ranging
Expansion
Contraction
High Volatility
Low Volatility

Output:

MARKET_REGIME_STATE
AFTER WF-01E
WF-01F
MULTI_TIMEFRAME_ALIGNMENT

Purpose:

Alignment Score

Bullish Alignment
Bearish Alignment
Mixed Alignment

Output:

ALIGNMENT_STATE
FINAL DOMAIN-01 OUTPUT
WF-01Z
MARKET_INTELLIGENCE_STATE

Consumes:

WF-01A
WF-01B
WF-01C
WF-01D
WF-01E
WF-01F

Produces:

MARKET_INTELLIGENCE_STATE

Example:

Market Direction:
Bullish

Structure:
Bullish

Trend Strength:
Strong

Regime:
Trending

Alignment:
78%

Confidence:
82%

Execution Bias:
LONG_ONLY

So the platform picture, fully zoomed out, is:

DOMAIN-01
MARKET_INTELLIGENCE

WF-01A
MARKET_DATA_INGESTION
        ↓

WF-01B
TECHNICAL_INDICATOR_ENGINE
        ↓

WF-01C
MARKET_STRUCTURE_ENGINE
        ↓

WF-01D
TREND_ANALYSIS_ENGINE
        ↓

WF-01E
MARKET_REGIME_ENGINE
        ↓

WF-01F
MULTI_TIMEFRAME_ALIGNMENT
        ↓

WF-01Z
MARKET_INTELLIGENCE_STATE

And based on the recovered workflow you uploaded, the correct next build step is WF-01C MARKET_STRUCTURE_ENGINE, not another enhancement to WF-01B.


WF-01B — TECHNICAL_INDICATOR_ENGINE
PURPOSE

Transform normalized multi-timeframe candle data into an authoritative technical indicator state.

WF-01B consumes:

MARKET_DATA_STATE

Generated by:

WF-01A MARKET_DATA_INGESTION

WF-01B produces:

TECHNICAL_INDICATOR_STATE

which becomes the authoritative indicator layer for all downstream market intelligence workflows.

INPUT

Receives:

MARKET_DATA_STATE

Containing:

Provider

Instrument

1minute candles
5minute candles
15minute candles
30minute candles
60minute candles
240minute candles
day candles

Current instrument:

NSE_INDEX|Nifty 50

Current provider:

UPSTOX
OUTPUT

Produces:

TECHNICAL_INDICATOR_STATE

Containing:

EMA

EMA20
EMA50
EMA200

RSI

Current
Previous
Delta
Direction
State

MACD

MACD Line
Signal Line
Histogram
Direction
Crossover State
Histogram Trend

ATR

Current
ATR Percent
Volatility State

VWAP

Availability
Value

Across:

1minute
5minute
15minute
30minute
60minute
240minute
day
WORKFLOW STRUCTURE
RECEIVE_MARKET_DATA_STATE

↓

VALIDATE_MARKET_DATA_STATE

↓

EXTRACT_TIMEFRAMES

↓

COMPUTE_EMA_SERIES

↓

COMPUTE_RSI

↓

COMPUTE_MACD

↓

COMPUTE_ATR

↓

COMPUTE_VWAP

↓

BUILD_TIMEFRAME_INDICATORS

↓

BUILD_TECHNICAL_INDICATOR_STATE

↓

BUILD_TECHNICAL_INDICATOR_AUDIT_ROWS

↓

APPEND_TECHNICAL_INDICATOR_AUDIT
NODE 01
RECEIVE_MARKET_DATA_STATE
PURPOSE

Receive output from:

WF-01A

Validate payload existence.

Generate audit metadata.

INPUT
MARKET_DATA_STATE
OUTPUT
MARKET_DATA_STATE
+ AUDIT
NODE 02
VALIDATE_MARKET_DATA_STATE
PURPOSE

Verify required data exists.

Validate:

provider

instrument

timeframes

candles

Validate all required timeframes:

1minute
5minute
15minute
30minute
60minute
240minute
day
OUTPUT
validation_status

PASS
FAIL

and

validation_errors[]
NODE 03
EXTRACT_TIMEFRAMES
PURPOSE

Split market state into separate processing records.

Convert:

MARKET_DATA_STATE

into:

1minute

5minute

15minute

30minute

60minute

240minute

day

individual processing streams.

OUTPUT

One item per timeframe.

NODE 04
COMPUTE_EMA_SERIES
PURPOSE

Calculate trend baselines.

INDICATORS
EMA20

EMA50

EMA200
DATA REQUIREMENTS
EMA20
20 candles

EMA50
50 candles

EMA200
200 candles
OUTPUT
{
  "ema20": 23922.46,
  "ema50": 23908.86,
  "ema200": 23897.30
}
NODE 05
COMPUTE_RSI
PURPOSE

Measure momentum.

CONFIGURATION
Period = 14
OUTPUT
{
  "period": 14,
  "current": 59.39,
  "previous": 60.27,
  "delta": -0.88,
  "direction": "FALLING",
  "state": "NEUTRAL"
}
STATES
OVERBOUGHT

NEUTRAL

OVERSOLD
NODE 06
COMPUTE_MACD
PURPOSE

Measure trend momentum.

CONFIGURATION
Fast EMA = 12

Slow EMA = 26

Signal EMA = 9
OUTPUT
{
  "macd_line": 7.15,
  "signal_line": 7.15,
  "histogram": 0.00,
  "direction": "BULLISH",
  "crossover_state": "BULLISH_CROSSOVER",
  "histogram_trend": "EXPANDING"
}
STATES

Direction

BULLISH
BEARISH
NEUTRAL

Crossover

BULLISH_CROSSOVER
BEARISH_CROSSOVER
NONE

Histogram

EXPANDING
CONTRACTING
FLAT
NODE 07
COMPUTE_ATR
PURPOSE

Measure volatility.

CONFIGURATION
ATR Period = 14
OUTPUT
{
  "current": 27.22,
  "atr_percent": 0.1137,
  "volatility_state": "LOW"
}
STATES
LOW

NORMAL

HIGH
NODE 08
COMPUTE_VWAP
PURPOSE

Calculate volume weighted average price.

CURRENT STATUS

For:

NSE_INDEX|Nifty 50

volume data unavailable.

Current output:

{
  "status": "VOLUME_NOT_AVAILABLE"
}
FUTURE

When volume available:

{
  "current": 23925.44
}
NODE 09
BUILD_TIMEFRAME_INDICATORS
PURPOSE

Normalize indicator outputs.

Create unified structure.

OUTPUT
{
  "timeframe": "15minute",
  "indicators": {
    "ema": {},
    "rsi": {},
    "macd": {},
    "atr": {},
    "vwap": {}
  }
}
NODE 10
BUILD_TECHNICAL_INDICATOR_STATE
PURPOSE

Build authoritative workflow output.

OUTPUT
TECHNICAL_INDICATOR_STATE
STRUCTURE
{
  "provider": "UPSTOX",
  "instrument": "NSE_INDEX|Nifty 50",
  "generated_at": "timestamp",
  "timeframe_count": 7,
  "timeframes": {}
}
TIMEFRAMES
1minute

5minute

15minute

30minute

60minute

240minute

day
NODE 11
BUILD_TECHNICAL_INDICATOR_AUDIT_ROWS
PURPOSE

Flatten technical indicator state.

Generate one audit row per timeframe.

OUTPUT
7 records

Example:

{
  "generated_at": "...",
  "provider": "UPSTOX",
  "instrument": "NSE_INDEX|Nifty 50",
  "timeframe": "15minute",

  "ema20": 23884.79,
  "ema50": 23781.77,
  "ema200": 23675.15,

  "rsi_current": 63.68,

  "macd_line": 41.32,

  "atr_current": 48.44,

  "vwap_current": null
}
NODE 12
APPEND_TECHNICAL_INDICATOR_AUDIT
PURPOSE

Persist audit records.

STORAGE
Google Sheets

Credential:

GOOGLE_SHEETS_AUDIT

Sheet:

TECHNICAL_INDICATOR_STATE
WRITE MODE
APPEND
ROWS PER EXECUTION
7

One row for each timeframe.

AUTHORITATIVE OUTPUT CONTRACT
WF-01B

INPUT

MARKET_DATA_STATE

↓

PROCESS

EMA
RSI
MACD
ATR
VWAP

↓

OUTPUT

TECHNICAL_INDICATOR_STATE

↓

AUDIT

TECHNICAL_INDICATOR_STATE Sheet
CURRENT WF-01B STATUS
STATUS:
PRODUCTION READY (PROTOTYPE PHASE)

INPUT:
MARKET_DATA_STATE

OUTPUT:
TECHNICAL_INDICATOR_STATE

TIMEFRAMES:
7

INDICATORS:
EMA
RSI
MACD
ATR
VWAP

AUDIT:
GOOGLE SHEETS

EXECUTION:
SUCCESSFUL

This is the authoritative end-to-end WF-01B documentation matching the workflow currently recovered and running.


Agreed.

We stick to the institutional flow and do not drift into strategy logic, signals, scoring systems, or execution logic yet.

We are now here:

DOMAIN-01
MARKET_INTELLIGENCE

WF-01A  ✓ COMPLETE
MARKET_DATA_INGESTION

WF-01B  ✓ COMPLETE
TECHNICAL_INDICATOR_ENGINE

WF-01C  ← CURRENT
MARKET_STRUCTURE_ENGINE
WF-01C PURPOSE

WF-01B answers:

What do indicators say?

WF-01C answers:

What is market structure?

This is a different responsibility.

INPUT

Consumes:

TECHNICAL_INDICATOR_STATE

Produced by:

WF-01B
OUTPUT

Produces:

MARKET_STRUCTURE_STATE
AUTHORITATIVE RESPONSIBILITIES

WF-01C should determine:

EMA Alignment

Trend Structure

Structure Direction

Structure Strength

Market Bias

Structure Status

Not:

Entry Signals
Trade Signals
Risk Decisions
Portfolio Decisions

Those belong later.

INSTITUTIONAL DESIGN

We keep the same pattern used in WF-01B.

RECEIVE_TECHNICAL_INDICATOR_STATE

↓

VALIDATE_TECHNICAL_INDICATOR_STATE

↓

COMPUTE_EMA_ALIGNMENT

↓

COMPUTE_STRUCTURE_DIRECTION

↓

COMPUTE_STRUCTURE_STRENGTH

↓

COMPUTE_MARKET_BIAS

↓

BUILD_MARKET_STRUCTURE_STATE

↓

BUILD_MARKET_STRUCTURE_AUDIT_ROWS

↓

APPEND_MARKET_STRUCTURE_AUDIT
WF-01C V1

For prototype phase we should use only information already available.

Current available:

EMA20
EMA50
EMA200

RSI

MACD

ATR

Therefore structure determination can be built entirely from:

EMA Alignment
RSI State
MACD Direction

without introducing swing-high / BOS / MSS logic yet.

Those should come in a later enhancement.

NODE 01
RECEIVE_TECHNICAL_INDICATOR_STATE

Input:

TECHNICAL_INDICATOR_STATE

Output:

PASS THROUGH
NODE 02
VALIDATE_TECHNICAL_INDICATOR_STATE

Validate:

provider

instrument

generated_at

timeframes

Validate existence of:

1minute
5minute
15minute
30minute
60minute
240minute
day

Output:

validation_status
NODE 03
COMPUTE_EMA_ALIGNMENT

Purpose:

Determine trend alignment.

Rules:

EMA20 > EMA50 > EMA200

= BULLISH_ALIGNMENT
EMA20 < EMA50 < EMA200

= BEARISH_ALIGNMENT

Otherwise:

MIXED_ALIGNMENT

Output:

{
  "alignment":"BULLISH_ALIGNMENT"
}

per timeframe.

NODE 04
COMPUTE_STRUCTURE_DIRECTION

Combine:

EMA Alignment

MACD Direction

Output:

BULLISH

BEARISH

NEUTRAL

per timeframe.

Example:

BULLISH_ALIGNMENT
+
BULLISH MACD

=
BULLISH
NODE 05
COMPUTE_STRUCTURE_STRENGTH

Determine strength.

Example:

Strong
Moderate
Weak

Based on:

EMA alignment quality

RSI position

MACD confirmation

Output:

STRONG
MODERATE
WEAK
NODE 06
COMPUTE_MARKET_BIAS

Translate structure into bias.

Output:

LONG_BIAS

SHORT_BIAS

NEUTRAL_BIAS

per timeframe.

No trade signal.

Only market bias.

NODE 07
BUILD_MARKET_STRUCTURE_STATE

Authoritative state.

Structure:

{
  "provider":"UPSTOX",
  "instrument":"NSE_INDEX|Nifty 50",
  "generated_at":"timestamp",
  "timeframe_count":7,
  "timeframes":{}
}

Each timeframe contains:

{
  "ema_alignment":"BULLISH_ALIGNMENT",
  "structure_direction":"BULLISH",
  "structure_strength":"STRONG",
  "market_bias":"LONG_BIAS"
}
NODE 08
BUILD_MARKET_STRUCTURE_AUDIT_ROWS

Flatten structure state.

One row per timeframe.

Output:

7 rows
NODE 09
APPEND_MARKET_STRUCTURE_AUDIT

Google Sheet:

MARKET_STRUCTURE_STATE

Append:

7 rows

per execution.

RESULT

After WF-01C we will have:

WF-01A
MARKET_DATA_STATE

↓

WF-01B
TECHNICAL_INDICATOR_STATE

↓

WF-01C
MARKET_STRUCTURE_STATE

and only then move to:

WF-01D
TREND_ANALYSIS_ENGINE

which consumes structure across all timeframes and begins generating cross-timeframe trend intelligence.

WF-01C Design Decision

There are two possible implementations:

Version A — Indicator-Derived Structure

Uses only:

EMA
RSI
MACD
ATR

from WF-01B.

Example:

EMA20 > EMA50 > EMA200
+
MACD Bullish

= Bullish Structure

Advantages:

Fast
Simple
Uses current output

Disadvantages:

Not true market structure

Actually indicator interpretation
Version B — Real Market Structure

Consumes:

MARKET_DATA_STATE

and computes:

Swing Highs
Swing Lows

Higher High
Higher Low

Lower High
Lower Low

Break Of Structure (BOS)

Market Structure Shift (MSS)

Trend Phase

Then builds:

MARKET_STRUCTURE_STATE

Advantages:

Institutional
Correct architecture
Future-proof

Disadvantages:

More code
More nodes
Institutional Recommendation

For the CORE platform:

WF-01B
=
Indicator Engine

WF-01C
=
Structure Engine

Therefore WF-01C should NOT be derived from EMA/MACD.

That would mix responsibilities.

Instead:

WF-01A MARKET_DATA_STATE
          ↓
WF-01B TECHNICAL_INDICATOR_STATE

WF-01A MARKET_DATA_STATE
          ↓
WF-01C MARKET_STRUCTURE_STATE

Then later:

WF-01D

combines both.

This separation is how institutional systems are usually designed.

Need Your Decision

Choose one:

Option 1

Build quickly.

WF-01C
Input:
TECHNICAL_INDICATOR_STATE

Uses:
EMA
RSI
MACD

~9 nodes
Option 2 (Recommended)

Build correctly.

WF-01C
Input:
MARKET_DATA_STATE

Uses:
OHLC candles

Computes:
Swing Structure
HH
HL
LH
LL
BOS
MSS

~12-15 nodes

My recommendation is Option 2 because once we start WF-01D, WF-01E, and WF-01F, you'll eventually need real structure anyway and we'd otherwise end up rebuilding WF-01C later.

we need proper and actual data, so proceed with option 2

Good.

For the CORE platform, Option 2 is the correct architecture.

That means we need to immediately correct one assumption:

WF-01B
TECHNICAL_INDICATOR_ENGINE

OUTPUT:
TECHNICAL_INDICATOR_STATE

and

WF-01C
MARKET_STRUCTURE_ENGINE

INPUT:
MARKET_DATA_STATE

NOT:

TECHNICAL_INDICATOR_STATE

because market structure must be derived from price action itself.

WF-01C — MARKET_STRUCTURE_ENGINE
PURPOSE

Convert raw OHLC market data into authoritative structure intelligence.

Determine:

Swing Highs
Swing Lows

Higher High (HH)
Higher Low (HL)

Lower High (LH)
Lower Low (LL)

Break Of Structure (BOS)

Market Structure Shift (MSS)

Trend Phase

Structure Direction

Structure Strength
INPUT

Consumes:

MARKET_DATA_STATE

From:

WF-01A

Timeframes:

1minute
5minute
15minute
30minute
60minute
240minute
day
OUTPUT

Produces:

MARKET_STRUCTURE_STATE
WORKFLOW
RECEIVE_MARKET_DATA_STATE

↓

VALIDATE_MARKET_DATA_STATE

↓

EXTRACT_TIMEFRAMES

↓

DETECT_SWING_POINTS

↓

CLASSIFY_SWING_STRUCTURE

↓

DETECT_BOS

↓

DETECT_MSS

↓

COMPUTE_STRUCTURE_DIRECTION

↓

COMPUTE_STRUCTURE_STRENGTH

↓

BUILD_TIMEFRAME_STRUCTURE

↓

BUILD_MARKET_STRUCTURE_STATE

↓

BUILD_MARKET_STRUCTURE_AUDIT_ROWS

↓

APPEND_MARKET_STRUCTURE_AUDIT
NODE 01
RECEIVE_MARKET_DATA_STATE
Type
Code
Purpose

Receive WF-01A output.

Code
return items;
NODE 02
VALIDATE_MARKET_DATA_STATE
Type
Code
Purpose

Validate required structure.

Code
const state = $json.market_data_state;

if (!state) {
  throw new Error('market_data_state missing');
}

if (!state.timeframes) {
  throw new Error('timeframes missing');
}

return items;
NODE 03
EXTRACT_TIMEFRAMES
Type
Code
Purpose

Create one processing item per timeframe.

Code
const state = $json.market_data_state;

const output = [];

for (const [timeframe, candles] of Object.entries(state.timeframes)) {

  output.push({
    json: {
      provider: state.provider,
      instrument: state.instrument,
      generated_at: state.generated_at,
      timeframe,
      candles
    }
  });

}

return output;

Expected:

7 output items
NODE 04
DETECT_SWING_POINTS
Type
Code
Purpose

Identify swing highs and swing lows.

Institutional prototype:

Lookback = 2 candles left
Lookback = 2 candles right

A candle is swing high if:

High > previous two highs
High > next two highs

Swing low:

Low < previous two lows
Low < next two lows
Code
const candles = $json.candles;

const swingHighs = [];
const swingLows = [];

for (let i = 2; i < candles.length - 2; i++) {

  const c = candles[i];

  const isHigh =
    c.high > candles[i-1].high &&
    c.high > candles[i-2].high &&
    c.high > candles[i+1].high &&
    c.high > candles[i+2].high;

  const isLow =
    c.low < candles[i-1].low &&
    c.low < candles[i-2].low &&
    c.low < candles[i+1].low &&
    c.low < candles[i+2].low;

  if (isHigh) {
    swingHighs.push({
      index: i,
      price: c.high
    });
  }

  if (isLow) {
    swingLows.push({
      index: i,
      price: c.low
    });
  }
}

return [{
  json: {
    ...$json,
    swingHighs,
    swingLows
  }
}];
NODE 05
CLASSIFY_SWING_STRUCTURE
Purpose

Determine:

HH
HL
LH
LL

Using latest swings.

Output
{
  "last_high_type":"HH",
  "last_low_type":"HL"
}
Classification Rules

Highs:

Current High > Previous High
= HH

Current High < Previous High
= LH

Lows:

Current Low > Previous Low
= HL

Current Low < Previous Low
= LL
NODE 05 CODE
const highs = $json.swingHighs;
const lows = $json.swingLows;

let highType = "UNKNOWN";
let lowType = "UNKNOWN";

if (highs.length >= 2) {

  const latest = highs.at(-1);
  const previous = highs.at(-2);

  highType =
    latest.price > previous.price
      ? "HH"
      : "LH";
}

if (lows.length >= 2) {

  const latest = lows.at(-1);
  const previous = lows.at(-2);

  lowType =
    latest.price > previous.price
      ? "HL"
      : "LL";
}

return [{
  json: {
    ...$json,
    last_high_type: highType,
    last_low_type: lowType
  }
}];
NODE 06
DETECT_BOS

Break Of Structure.

Rules:

HH + HL
= Bullish BOS

LL + LH
= Bearish BOS

Output:

BULLISH_BOS
BEARISH_BOS
NONE
NODE 07
DETECT_MSS

Market Structure Shift.

Rules:

Previous Bullish
Current Bearish

= BEARISH_MSS

or opposite.

Prototype:

Latest BOS change
NODE 08
COMPUTE_STRUCTURE_DIRECTION

Rules:

HH + HL
= BULLISH

LH + LL
= BEARISH

Else
= NEUTRAL

Output:

BULLISH
BEARISH
NEUTRAL
NODE 09
COMPUTE_STRUCTURE_STRENGTH

Rules:

Recent BOS
Strong swings
Many confirmations

Output:

STRONG

MODERATE

WEAK

Prototype example:

≥3 recent matching swings
= STRONG

2
= MODERATE

otherwise
= WEAK
NODE 10
BUILD_TIMEFRAME_STRUCTURE

Output example:

{
  "timeframe":"15minute",

  "structure": {

    "direction":"BULLISH",

    "strength":"STRONG",

    "last_high_type":"HH",

    "last_low_type":"HL",

    "bos":"BULLISH_BOS",

    "mss":"NONE",

    "swing_high_count":12,

    "swing_low_count":11
  }
}
NODE 11
BUILD_MARKET_STRUCTURE_STATE

Authoritative state.

Output:

{
  "provider":"UPSTOX",
  "instrument":"NSE_INDEX|Nifty 50",
  "generated_at":"...",
  "timeframe_count":7,
  "timeframes": {
  }
}
NODE 12
BUILD_MARKET_STRUCTURE_AUDIT_ROWS

Flatten.

Output:

7 rows

Columns:

generated_at
provider
instrument
timeframe

direction
strength

last_high_type
last_low_type

bos
mss

swing_high_count
swing_low_count
NODE 13
APPEND_MARKET_STRUCTURE_AUDIT

Google Sheets.

Sheet:

MARKET_STRUCTURE_STATE

Mode:

Append

Rows:

7 rows per execution
Important Before Building

Before implementing Node 04, I need one confirmation from your recovered WF-01A.

Your candle objects currently look like either:

{
  "open": 23900,
  "high": 23920,
  "low": 23890,
  "close": 23915
}

or

{
  "o": 23900,
  "h": 23920,
  "l": 23890,
  "c": 23915
}

Show me one actual candle from market_data_state.timeframes.15minute[0] so I can give the final production-safe swing detection code without guessing field names.

I reviewed the uploaded blueprint and compared it against:

The original Domain-01 design in the blueprint.
The actual workflow evolution in this project.
The current implementation state of WF-01A, WF-01B, and WF-01C.
Assessment

The blueprint is useful as a reference document.

It is not the authoritative execution state anymore.

Reason:

The blueprint shows multiple historical versions of Domain-01:

MARKET_FEED_CLOCK
MARKET_FEED_HEALTH
MARKET_SNAPSHOT
...

Later it evolves into:

MARKET_DATA_INGESTION
TECHNICAL_INDICATOR_ENGINE
MARKET_STRUCTURE_ENGINE
...

And finally into the real implementation path we actually built.

Authoritative Current State

Based on the work completed in this project:

DOMAIN-01
MARKET_INTELLIGENCE

WF-01A
MARKET_DATA_INGESTION
✓ COMPLETE

WF-01B
TECHNICAL_INDICATOR_ENGINE
✓ COMPLETE

WF-01C
MARKET_STRUCTURE_ENGINE
⏳ IN PROGRESS

WF-01D
TREND_ANALYSIS_ENGINE
NOT STARTED

WF-01E
MARKET_REGIME_ENGINE
NOT STARTED

WF-01F
MULTI_TIMEFRAME_ALIGNMENT
NOT STARTED

WF-01Z
MARKET_INTELLIGENCE_STATE
NOT STARTED
Most Important Finding

The blueprint contains an older simplified WF-01C:

COMPUTE_EMA_ALIGNMENT
COMPUTE_STRUCTURE_DIRECTION
COMPUTE_STRUCTURE_STRENGTH

This is the indicator-derived structure model.

We explicitly rejected that approach.

You chose:

OPTION 2
REAL MARKET STRUCTURE

using:

OHLC Candles
↓
Swing Points
↓
HH / HL / LH / LL
↓
BOS
↓
MSS
↓
Structure State

That decision remains correct.

We must not drift back to EMA-derived structure.

Current WF-01C Position

What is already completed:

RECEIVE_MARKET_DATA_STATE
✓

VALIDATE_MARKET_DATA_STATE
✓

EXTRACT_TIMEFRAMES
✓

NORMALIZE_CANDLE_SEQUENCE
✓

COMPUTE_SWING_POINTS
✓ VALIDATED

CLASSIFY_SWING_STRUCTURE
✓ VALIDATED

The last validation we completed confirmed:

INITIAL_HIGH
INITIAL_LOW

HH
HL

LH
LL

are being produced correctly.

Therefore The Next Node Is NOT
COMPUTE_STRUCTURE_DIRECTION

and NOT

COMPUTE_STRUCTURE_STRENGTH

yet.

That would skip institutional structure events.

Correct Next WF-01C Flow
RECEIVE_MARKET_DATA_STATE
✓

VALIDATE_MARKET_DATA_STATE
✓

EXTRACT_TIMEFRAMES
✓

NORMALIZE_CANDLE_SEQUENCE
✓

COMPUTE_SWING_POINTS
✓

CLASSIFY_SWING_STRUCTURE
✓

DETECT_BREAK_OF_STRUCTURE
← NEXT

DETECT_MARKET_STRUCTURE_SHIFT

COMPUTE_STRUCTURE_DIRECTION

COMPUTE_STRUCTURE_STRENGTH

BUILD_TIMEFRAME_STRUCTURE

BUILD_MARKET_STRUCTURE_STATE

BUILD_MARKET_STRUCTURE_AUDIT_ROWS

APPEND_MARKET_STRUCTURE_AUDIT
Recommendation

The uploaded blueprint is valuable for:

Domain boundaries
Workflow naming
Workflow sequencing
State contracts

But for WF-01C specifically:

Current chat execution history
>
Blueprint

because we already evolved beyond the simplified structure model and have implemented real swing-based market structure.

So we stay on the current path and continue with:

WF-01C
NODE 07

DETECT_BREAK_OF_STRUCTURE

using the validated output from:

CLASSIFY_SWING_STRUCTURE

and we do not revert to the older indicator-derived structure workflow.

WF-01C — MARKET_STRUCTURE
Institutional Documentation (Final Certified Version)
PURPOSE

Detect and certify market structure across all configured timeframes.

Generate:

Swing Highs
Swing Lows

HH
HL
LH
LL

Break Of Structure (BOS)

Market Structure Shift (MSS)

Directional Bias

Structure Strength

Produce:

market_structure_state.json

market_structure_audit.csv

for downstream consumers:

WF-01D TREND ENGINE
WF-01E REGIME ENGINE
WF-01F SIGNAL ENGINE

Future:
Trade Permission Engine
Execution Engine
Risk Engine
INPUTS

Consumes:

market_snapshot_state.json

Generated by:

WF-01B MARKET_SNAPSHOT
WORKFLOW
NODE-01
LOAD_MARKET_SNAPSHOT

NODE-02
EXPLODE_TIMEFRAMES

NODE-03
BUILD_MARKET_STRUCTURE

NODE-04
BUILD_MARKET_STRUCTURE_STATE

NODE-05
WRITE_MARKET_STRUCTURE_STATE

NODE-06
BUILD_MARKET_STRUCTURE_AUDIT_ROWS

NODE-07
APPEND_MARKET_STRUCTURE_AUDIT

NODE-08
BUILD_MARKET_STRUCTURE_CERTIFICATION

NODE-09
WRITE_MARKET_STRUCTURE_CERTIFICATION

NODE-10
WORKFLOW_SUCCESS

NODE-11
WORKFLOW_FAILURE
NODE-01
LOAD_MARKET_SNAPSHOT
Purpose

Load snapshot state.

Reads
data/state/market_snapshot_state.json
Output
{
  "provider": "UPSTOX",
  "instrument": "NSE_INDEX|Nifty 50",
  "timeframes": {
    "1minute": {...},
    "5minute": {...},
    "15minute": {...},
    "30minute": {...},
    "60minute": {...},
    "240minute": {...},
    "day": {...}
  }
}
NODE-02
EXPLODE_TIMEFRAMES
Purpose

Convert timeframe map into iterable records.

Output
[
  {
    "timeframe": "1minute",
    "candles": [...]
  },
  {
    "timeframe": "5minute",
    "candles": [...]
  }
]
NODE-03
BUILD_MARKET_STRUCTURE
Purpose

Perform complete structure analysis.

Step A

Detect swing highs.

high[i]

>
high[i-1]

AND

>
high[i+1]

Create:

{
  "price": 23215.15,
  "timestamp": "...",
  "type": "SWING_HIGH"
}
Step B

Detect swing lows.

low[i]

<
low[i-1]

AND

<
low[i+1]

Create:

{
  "price": 23187.80,
  "timestamp": "...",
  "type": "SWING_LOW"
}
Step C

Classify highs.

Compare latest swing high against previous.

Rules:

Higher High
HH

Lower High
LH
Step D

Classify lows.

Rules:

Higher Low
HL

Lower Low
LL
Step E

Determine Structure Bias

Rules

HH + HL
=
BULLISH

LH + LL
=
BEARISH

Otherwise
=
NEUTRAL
Step F

Determine Structure Strength

Rules

Bias detected
=
STRONG

No clear bias
=
WEAK
Step G

Detect BOS

Bullish BOS

Current High

Previous Structure High

Result

BULLISH_BOS

Bearish BOS

Current Low

<

Previous Structure Low

Result

BEARISH_BOS
Step H

Detect MSS

Bullish Structure

HH + HL

Result

BULLISH_STRUCTURE

Bearish Structure

LH + LL

Result

BEARISH_STRUCTURE
Output

Per timeframe:

{
  "timeframe": "30minute",

  "latest_high_class": "HH",
  "latest_low_class": "HL",

  "latest_structure_high": 23425.35,
  "latest_structure_low": 23175.30,

  "swing_high_count": 79,
  "swing_low_count": 79,
  "total_swings": 158,

  "structure_bias": "BULLISH",
  "structure_strength": "STRONG",

  "bos_state": "BULLISH_BOS",
  "bos_detected": true,

  "bos_reference_high": 23425.35,
  "bos_reference_low": 23175.30,

  "mss_state": "BULLISH_STRUCTURE",
  "mss_detected": true
}
NODE-04
BUILD_MARKET_STRUCTURE_STATE
Purpose

Aggregate all timeframe structure outputs.

Output
{
  "generated_at": "...",
  "provider": "UPSTOX",
  "instrument": "NSE_INDEX|Nifty 50",

  "timeframes": {
    "1minute": {...},
    "5minute": {...},
    "15minute": {...},
    "30minute": {...},
    "60minute": {...},
    "240minute": {...},
    "day": {...}
  }
}
NODE-05
WRITE_MARKET_STRUCTURE_STATE
Purpose

Persist certified state.

Writes
data/state/market_structure_state.json
NODE-06
BUILD_MARKET_STRUCTURE_AUDIT_ROWS
Purpose

Flatten structure state into audit format.

Output
[
  {
    "generated_at": "...",
    "provider": "UPSTOX",
    "instrument": "NSE_INDEX|Nifty 50",

    "timeframe": "30minute",

    "latest_high_class": "HH",
    "latest_low_class": "HL",

    "latest_structure_high": 23425.35,
    "latest_structure_low": 23175.30,

    "swing_high_count": 79,
    "swing_low_count": 79,
    "total_swings": 158,

    "structure_bias": "BULLISH",
    "structure_strength": "STRONG",

    "bos_state": "BULLISH_BOS",
    "bos_detected": true,

    "bos_reference_high": 23425.35,
    "bos_reference_low": 23175.30,

    "mss_state": "BULLISH_STRUCTURE",
    "mss_detected": true
  }
]
NODE-07
APPEND_MARKET_STRUCTURE_AUDIT
Purpose

Append audit records.

Target
data/audit/market_structure_audit.csv
Append Count
7 rows

One row per timeframe.

1minute
5minute
15minute
30minute
60minute
240minute
day
NODE-08
BUILD_MARKET_STRUCTURE_CERTIFICATION
Purpose

Validate workflow output.

Checks:

Check 1
State file exists
Check 2
7 timeframes present
Check 3
Bias populated
Check 4
Strength populated
Check 5
BOS populated
Check 6
MSS populated
Check 7
Audit rows generated
Check 8
Audit append successful
Output
{
  "workflow": "WF-01C",
  "status": "CERTIFIED",
  "timeframes_processed": 7,
  "audit_rows_written": 7,
  "generated_at": "..."
}
NODE-09
WRITE_MARKET_STRUCTURE_CERTIFICATION
Writes
data/certification/market_structure_certification.json
NODE-10
WORKFLOW_SUCCESS
Result
{
  "workflow": "WF-01C",
  "status": "SUCCESS"
}
NODE-11
WORKFLOW_FAILURE
Trigger

Any node failure.

Result
{
  "workflow": "WF-01C",
  "status": "FAILED",
  "failed_node": "NODE-X",
  "error": "..."
}
CERTIFIED OUTPUTS
State
data/state/market_structure_state.json
Audit
data/audit/market_structure_audit.csv
Certification
data/certification/market_structure_certification.json
CURRENT CERTIFIED RESULT (YOUR RUN)
1m     BULLISH
5m     BEARISH
15m    BULLISH
30m    BULLISH
60m    BULLISH
240m   BEARISH
1D     BEARISH

Market Structure Engine is now producing a valid multi-timeframe structure map and is ready to feed WF-01D (Trend Engine) and subsequent intelligence workflows.

1. ALL DOMAINS

Based on the architecture we've been building, Domain-01 is only the first layer.

DOMAIN-01
MARKET INTELLIGENCE

DOMAIN-02
SIGNAL INTELLIGENCE

DOMAIN-03
RISK INTELLIGENCE

DOMAIN-04
PORTFOLIO INTELLIGENCE

DOMAIN-05
EXECUTION INTELLIGENCE

DOMAIN-06
POSITION INTELLIGENCE

DOMAIN-07
OPERATIONAL INTELLIGENCE

DOMAIN-08
SYSTEM INTELLIGENCE
DOMAIN-01

Purpose:

Convert raw market data
into
certified market intelligence.

Output:

market_intelligence_state

Consumed by every downstream domain.

2. DOMAIN-01 COMPLETE MAP

Current Domain-01 architecture:

WF-01A
MARKET_FEED_CLOCK

WF-01B
MARKET_SNAPSHOT

WF-01C
MARKET_STRUCTURE_ENGINE

WF-01D
TREND_ANALYSIS_ENGINE

WF-01E
MARKET_REGIME_ENGINE

WF-01F
MULTI_TIMEFRAME_ALIGNMENT

WF-01G
VOLATILITY_INTELLIGENCE

WF-01H
LIQUIDITY_INTELLIGENCE

WF-01I
SUPPORT_RESISTANCE_ENGINE

WF-01J
PRICE_ACTION_ENGINE

WF-01K
MARKET_BREADTH_ENGINE

WF-01L
DERIVATIVES_INTELLIGENCE

WF-01M
INTERMARKET_INTELLIGENCE

WF-01N
SESSION_INTELLIGENCE

WF-01O
EVENT_INTELLIGENCE

WF-01P
MARKET_ANOMALY_ENGINE

WF-01Q
MARKET_CONDITION_SCORING

WF-01R
MARKET_PERMISSION_ENGINE

WF-01Z
MARKET_INTELLIGENCE_STATE
WHAT IS COMPLETE
WF-01A
✓ COMPLETE

WF-01B
✓ COMPLETE

WF-01C
✓ COMPLETE
WHAT IS NEXT
WF-01D
TREND_ANALYSIS_ENGINE
3. WF-01D — TREND_ANALYSIS_ENGINE
PURPOSE

Convert:

Market Structure
+
Technical Indicators

into:

Certified Trend State
INPUTS

Consumes:

From WF-01B
technical_indicator_state

Includes:

EMA20
EMA50
EMA200

RSI

MACD

ATR

VWAP
From WF-01C
market_structure_state

Includes:

HH
HL
LH
LL

BOS

MSS

Structure Bias

Structure Strength
OUTPUT

Produces:

trend_state
TREND ENGINE RESPONSIBILITY

WF-01C answers:

What structure exists?

WF-01D answers:

What trend exists?

These are not the same thing.

Example:

Structure

HH
HL

=
Bullish Structure

But:

EMA20 < EMA50 < EMA200

Still:

Bearish Trend

Therefore trend must be independently calculated.

WF-01D WORKFLOW

Institutional version:

NODE-01
RECEIVE_TECHNICAL_INDICATOR_STATE

NODE-02
RECEIVE_MARKET_STRUCTURE_STATE

NODE-03
BUILD_TREND_INPUT_STATE

NODE-04
COMPUTE_EMA_STACK

NODE-05
COMPUTE_PRICE_POSITION

NODE-06
COMPUTE_MOMENTUM_STATE

NODE-07
COMPUTE_STRUCTURE_TREND

NODE-08
DETECT_TREND_DIRECTION

NODE-09
COMPUTE_TREND_STRENGTH

NODE-10
BUILD_TREND_STATE

NODE-11
BUILD_TREND_AUDIT_ROWS

NODE-12
APPEND_TREND_AUDIT
NODE-01
RECEIVE_TECHNICAL_INDICATOR_STATE

Load:

technical_indicator_state

Input:

{
  "ema20": 23380,
  "ema50": 23320,
  "ema200": 23100,

  "rsi": 61,

  "macd": {
    ...
  }
}
NODE-02
RECEIVE_MARKET_STRUCTURE_STATE

Load:

market_structure_state

Input:

{
  "structure_bias": "BULLISH",
  "bos_state": "BULLISH_BOS"
}
NODE-03
BUILD_TREND_INPUT_STATE

Purpose:

Merge:

Indicators
+
Structure

into a single deterministic payload.

NODE-04
COMPUTE_EMA_STACK

Purpose:

Determine EMA hierarchy.

Rules:

EMA20 > EMA50 > EMA200
=
BULLISH_STACK
EMA20 < EMA50 < EMA200
=
BEARISH_STACK

Else:

MIXED_STACK

Output:

{
  "ema_stack": "BULLISH_STACK"
}
NODE-05
COMPUTE_PRICE_POSITION

Determine price relative to:

EMA20
EMA50
EMA200
VWAP

Output:

{
  "price_above_ema20": true,
  "price_above_ema50": true,
  "price_above_ema200": true,
  "price_above_vwap": true
}
NODE-06
COMPUTE_MOMENTUM_STATE

Uses:

RSI
MACD

Outputs:

{
  "momentum_state": "BULLISH"
}

Possible:

BULLISH
BEARISH
NEUTRAL
NODE-07
COMPUTE_STRUCTURE_TREND

Uses:

market_structure_state

Maps:

BULLISH → STRUCTURE_BULLISH

BEARISH → STRUCTURE_BEARISH
NODE-08
DETECT_TREND_DIRECTION

Fusion node.

Combines:

EMA Stack

Price Position

Momentum

Structure

Produces:

BULLISH
BEARISH
NEUTRAL

Example:

EMA Stack      Bullish
Price          Bullish
Momentum       Bullish
Structure      Bullish

Result:

BULLISH
NODE-09
COMPUTE_TREND_STRENGTH

Score:

0-4 confirmations

Example:

EMA
Price
Momentum
Structure

Scoring:

4 = VERY_STRONG

3 = STRONG

2 = MODERATE

1 = WEAK

0 = NONE
NODE-10
BUILD_TREND_STATE

Authoritative output.

Example:

{
  "timeframe": "60minute",

  "trend_direction": "BULLISH",

  "trend_strength": "VERY_STRONG",

  "ema_stack": "BULLISH_STACK",

  "momentum_state": "BULLISH",

  "structure_bias": "BULLISH"
}
NODE-11
BUILD_TREND_AUDIT_ROWS

Flatten:

trend_state

into:

trend_audit

One row per timeframe.

NODE-12
APPEND_TREND_AUDIT

Append:

TREND_AUDIT

sheet.

FINAL WF-01D OUTPUT

Produces:

trend_state.json
trend_audit.csv
IMPORTANT OBSERVATION

Because we completed WF-01C, we already know the current structure map:

1m      BULLISH
5m      BEARISH
15m     BULLISH
30m     BULLISH
60m     BULLISH
240m    BEARISH
1D      BEARISH

WF-01D will be the first workflow that starts turning this into:

Directional Intelligence

which becomes the foundation for:

WF-01E MARKET_REGIME_ENGINE
WF-01F MULTI_TIMEFRAME_ALIGNMENT

Those two workflows depend heavily on WF-01D being correct, so we should design WF-01D carefully before implementing any node.

Yes, this was exactly the right thing to check before continuing.

After reviewing the uploaded workflow, I can confirm something important:

We are not dealing with drift inside WF-01A, WF-01B, WF-01C.

What happened is:

Earlier discussion
=
Proposed institutional target architecture

Current workflow
=
Actual implemented architecture

Those are not yet the same thing.

The workflow you attached is the authoritative implementation because it is what has actually been built.

CURRENT REALITY

Your Domain-01 currently contains:

WF-01A
MARKET_DATA_INGESTION

WF-01B
TECHNICAL_INDICATOR_ENGINE

WF-01C
MARKET_STRUCTURE_ENGINE

and only these three are actually implemented.

WF-01A ACTUAL IMPLEMENTED STEPS
01 SCHEDULE_TRIGGER

02 CONFIGURE_PROVIDER

03 CONFIGURE_INSTRUMENT

04 CONFIGURE_TIMEFRAME_UNIVERSE

05 CONFIGURE_CANDLE_POLICY

06 GENERATE_COLLECTION_PLAN

07 GENERATE_REQUEST_PARAMETERS

08 COLLECT_MARKET_DATA

09 HTTP_GET_HISTORICAL_CANDLES

10 BUILD_MARKET_DATA_STATE

11 AGGREGATE_TIMEFRAMES

Output:

market_data_state

Contains:

1m
5m
15m
30m
60m
240m
1D

candles.

WF-01B ACTUAL IMPLEMENTED STEPS
01 RECEIVE_MARKET_DATA_STATE

02 VALIDATE_MARKET_DATA_STATE

03 EXTRACT_TIMEFRAMES

04 COMPUTE_EMA_SERIES

05 COMPUTE_RSI

06 COMPUTE_MACD

07 COMPUTE_ATR

08 COMPUTE_VWAP

09 BUILD_TIMEFRAME_INDICATORS

10 BUILD_TECHNICAL_INDICATOR_STATE

11 BUILD_TECHNICAL_INDICATOR_AUDIT_ROWS

12 APPEND_TECHNICAL_INDICATOR_AUDIT

Output:

technical_indicator_state

Contains:

EMA20
EMA50
EMA200

RSI

MACD

ATR

VWAP

for every timeframe.

WF-01C ACTUAL IMPLEMENTED STEPS
01 RECEIVE_MARKET_DATA_STATE

02 VALIDATE_MARKET_STRUCTURE_INPUT

03 EXTRACT_TIMEFRAMES

04 NORMALIZE_CANDLE_SEQUENCE

05 COMPUTE_SWING_POINTS

06 CLASSIFY_SWING_STRUCTURE

07 DETECT_BREAK_OF_STRUCTURE

08 DETECT_MARKET_STRUCTURE_SHIFT

09 BUILD_MARKET_STRUCTURE_STATE

10 BUILD_MARKET_STRUCTURE_AUDIT_ROWS

11 APPEND_MARKET_STRUCTURE_AUDIT

Output:

market_structure_state

Contains:

HH
HL
LH
LL

BOS

MSS

Structure Bias

Structure Strength

for every timeframe.

WHERE THE MISMATCH OCCURRED

In our recent discussion I expanded Domain-01 into:

WF-01D TREND_ANALYSIS_ENGINE

WF-01E MARKET_REGIME_ENGINE

WF-01F MULTI_TIMEFRAME_ALIGNMENT

WF-01G VOLATILITY_INTELLIGENCE

...
WF-01R MARKET_PERMISSION_ENGINE

Those are:

Future workflows
NOT implemented workflows

So there is no drift in A/B/C.

The only question is:

Are D → R already defined
inside the master architecture?

or

Did we invent them during discussion?

That needs to be verified against the project source documents before we continue.

RECOMMENDATION

Before building WF-01D:

Freeze current Domain-01 implementation.
Extract authoritative Domain-01 definition from:
BLUEPRINT_TRADING_PLATFORM_3.1
authoritative-stage-index
authoritative-platform-execution-model
master phase documents.
Rebuild the complete Domain-01 map from source.
Compare:
SOURCE ARCHITECTURE

vs

CURRENT IMPLEMENTATION
Produce:
DOMAIN-01 GAP ANALYSIS

showing:

Implemented
Missing
Modified
Improved
Drifted

Only after that should we design WF-01D.

This is exactly how an institutional platform team would proceed, because once WF-01D is built, every downstream domain (signals, risk, portfolio, execution) will depend on it. We should verify the authoritative Domain-01 architecture first rather than continuing from memory.

DOMAIN-01 RECONCILIATION RESULT

I reviewed:

Your actual implemented workflow JSON.
The recovered Domain-01 evolution documents.
Platform governance documents.
AUTHORITATIVE CONCLUSION

The current implementation is aligned with the latest institutional evolution.

The earlier versions:

MARKET_FEED_CLOCK
MARKET_FEED_HEALTH
MARKET_SNAPSHOT

were early prototype concepts.

After moving to:

Real Upstox candle ingestion
Multi-timeframe analysis
Indicator computation
Structure analysis

the architecture evolved into:

WF-01A MARKET_DATA_INGESTION

WF-01B TECHNICAL_INDICATOR_ENGINE

WF-01C MARKET_STRUCTURE_ENGINE

WF-01D TREND_ANALYSIS_ENGINE

WF-01E MARKET_REGIME_ENGINE

WF-01F MULTI_TIMEFRAME_ALIGNMENT

WF-01Z MARKET_INTELLIGENCE_STATE

This appears repeatedly in the recovered blueprint and matches the workflow already built.

CURRENT IMPLEMENTATION STATUS
COMPLETED
WF-01A
MARKET_DATA_INGESTION

Produces:

MARKET_DATA_STATE

Contains:

1minute
5minute
15minute
30minute
60minute
240minute
day

OHLCV datasets.

WF-01B
TECHNICAL_INDICATOR_ENGINE

Produces:

TECHNICAL_INDICATOR_STATE

Contains:

EMA20
EMA50
EMA200

RSI

MACD

ATR

VWAP

for every timeframe.

WF-01C
MARKET_STRUCTURE_ENGINE

Produces:

MARKET_STRUCTURE_STATE

Contains:

Swing Structure

HH
HL
LH
LL

BOS

MSS

Structure Bias

Structure Strength

for every timeframe.

GAP ANALYSIS
Missing Workflow 01D
TREND_ANALYSIS_ENGINE

Status:

NOT BUILT
Missing Workflow 01E
MARKET_REGIME_ENGINE

Status:

NOT BUILT
Missing Workflow 01F
MULTI_TIMEFRAME_ALIGNMENT

Status:

NOT BUILT
Missing Workflow 01Z
MARKET_INTELLIGENCE_STATE

Status:

NOT BUILT
NEXT AUTHORITATIVE STEP

The next workflow is:

WF-01D
TREND_ANALYSIS_ENGINE

Not WF-01E.

Not WF-01Z.

Trend must exist before regime.

Regime must exist before alignment.

Alignment must exist before final intelligence aggregation.

WF-01D RESPONSIBILITY

WF-01C answers:

What is the structure
inside each timeframe?

Example:

1m   Bullish
5m   Bearish
15m  Bullish
30m  Bullish
60m  Bullish
240m Bearish
Day  Bearish

WF-01D answers:

What is the trend picture
across all timeframes?

Example:

Micro Trend
Bullish

Intraday Trend
Bullish

Higher Timeframe Trend
Bearish

Overall Trend
Mixed

This becomes the first workflow that creates:

Cross-timeframe intelligence

instead of:

Single timeframe analysis
WF-01D INPUT

Consumes:

MARKET_STRUCTURE_STATE

for:

1minute
5minute
15minute
30minute
60minute
240minute
day
WF-01D OUTPUT

Produces:

{
  "trend_state": {
    "micro_trend": "BULLISH",
    "intraday_trend": "BULLISH",
    "higher_timeframe_trend": "BEARISH",
    "overall_trend": "MIXED",
    "trend_strength": "MODERATE",
    "trend_score": 57
  }
}
INSTITUTIONAL BUILD ORDER

Next session we should build:

WF-01D
TREND_ANALYSIS_ENGINE

01 RECEIVE_MARKET_STRUCTURE_STATE

02 VALIDATE_MARKET_STRUCTURE_STATE

03 EXTRACT_STRUCTURE_TIMEFRAMES

04 BUILD_TIMEFRAME_TREND_MAP

05 COMPUTE_MICRO_TREND

06 COMPUTE_INTRADAY_TREND

07 COMPUTE_HIGHER_TIMEFRAME_TREND

08 COMPUTE_OVERALL_TREND

09 COMPUTE_TREND_STRENGTH

10 BUILD_TREND_STATE

11 BUILD_TREND_AUDIT_ROWS

12 APPEND_TREND_AUDIT

That is the institutional next step and is fully consistent with the current implemented Domain-01 evolution.

Agreed.

We will follow exactly the same institutional methodology used for WF-01A, WF-01B and WF-01C:

DESCRIBE
    ↓
IMPLEMENT
    ↓
VALIDATE
    ↓
FREEZE
    ↓
NEXT NODE

No shortcuts.

No partial code.

No patches.

Every node will contain:

timeframe
provider
instrument
processing_context
audit

and every node must include:

audit.summary

at the top-level output.

WF-01D — TREND_ANALYSIS_ENGINE
PURPOSE

Convert independent timeframe market structures into a unified trend model.

WF-01C answered:

What is the structure
inside each timeframe?

Example:

1m  HH HL
5m  HH HL
15m HH HL
30m LH LL
60m HH HL
240m LH LL
Day LH LL

WF-01D answers:

What is the trend picture
across all timeframes?

Example:

Micro Trend:
Bullish

Intraday Trend:
Bullish

Higher Timeframe Trend:
Bearish

Overall Trend:
Mixed
WF-01D INPUT

Consumes:

MARKET_STRUCTURE_STATE

from WF-01C.

Current validated output already exists.

Contains:

timeframe

structure_bias

bos_state

mss_state

latest_high_class

latest_low_class

structure_strength
WF-01D OUTPUT

Produces:

TREND_STATE
WF-01D NODE FLOW
01 RECEIVE_MARKET_STRUCTURE_STATE

02 VALIDATE_MARKET_STRUCTURE_STATE

03 EXTRACT_STRUCTURE_TIMEFRAMES

04 BUILD_TIMEFRAME_TREND_MAP

05 COMPUTE_MICRO_TREND

06 COMPUTE_INTRADAY_TREND

07 COMPUTE_HIGHER_TIMEFRAME_TREND

08 COMPUTE_OVERALL_TREND

09 COMPUTE_TREND_STRENGTH

10 BUILD_TREND_STATE

11 BUILD_TREND_AUDIT_ROWS

12 APPEND_TREND_AUDIT
NODE 01
RECEIVE_MARKET_STRUCTURE_STATE
PURPOSE

Receive certified WF-01C output.

No calculations.

No transformations.

NODE TYPE
Code Node

Mode:

Run Once For All Items
OUTPUT CONTRACT

Pass-through.

Must preserve:

timeframe
provider
instrument
processing_context
audit
market_structure_state
VALIDATION

Expected:

7 items

1minute
5minute
15minute
30minute
60minute
240minute
day
NODE 02
VALIDATE_MARKET_STRUCTURE_STATE
PURPOSE

Ensure all mandatory fields exist.

Reject incomplete timeframe states.

VALIDATION RULES

Every item must contain:

market_structure_state

timeframe

structure_bias

structure_strength

latest_high_class

latest_low_class
FAILURE

Throw error:

INVALID_MARKET_STRUCTURE_STATE
VALIDATION OUTPUT

Pass-through.

NODE 03
EXTRACT_STRUCTURE_TIMEFRAMES
PURPOSE

Convert timeframe records into deterministic lookup map.

Required for trend aggregation.

OUTPUT
{
  "timeframe_map": {

    "1minute": {},
    "5minute": {},
    "15minute": {},
    "30minute": {},
    "60minute": {},
    "240minute": {},
    "day": {}

  }
}
NODE 04
BUILD_TIMEFRAME_TREND_MAP
PURPOSE

Convert structure into timeframe trend.

LOGIC
Bullish
HH + HL
=
BULLISH
Bearish
LH + LL
=
BEARISH
Mixed

Anything else:

MIXED
OUTPUT
{
  "trend_map": {

    "1minute": "BULLISH",
    "5minute": "BULLISH",
    "15minute": "BULLISH",
    "30minute": "BEARISH",
    "60minute": "BULLISH",
    "240minute": "BEARISH",
    "day": "BEARISH"

  }
}
NODE 05
COMPUTE_MICRO_TREND
PURPOSE

Aggregate:

1minute
5minute
SCORING
Bullish = +1
Bearish = -1
Mixed = 0
RESULT
score > 0
=
BULLISH

score < 0
=
BEARISH

score = 0
=
MIXED
OUTPUT
{
  "micro_trend": {

    "state": "BULLISH",

    "score": 2

  }
}
NODE 06
COMPUTE_INTRADAY_TREND
PURPOSE

Aggregate:

15minute
30minute
60minute
SCORING

Same logic.

OUTPUT
{
  "intraday_trend": {

    "state": "BULLISH",

    "score": 1

  }
}
NODE 07
COMPUTE_HIGHER_TIMEFRAME_TREND
PURPOSE

Aggregate:

240minute
day
OUTPUT
{
  "higher_timeframe_trend": {

    "state": "BEARISH",

    "score": -2

  }
}
NODE 08
COMPUTE_OVERALL_TREND
PURPOSE

Create authoritative trend.

WEIGHTS
Micro           = 20%

Intraday        = 40%

Higher TF       = 40%

Institutional reasoning:

Higher timeframes
must dominate.
OUTPUT
{
  "overall_trend": {

    "state": "BEARISH",

    "weighted_score": -0.2

  }
}
NODE 09
COMPUTE_TREND_STRENGTH
PURPOSE

Measure confidence.

INPUT
Trend agreement
RULES
STRONG

All groups agree.

Bull Bull Bull

or

Bear Bear Bear
MODERATE

Two agree.

WEAK

Mixed.

OUTPUT
{
  "trend_strength": {

    "state": "MODERATE"
  }
}
NODE 10
BUILD_TREND_STATE
PURPOSE

Create authoritative WF-01D output.

This is the most important node.

We will build this exactly like:

BUILD_TECHNICAL_INDICATOR_STATE

BUILD_MARKET_STRUCTURE_STATE

with:

audit.summary

processing_context

trend_state
OUTPUT
{
  "timeframe": "ALL",

  "provider": "UPSTOX",

  "instrument": "NSE_INDEX|Nifty 50",

  "processing_context": {

    "workflow_id": "WF-01D",

    "workflow_name": "TREND_ANALYSIS_ENGINE"

  },

  "audit": {

    "node": "BUILD_TREND_STATE",

    "payload_type": "TREND_STATE",

    "summary": {

      "overall_trend": "BEARISH",

      "micro_trend": "BULLISH",

      "intraday_trend": "BULLISH",

      "higher_timeframe_trend": "BEARISH",

      "trend_strength": "MODERATE"

    }

  },

  "trend_state": {

    "micro_trend": {},

    "intraday_trend": {},

    "higher_timeframe_trend": {},

    "overall_trend": {},

    "trend_strength": {}

  }

}
NODE 11
BUILD_TREND_AUDIT_ROWS
PURPOSE

Create Google Sheet rows.

One row per workflow execution.

OUTPUT
generated_at

provider
instrument

micro_trend

intraday_trend

higher_timeframe_trend

overall_trend

trend_strength
NODE 12
APPEND_TREND_AUDIT
PURPOSE

Persist trend audit history.

Google Sheet:

trend_audit
VALIDATION CHECKLIST

WF-01D is complete only when:

Structure Input
PASS
Trend Map
PASS
Micro Trend
PASS
Intraday Trend
PASS
Higher TF Trend
PASS
Overall Trend
PASS
Trend Strength
PASS
Trend State
PASS
Trend Audit Sheet
PASS
Deterministic Replay
PASS

Next step after this design freeze is Node 01 → Node 04 implementation, because Nodes 05–09 depend on the aggregated trend map. We should implement and validate each node sequentially exactly as we did in WF-01C.

WF-01D — TREND_ANALYSIS_ENGINE
Institutional Documentation (Final Certified Version)
PURPOSE

WF-01D transforms raw market structure from WF-01C into a multi-timeframe trend model.

The workflow answers:

What is the current trend?

What is the intraday trend?

What is the higher timeframe trend?

Are trends aligned?

Which trend has authority?

What trend state should downstream engines consume?
INPUT

Source:

WF-01C
BUILD_MARKET_STRUCTURE_STATE

Input Contract:

market_structure_state
OUTPUT

Authoritative State:

trend_state

Audit Sheet:

TREND_AUDIT
WORKFLOW
01 RECEIVE_MARKET_STRUCTURE_STATE

02 VALIDATE_MARKET_STRUCTURE_STATE

03 EXTRACT_STRUCTURE_TIMEFRAMES

04 BUILD_TIMEFRAME_TREND_MAP

05 COMPUTE_MICRO_TREND

06 COMPUTE_INTRADAY_TREND

07 COMPUTE_HIGHER_TIMEFRAME_TREND

08 COMPUTE_OVERALL_TREND

09 COMPUTE_TREND_ALIGNMENT

10 BUILD_TREND_STATE

11 BUILD_TREND_AUDIT_ROWS

12 APPEND_TREND_AUDIT
NODE 01
RECEIVE_MARKET_STRUCTURE_STATE
Purpose

Receive certified market structure states from WF-01C.

Input Connection
WF-01C
BUILD_MARKET_STRUCTURE_STATE
            │
            ▼
RECEIVE_MARKET_STRUCTURE_STATE
Node Type
Code Node
Run Once For Each Item
Logic
Pass through market_structure_state.

Re-stamp workflow ownership.

Create WF-01D processing context.
Output
market_structure_state
NODE 02
VALIDATE_MARKET_STRUCTURE_STATE
Purpose

Validate required structure fields.

Reject corrupted structure payloads.

Node Type
Code Node
Run Once For Each Item
Validation Rules

Required:

timeframe
provider
instrument

structure_bias

latest_high_class
latest_low_class

structure_strength
Result
PASS
or
FAIL
NODE 03
EXTRACT_STRUCTURE_TIMEFRAMES
Purpose

Aggregate all timeframe structure states into one institutional structure map.

Input
7 timeframe items
Node Type
Code Node
Run Once For All Items
Timeframes
1minute
5minute

15minute
30minute
60minute

240minute
day
Output
timeframe_map

Example:

{
  "1minute": {},
  "5minute": {},
  "15minute": {},
  "30minute": {},
  "60minute": {},
  "240minute": {},
  "day": {}
}
NODE 04
BUILD_TIMEFRAME_TREND_MAP
Purpose

Convert market structure into directional trend states.

Logic

Bullish Structure:

HH + HL
=
BULLISH

Bearish Structure:

LH + LL
=
BEARISH

Otherwise:

MIXED
Output
{
  "trend_map": {
    "1minute": {
      "trend_state": "BULLISH"
    }
  }
}
NODE 05
COMPUTE_MICRO_TREND
Purpose

Determine very short-term trend.

Timeframes
1minute
5minute
Scoring
BULLISH = +1
BEARISH = -1
MIXED = 0
Interpretation
Score > 0
MICRO_BULLISH

Score < 0
MICRO_BEARISH

Score = 0
MICRO_MIXED
Example
1m Bullish
5m Bearish

Score = 0

MICRO_MIXED
NODE 06
COMPUTE_INTRADAY_TREND
Purpose

Determine active trading-session trend.

Timeframes
15minute
30minute
60minute
Scoring
BULLISH = +1

BEARISH = -1
Example
15m Bullish

30m Bullish

60m Bullish

Score = +3

INTRADAY_BULLISH
NODE 07
COMPUTE_HIGHER_TIMEFRAME_TREND
Purpose

Determine institutional trend.

Timeframes
240minute

day
Scoring
BULLISH = +1

BEARISH = -1
Example
240m Bearish

Day Bearish

Score = -2

HTF_BEARISH
NODE 08
COMPUTE_OVERALL_TREND
Purpose

Determine authoritative trend.

Institutional Rule
Higher Timeframe
always overrides
lower timeframe trend.

Authority:

HTF_FIRST
Example
Micro:
Bullish

Intraday:
Bullish

HTF:
Bearish

Result:

OVERALL_BEARISH
Output
{
  "overall_trend": {
    "state": "OVERALL_BEARISH",
    "authority": "HTF_FIRST"
  }
}
NODE 09
COMPUTE_TREND_ALIGNMENT
Purpose

Determine trend agreement.

Rules

All bullish:

ALIGNED_BULLISH

All bearish:

ALIGNED_BEARISH

Mixed:

CONFLICTED
Example
Micro:
Mixed

Intraday:
Bullish

HTF:
Bearish

Result:

CONFLICTED
Output
{
  "trend_alignment": {
    "state": "CONFLICTED"
  }
}
NODE 10
BUILD_TREND_STATE
Purpose

Build authoritative trend state contract.

Output Contract
{
  "trend_state": {

    "provider": "",

    "instrument": "",

    "overall_trend": "",

    "trend_alignment": "",

    "micro_trend": "",

    "micro_score": 0,

    "intraday_trend": "",

    "intraday_score": 0,

    "higher_timeframe_trend": "",

    "higher_timeframe_score": 0,

    "authority": "HTF_FIRST",

    "trend_state_timestamp": ""
  }
}
NODE 11
BUILD_TREND_AUDIT_ROWS
Purpose

Transform trend state into sheet row format.

Output
{
  "generated_at": "",

  "provider": "",

  "instrument": "",

  "overall_trend": "",

  "trend_alignment": "",

  "authority": "",

  "micro_trend": "",

  "micro_score": 0,

  "intraday_trend": "",

  "intraday_score": 0,

  "higher_timeframe_trend": "",

  "higher_timeframe_score": 0,

  "trend_state_timestamp": ""
}
NODE 12
APPEND_TREND_AUDIT
Purpose

Persist certified trend states.

Node Type
Google Sheets
Operation
Append Row
Sheet
TREND_AUDIT
Sheet Columns
generated_at

provider
instrument

overall_trend
trend_alignment
authority

micro_trend
micro_score

intraday_trend
intraday_score

higher_timeframe_trend
higher_timeframe_score

trend_state_timestamp
FINAL OUTPUT EXAMPLE
{
  "trend_state": {
    "overall_trend": "OVERALL_BEARISH",
    "trend_alignment": "CONFLICTED",

    "micro_trend": "MICRO_MIXED",
    "micro_score": 0,

    "intraday_trend": "INTRADAY_BULLISH",
    "intraday_score": 3,

    "higher_timeframe_trend": "HTF_BEARISH",
    "higher_timeframe_score": -2,

    "authority": "HTF_FIRST"
  }
}
CERTIFICATION
WF-01D
TREND_ANALYSIS_ENGINE

STATUS:
COMPLETE

VALIDATED:
YES

AUDITED:
YES

GOOGLE SHEET:
TREND_AUDIT

AUTHORITATIVE OUTPUT:
trend_state

CERTIFICATION:
PRODUCTION READY

WF-01E — VOLATILITY_ANALYSIS_ENGINE
Domain
DOMAIN-01
MARKET INTELLIGENCE
Workflow
WF-01E
VOLATILITY_ANALYSIS_ENGINE
Purpose

Transform raw candle movement into an authoritative volatility state.

Determine:

Current Volatility

Volatility Direction

Volatility Regime

Volatility Expansion

Volatility Contraction

Volatility State

This workflow still does NOT produce:

Buy

Sell

Entry

Stoploss

Target

It only produces volatility intelligence.

Institutional Inputs

Consumes:

CERTIFIED_CANDLE_DATA

from:

WF-00
MARKET_DATA_DOMAIN

Not:

WF-01C

WF-01D

Volatility must be computed directly from candles.

Trend and structure are independent dimensions.

Institutional Output

Produces:

VOLATILITY_STATE

Example:

{
  "volatility_state": {
    "current_volatility": "HIGH",
    "volatility_regime": "EXPANDING",
    "atr": 145.2,
    "atr_percent": 0.61,
    "volatility_strength": "STRONG"
  }
}
Institutional Build Order

Following the same pattern as WF-01C and WF-01D:

WF-01E
VOLATILITY_ANALYSIS_ENGINE

01 RECEIVE_CANDLE_DATA

02 VALIDATE_CANDLE_DATA

03 EXTRACT_VOLATILITY_SERIES

04 COMPUTE_TRUE_RANGE

05 COMPUTE_ATR

06 COMPUTE_ATR_PERCENT

07 CLASSIFY_VOLATILITY_REGIME

08 DETECT_VOLATILITY_EXPANSION

09 DETECT_VOLATILITY_CONTRACTION

10 BUILD_VOLATILITY_STATE

11 BUILD_VOLATILITY_AUDIT_ROWS

12 APPEND_VOLATILITY_AUDIT
Node Responsibilities
01 RECEIVE_CANDLE_DATA

Receives:

1m
5m
15m
30m
60m
240m
day

certified candle payloads.

Output:

VOLATILITY_INPUT
02 VALIDATE_CANDLE_DATA

Validate:

OHLC present

volume present

minimum candles

timeframe present

Output:

VALIDATED_VOLATILITY_INPUT
03 EXTRACT_VOLATILITY_SERIES

Extract:

high
low
close

required for ATR calculation.

Output:

volatility_series
04 COMPUTE_TRUE_RANGE

For each candle:

TR =
max(

high-low,

abs(high-prev_close),

abs(low-prev_close)

)

Output:

true_range_series
05 COMPUTE_ATR

Institutional default:

ATR(14)

Output:

atr_value

per timeframe.

06 COMPUTE_ATR_PERCENT

Normalize ATR.

Formula:

ATR %
=
ATR / Close × 100

Output:

atr_percent

This allows:

Nifty

BankNifty

Stocks

Forex

Crypto

to be compared consistently.

07 CLASSIFY_VOLATILITY_REGIME

Example:

ATR% < 0.30
LOW

ATR% 0.30-0.80
NORMAL

ATR% > 0.80
HIGH

Output:

LOW
NORMAL
HIGH
08 DETECT_VOLATILITY_EXPANSION

Compare:

Current ATR

vs

Previous ATR

Output:

EXPANDING
STABLE
09 DETECT_VOLATILITY_CONTRACTION

Compare:

Current ATR

vs

Previous ATR

Output:

CONTRACTING
STABLE
10 BUILD_VOLATILITY_STATE

Build authoritative state.

Example:

{
  "volatility_state": {
    "timeframe": "15minute",
    "atr": 42.5,
    "atr_percent": 0.52,
    "volatility_regime": "NORMAL",
    "expansion_state": "EXPANDING",
    "contraction_state": "STABLE"
  }
}
11 BUILD_VOLATILITY_AUDIT_ROWS

Flatten state.

One row per timeframe.

Example:

timestamp

timeframe

atr

atr_percent

volatility_regime

expansion_state

contraction_state
12 APPEND_VOLATILITY_AUDIT

Google Sheet:

VOLATILITY_AUDIT

append mode.

Same pattern used in:

MARKET_STRUCTURE_AUDIT

TREND_AUDIT
Institutional Validation

At completion WF-01E should produce:

VOLATILITY_STATE

for:

1minute
5minute
15minute
30minute
60minute
240minute
day

and nothing else.

This workflow is fully aligned with the Domain-01 architecture and is the correct next workflow after WF-01D. The next implementation step is Node 01 — RECEIVE_CANDLE_DATA, including the exact upstream connection source, node configuration, and full code.

This is a very good point to zoom out.

Right now we are deep inside WF-01E, and if we continue building node-by-node without refreshing the big picture, the architecture becomes fragmented.

CORE TRADING PLATFORM
DOMAIN ARCHITECTURE (ZOOMED OUT)

The platform is divided into 9 major business domains.

Each domain owns a specific layer of intelligence.

DOMAIN-01
MARKET INTELLIGENCE

DOMAIN-02
SIGNAL INTELLIGENCE

DOMAIN-03
DECISION INTELLIGENCE

DOMAIN-04
RISK INTELLIGENCE

DOMAIN-05
PORTFOLIO INTELLIGENCE

DOMAIN-06
EXECUTION INTELLIGENCE

DOMAIN-07
POSITION INTELLIGENCE

DOMAIN-08
PERFORMANCE INTELLIGENCE

DOMAIN-09
SYSTEM INTELLIGENCE
DOMAIN-01
MARKET INTELLIGENCE

PURPOSE

Create the authoritative understanding of the market.

Everything downstream depends on this.

No signals.
No decisions.
No trades.

Only:

Market State
DOMAIN-01 OUTPUT

Produces:

market_state

trend_state
volatility_state
momentum_state
structure_state
regime_state

market_intelligence_state
DOMAIN-01 COMPLETE WORKFLOW MAP

Current architecture:

WF-01A
MARKET_DATA_ENGINE

WF-01B
TREND_ANALYSIS_ENGINE

WF-01C
MARKET_STRUCTURE_ENGINE

WF-01D
MOMENTUM_ANALYSIS_ENGINE

WF-01E
VOLATILITY_ANALYSIS_ENGINE

WF-01F
MARKET_REGIME_ENGINE

WF-01Z
MARKET_INTELLIGENCE_STATE
DOMAIN-01 FLOW
RAW MARKET DATA
        │
        ▼
WF-01A
MARKET_DATA_ENGINE
        │
        ├────────► WF-01B TREND
        │
        ├────────► WF-01C STRUCTURE
        │
        ├────────► WF-01D MOMENTUM
        │
        ├────────► WF-01E VOLATILITY
        │
        ▼
WF-01F REGIME
        │
        ▼
WF-01Z
MARKET_INTELLIGENCE_STATE
WF-01A
MARKET_DATA_ENGINE

PURPOSE

Create the authoritative market data state.

Nothing analytical happens here.

This workflow only:

collect
normalize
validate
aggregate
publish
WF-01A INPUT

Source:

Upstox
Zerodha
Angel
Polygon
Alpaca
Binance
NSE
BSE

Depending on deployment.

WF-01A OUTPUT

Produces:

{
  "market_data_state": {
    "1m": [],
    "5m": [],
    "15m": [],
    "30m": [],
    "1h": [],
    "4h": [],
    "1d": []
  }
}
WF-01A NODE FLOW
01 SCHEDULE_TRIGGER

02 CONFIGURE_PROVIDER

03 CONFIGURE_INSTRUMENT

04 CONFIGURE_TIMEFRAME_UNIVERSE

05 CONFIGURE_CANDLE_POLICY

06 GENERATE_COLLECTION_PLAN

07 GENERATE_REQUEST_PARAMETERS

08 COLLECT_MARKET_DATA

09 HTTP_GET_HISTORICAL_CANDLES

10 BUILD_MARKET_DATA_STATE

11 VALIDATE_MARKET_DATA_STATE

12 EXTRACT_TIMEFRAMES

13 AGGREGATE_TIMEFRAMES

14 EMIT_MARKET_DATA_STATE
WF-01A OUTPUT OBJECT
{
  "market_data_state": {
    "symbol": "NIFTY",
    "timeframes": {
      "1m": {},
      "5m": {},
      "15m": {},
      "1h": {},
      "1d": {}
    }
  }
}

This becomes the source of truth.

WF-01B
TREND_ANALYSIS_ENGINE

PURPOSE

Determine directional trend.

INPUT
market_data_state

From WF-01A.

OUTPUT
{
  "trend_state": {
    "direction": "BULLISH",
    "strength": 0.81,
    "confidence": 0.89
  }
}
ANALYTICS

Computes:

EMA

EMA20
EMA50
EMA100
EMA200

Slope

Crossovers

Trend Alignment

Multi-Timeframe Confirmation
WF-01B FLOW
01 RECEIVE_MARKET_DATA_STATE

02 VALIDATE_INPUT

03 EXTRACT_TIMEFRAMES

04 COMPUTE_EMA

05 COMPUTE_EMA_SLOPE

06 COMPUTE_CROSSOVER_STATE

07 COMPUTE_ALIGNMENT

08 BUILD_TREND_STATE

09 VALIDATE_TREND_STATE

10 EMIT_TREND_STATE
WF-01C
MARKET_STRUCTURE_ENGINE

PURPOSE

Determine market structure.

OUTPUT
{
  "structure_state": {
    "hh": true,
    "hl": true,
    "bos": true,
    "choch": false
  }
}
ANALYTICS
Swing High

Swing Low

HH

HL

LH

LL

BOS

CHOCH

Range

Compression
WF-01C FLOW
01 RECEIVE_MARKET_DATA_STATE

02 VALIDATE_INPUT

03 IDENTIFY_SWINGS

04 DETECT_HH_HL

05 DETECT_LH_LL

06 DETECT_BOS

07 DETECT_CHOCH

08 DETECT_RANGE

09 BUILD_STRUCTURE_STATE

10 EMIT_STRUCTURE_STATE
WF-01D
MOMENTUM_ANALYSIS_ENGINE

PURPOSE

Measure force behind movement.

OUTPUT
{
  "momentum_state": {
    "direction": "BULLISH",
    "strength": 0.72
  }
}
ANALYTICS
RSI

MACD

ROC

Momentum Score

Acceleration

Divergence
WF-01D FLOW
01 RECEIVE_MARKET_DATA_STATE

02 VALIDATE_INPUT

03 COMPUTE_RSI

04 COMPUTE_MACD

05 COMPUTE_ROC

06 DETECT_DIVERGENCE

07 COMPUTE_ACCELERATION

08 BUILD_MOMENTUM_STATE

09 VALIDATE

10 EMIT
WF-01E
VOLATILITY_ANALYSIS_ENGINE

THIS IS WHERE WE CURRENTLY ARE.

PURPOSE

Measure market volatility.

Not direction.

Not trend.

Only volatility.

OUTPUT
{
  "volatility_state": {
    "atr": 212.5,
    "volatility_score": 0.67,
    "volatility_regime": "HIGH"
  }
}
ANALYTICS
ATR

True Range

ATR Expansion

ATR Compression

Volatility Percentile

Historical Comparison

Regime Classification
WF-01E FLOW
01 RECEIVE_CANDLE_DATA

02 VALIDATE_INPUT

03 EXTRACT_TIMEFRAMES

04 COMPUTE_TRUE_RANGE

05 COMPUTE_ATR

06 COMPUTE_VOLATILITY_SCORE

07 COMPUTE_PERCENTILE

08 DETECT_EXPANSION

09 DETECT_COMPRESSION

10 CLASSIFY_REGIME

11 BUILD_VOLATILITY_STATE

12 VALIDATE_VOLATILITY_STATE

13 EMIT_VOLATILITY_STATE

Current node under review:

01 RECEIVE_CANDLE_DATA
WF-01F
MARKET_REGIME_ENGINE

PURPOSE

Combine all market dimensions.

INPUTS
trend_state

structure_state

momentum_state

volatility_state
OUTPUT
{
  "market_regime_state": {
    "regime": "TRENDING_BULL_HIGH_VOL"
  }
}
FLOW
01 RECEIVE_TREND

02 RECEIVE_STRUCTURE

03 RECEIVE_MOMENTUM

04 RECEIVE_VOLATILITY

05 VALIDATE_INPUTS

06 COMPUTE_REGIME

07 COMPUTE_CONFIDENCE

08 BUILD_REGIME_STATE

09 VALIDATE

10 EMIT
WF-01Z
MARKET_INTELLIGENCE_STATE

PURPOSE

Create the authoritative Domain-01 output.

This is the final workflow.

INPUTS
WF-01A
WF-01B
WF-01C
WF-01D
WF-01E
WF-01F
OUTPUT
{
  "market_intelligence_state": {
    "market_data_state": {},
    "trend_state": {},
    "structure_state": {},
    "momentum_state": {},
    "volatility_state": {},
    "market_regime_state": {}
  }
}
DOMAIN-01 DELIVERABLE

After WF-01Z completes, Domain-01 is finished.

The next domain consumes it:

DOMAIN-01
MARKET INTELLIGENCE
        │
        ▼
DOMAIN-02
SIGNAL INTELLIGENCE
Complete Platform Domain Chain
DOMAIN-01
MARKET INTELLIGENCE

        ▼

DOMAIN-02
SIGNAL INTELLIGENCE

        ▼

DOMAIN-03
DECISION INTELLIGENCE

        ▼

DOMAIN-04
RISK INTELLIGENCE

        ▼

DOMAIN-05
PORTFOLIO INTELLIGENCE

        ▼

DOMAIN-06
EXECUTION INTELLIGENCE

        ▼

DOMAIN-07
POSITION INTELLIGENCE

        ▼

DOMAIN-08
PERFORMANCE INTELLIGENCE

        ▼

DOMAIN-09
SYSTEM INTELLIGENCE

This is the institutional zoomed-out view of the entire platform, with Domain-01 expanded end-to-end and showing exactly where WF-01E sits in the overall architecture.


Let's Re-anchor Domain-01

We have already frozen:

WF-01A
MARKET_DATA_ENGINE

WF-01B
MARKET_HEALTH_ENGINE

WF-01C
TECHNICAL_INDICATOR_ENGINE

WF-01D
MARKET_STRUCTURE_ENGINE

WF-01E
TREND_ANALYSIS_ENGINE

WF-01F
VOLATILITY_ANALYSIS_ENGINE

WF-01G
MOMENTUM_ANALYSIS_ENGINE

WF-01H
MARKET_REGIME_ENGINE

WF-01Z
MARKET_INTELLIGENCE_STATE

This is now authoritative.

Therefore WF-01B Must Answer Only One Question

Not:

What is trend?

Not:

What is structure?

Not:

What is momentum?

Not:

What is volatility?

WF-01B only answers:

Can the market data be trusted?
Therefore Final Output Of WF-01B Should Be

Not:

{
  "trend_state": {}
}

That was drift.

Instead:

{
  "market_health_state": {}
}
What Should market_health_state Contain?

Before nodes, we must lock this.

Institutionally WF-01B should produce:

{
  "market_health_state": {
    "overall_status": "HEALTHY",
    "health_score": 98,

    "provider_status": "HEALTHY",

    "timeframes": {

      "1minute": {},
      "5minute": {},
      "15minute": {},
      "30minute": {},
      "60minute": {},
      "240minute": {},
      "day": {}

    }
  }
}
What Does Each Timeframe Need?

For each timeframe:

{
  "completeness_score": 100,

  "continuity_score": 100,

  "freshness_score": 100,

  "quality_score": 100,

  "health_score": 100,

  "status": "HEALTHY"
}
Why This Matters

WF-01C

TECHNICAL_INDICATOR_ENGINE

can then consume:

{
  "market_health_state": {
    "overall_status": "HEALTHY"
  }
}

and decide:

Proceed

or

Reject analysis

WF-01D

MARKET_STRUCTURE_ENGINE

can also use it.

WF-01E

TREND_ANALYSIS_ENGINE

can also use it.

WF-01F

VOLATILITY_ANALYSIS_ENGINE

can also use it.

Therefore Before Nodes

The first thing we should lock is:

WF-01B Output

market_health_state

Then define:

health_score

overall_status

timeframe_health

Then design nodes that produce that output.

Not the other way around.

So the immediate question is:

Do we want market_health_state to be:
Option A

Simple

HEALTHY
WARNING
UNHEALTHY
Option B

Institutional

health_score

completeness

continuity

freshness

quality

overall_status

I would strongly recommend Option B because downstream workflows can make deterministic decisions from it.

proceed with option b,

Good.

Then we should formally freeze the WF-01B output contract before designing any nodes.

This follows the institutional rule:

Output Contract
        ↓
Workflow Logic
        ↓
Node Design
        ↓
Implementation

Not the reverse.

WF-01B
MARKET_HEALTH_ENGINE
PURPOSE

Determine whether the market data received from:

WF-01A
AGGREGATE_TIMEFRAMES

is trustworthy enough for downstream intelligence workflows.

WF-01B does NOT analyze:

Trend
Structure
Momentum
Volatility
Regime

WF-01B only analyzes:

Completeness
Continuity
Freshness
Quality
AUTHORITATIVE OUTPUT
market_health_state
AUTHORITATIVE OUTPUT CONTRACT
{
  "processing_context": {
    "workflow_id": "WF-01B",
    "workflow_name": "MARKET_HEALTH_ENGINE",
    "generated_at": "timestamp"
  },

  "summary": {
    "overall_status": "HEALTHY",
    "health_score": 97,
    "healthy_timeframes": 7,
    "warning_timeframes": 0,
    "unhealthy_timeframes": 0
  },

  "market_health_state": {

    "provider_status": "HEALTHY",

    "timeframes": {

      "1minute": {},
      "5minute": {},
      "15minute": {},
      "30minute": {},
      "60minute": {},
      "240minute": {},
      "day": {}

    }

  },

  "audit": {},

  "record_counts": {},

  "contains": [
    "market_health_state"
  ]
}
TIMEFRAME HEALTH CONTRACT

Every timeframe should produce the exact same structure.

Example:

{
  "1minute": {

    "status": "HEALTHY",

    "health_score": 98,

    "completeness": {
      "score": 100,
      "missing_candles": 0
    },

    "continuity": {
      "score": 100,
      "gap_count": 0,
      "duplicate_count": 0
    },

    "freshness": {
      "score": 95,
      "latest_candle_age_seconds": 42
    },

    "quality": {
      "score": 98,
      "invalid_ohlc_count": 0,
      "invalid_volume_count": 0
    }

  }
}
STATUS CLASSIFICATION

Every timeframe receives:

HEALTHY
WARNING
UNHEALTHY
HEALTH SCORE

Range:

0-100

Recommended weighting:

Completeness    35%
Continuity      30%
Freshness       20%
Quality         15%

Total:

100%

Reason:

Missing candles and broken continuity are more dangerous than slightly stale data.

OVERALL STATUS RULE
Health Score >= 90
→ HEALTHY

Health Score 70-89
→ WARNING

Health Score < 70
→ UNHEALTHY
WHAT WF-01C WILL RECEIVE

TECHNICAL_INDICATOR_ENGINE should consume:

{
  "market_health_state": {
    "overall_status": "HEALTHY"
  }
}

and can enforce:

HEALTHY
    → compute indicators

WARNING
    → compute indicators + warning

UNHEALTHY
    → reject analysis
WF-01B WORKFLOW OBJECTIVE (NOW LOCKED)

Input:

WF-01A
AGGREGATE_TIMEFRAMES

Output:

market_health_state

Answer provided by workflow:

Can this market data be trusted?

Once you approve this output contract, we move to:

WF-01B

NODE-01
RECEIVE_CANDLE_UNIVERSE

DESCRIBE
IMPLEMENT
VALIDATE

and begin the actual node-by-node build.
