Decision-Centric Architecture

Instead of building by API type, build by decision layers.

TRADING OBJECTIVE

          │
          ▼

Should I Trade?

          │
          ▼

Direction?

CE / PE / NO TRADE

          │
          ▼

Which Expiry?

          │
          ▼

Which Strike?

          │
          ▼

Entry Price

          │
          ▼

Risk

          │
          ▼

Execution
Column-01 becomes "Market Situation"

Instead of Market Foundation, the first operational column becomes:

COLUMN-01

MARKET SITUATION

Its only responsibility is to determine the current market condition.

Engine 1 — Market Direction
Bullish

Bearish

Sideways

Volatile

Range

Breakout

Breakdown

Output:

{
  "market_direction": "BULLISH"
}
Engine 2 — Trend Strength
Strong Bull

Weak Bull

Neutral

Weak Bear

Strong Bear

Output:

{
  "trend_strength": "STRONG_BULL"
}
Engine 3 — Volatility State
Low

Normal

High

Extreme
Engine 4 — Market Health
Healthy

Weak

Distribution

Accumulation

Exhaustion
Engine 5 — Liquidity
Excellent

Good

Average

Poor
Engine 6 — Session State
Opening

Morning

Midday

Power Hour

Closing
The Result

After six engines, the platform knows the market situation.

Example:

{
  "direction": "BULLISH",
  "trend": "STRONG",
  "volatility": "NORMAL",
  "health": "HEALTHY",
  "liquidity": "HIGH",
  "session": "OPENING"
}

No option data yet.

Column-02 — Option Opportunity

Now ask:

Given the current market situation,

Should I trade CE?

Should I trade PE?

Should I avoid trading?

This is where option-specific analytics begin.

Inputs include:

Market Situation
Live Price
Option Chain
Open Interest
PCR
IV
Greeks

Output:

{
  "decision": "BUY_CE",
  "confidence": 92
}

or

{
  "decision": "BUY_PE",
  "confidence": 88
}

or

{
  "decision": "NO_TRADE"
}
Column-03 — Contract Selection

Only after deciding CE, PE, or NO_TRADE do you determine:

Nearest expiry

Weekly

Monthly

ATM

ITM

OTM

Strike selection
Column-04 — Entry Intelligence

Determine:

Entry price
Confirmation
Stop-loss
Target
Risk-reward
Column-05 — Execution

Place the order and manage the position.

Recommendation

This decision-first architecture aligns much more closely with how discretionary and systematic options trading actually works. The platform first classifies the market situation, then decides whether a trade exists, and only then concerns itself with contract selection and execution.

I would go one step further and define the Market Situation column as a formal "Market Situation Engine" composed of deterministic sub-engines (trend, volatility, health, liquidity, session, breadth, structure, etc.), producing a single normalized market-state object that every downstream decision engine consumes. This keeps CE/PE selection independent of broker APIs and focused on the trading decision itself.



--------------------------------

COLUMN-01 — MARKET SITUATION
Objective

Determine the current market environment without making any trading decision.

Input

Live Market Data
Candles
Market Breadth
Derivatives Snapshot
Session Information

Output

{
  "market_situation": {
    "trend": {},
    "momentum": {},
    "volatility": {},
    "structure": {},
    "liquidity": {},
    "session": {},
    "breadth": {},
    "options": {},
    "confidence": 0.91
  }
}
Proposed Engines

Rather than only six engines, I recommend nine deterministic engines.

MS-01 — Trend Engine

Question

What is the primary market direction?

Output

STRONG_BULLISH
BULLISH
NEUTRAL
BEARISH
STRONG_BEARISH

Consumes

EMA
Supertrend
Moving Average Alignment
Higher Timeframe Trend
MS-02 — Momentum Engine

Question

Is the move gaining or losing strength?

Consumes

RSI
MACD
ADX
ROC
Volume Momentum

Output

STRONG
BUILDING
WEAKENING
NONE
MS-03 — Volatility Engine

Question

Is volatility suitable for option buying?

Consumes

ATR
India VIX
IV
Historical Volatility

Output

LOW
NORMAL
HIGH
EXTREME
MS-04 — Market Structure Engine

Question

What structure is price currently forming?

Output

TREND
RANGE
BREAKOUT
BREAKDOWN
ACCUMULATION
DISTRIBUTION
MS-05 — Liquidity Engine

Question

Is there enough liquidity?

Consumes

Volume
Bid/Ask Spread
Market Depth

Output

EXCELLENT
GOOD
AVERAGE
POOR
MS-06 — Session Engine

Question

Which market phase are we in?

Output

PRE_OPEN
OPENING
MORNING
MID_SESSION
POWER_HOUR
CLOSING
POST_MARKET
MS-07 — Breadth Engine

Question

Is the market internally supporting the move?

Consumes

Advance/Decline
Sector Strength
Index Participation

Output

VERY_BULLISH
BULLISH
MIXED
BEARISH
VERY_BEARISH
MS-08 — Derivative Engine

Question

What are option participants doing?

Consumes

PCR
OI
OI Change
Max Pain
IV
Greeks

Output

BULLISH
BEARISH
NEUTRAL
MS-09 — Situation Synthesizer

This is the only engine that combines the outputs of MS-01 through MS-08.

Output

{
  "market_situation": {
    "trend": "BULLISH",
    "momentum": "STRONG",
    "volatility": "NORMAL",
    "structure": "BREAKOUT",
    "liquidity": "GOOD",
    "session": "OPENING",
    "breadth": "BULLISH",
    "derivatives": "BULLISH",
    "confidence": 94
  }
}
Visual Architecture
                    COLUMN-01
               MARKET SITUATION
──────────────────────────────────────────────────

MS-01 Trend Engine
          │
MS-02 Momentum Engine
          │
MS-03 Volatility Engine
          │
MS-04 Market Structure Engine
          │
MS-05 Liquidity Engine
          │
MS-06 Session Engine
          │
MS-07 Breadth Engine
          │
MS-08 Derivative Engine
          │
          ▼
MS-09 Situation Synthesizer
          │
          ▼
 MARKET SITUATION PROFILE
Downstream Consumption

This profile becomes the input to the next decision layer:

COLUMN-01
Market Situation Profile
          │
          ▼
COLUMN-02
Trade Decision Engine

Should Trade?
       │
       ├── BUY CE
       ├── BUY PE
       └── NO TRADE
Why this boundary?

This separation keeps the system deterministic:

Column-01 answers: "What is the market doing?"
Column-02 answers: "Given that market situation, should I trade?"
Column-03 answers: "Which option contract should I trade?"

This avoids mixing market analysis with trading decisions and creates a reusable market intelligence layer that every strategy can consume.

----------------------------

Agreed.

From this point onward, we should switch from architecture mode to implementation mode.

We will build one node at a time, validate it, and then move to the next node. No placeholders, no skipped logic.

COLUMN-01 : MARKET SITUATION
Build Order
MS-01  Market Direction Engine
MS-02  Trend Strength Engine
MS-03  Momentum Engine
MS-04  Volatility Engine
MS-05  Market Structure Engine
MS-06  Liquidity Engine
MS-07  Session Engine
MS-08  Breadth Engine
MS-09  Derivative Situation Engine
MS-10  Market Situation Synthesizer
STEP-01
MS-01 — Market Direction Engine

This becomes the first intelligence engine of the entire platform.

Its responsibility is only one thing:

Determine the current market direction.

It does not decide CE/PE.

It does not analyse options.

It does not generate signals.

Inputs

We first define what information this node consumes.

At this stage I would not connect indicators directly.

Instead, the engine should consume normalized market data.

Example inputs:

Market Price
Open
High
Low
Close

Previous Close

Current Candle

Higher Timeframe Candle

Volume

Later, additional normalized inputs (EMA, Supertrend, etc.) can be incorporated through dedicated analysis engines without changing this engine's contract.

Outputs

The engine should emit a normalized object rather than a simple label.

{
  "engine": "MS01_MARKET_DIRECTION",
  "timestamp": "...",
  "direction": {
    "state": "BULLISH",
    "score": 78,
    "confidence": 0.91
  }
}

Possible states:

STRONG_BULLISH
BULLISH
NEUTRAL
BEARISH
STRONG_BEARISH
n8n Topology
MS01_001_INPUT
        │
        ▼
MS01_002_VALIDATE_INPUT
        │
        ▼
MS01_003_ANALYZE_DIRECTION
        │
        ▼
MS01_004_NORMALIZE_RESULT
        │
        ▼
MS01_005_PUBLISH

Every future Market Situation engine (MS-02 to MS-09) should follow this identical five-node topology. This keeps the platform deterministic and easy to maintain.

First Implementation Decision

Before writing MS01_001_INPUT, we need to define the source of truth for market direction.

There are several valid approaches:

Method	Data Required	Advantages	Considerations
Price Action	OHLC, previous close	Simple, fast	Less context
Moving Average Alignment	EMA 9/20/50/200	Stable trend detection	Requires indicator calculation
Supertrend	OHLC + ATR	Popular for trend following	Indicator dependency
Multi-Timeframe Consensus	M5, M15, H1 trend	More robust	More computation
Hybrid Score	Price Action + EMA + Supertrend + ADX	Most reliable	More complex but suitable for institutional systems
Recommendation

For an institutional trading platform, I recommend not hard-coding trend logic into MS-01. Instead, define MS-01 as an orchestration engine that consumes normalized outputs from dedicated analysis components (e.g., EMA alignment, Supertrend, price structure) and produces a unified direction assessment. This keeps MS-01 stable while allowing individual analysis methods to evolve independently.

This will make the entire Market Situation column modular, deterministic, and extensible as you add more analytical capabilities.

----------------


Current WF-01A Status
Historical Candle
✅ HTTP
✅ Normalize
✅ Validate
✅ Audit
Intraday Candle
✅ HTTP
✅ Normalize
✅ Validate
✅ Audit
Output Quality
✅ Canonical data contract
✅ Validation layer
✅ Audit layer
✅ Stable runtime during market hours
✅ Graceful handling of no-data scenarios

This foundation is complete.

What is actually pending

The missing pieces are not additional collectors. They are the inputs required for the trading decision.

1. Instrument Universe

Before analysis, the workflow needs to know what to analyse.

Example:

Underlying
    ↓
NIFTY
BANKNIFTY
FINNIFTY

This is a configuration/input step, not another data collector.

Status: Pending

2. Timeframe Coordination

You have candles, but the workflow needs to define how different timeframes contribute to the decision.

Example:

Daily
    ↓
Trend

15 Minute
    ↓
Structure

5 Minute
    ↓
Setup

1 Minute
    ↓
Entry

Status: Pending

3. Market Structure Engine

From the candles, derive:

Higher High
Higher Low
Lower High
Lower Low
Break of Structure
Change of Character

Status: Pending

4. Trend Engine

Determine:

Bullish
Bearish
Sideways

Status: Pending

5. Momentum Engine

Determine:

Strong buying
Weak buying
Strong selling
Weak selling

Status: Pending

6. Volatility Engine

Determine:

Expanding volatility
Contracting volatility
Normal volatility

Status: Pending

7. Support & Resistance

Derive key levels from the candle data.

Status: Pending

8. Option Chain Integration

Collect:

ATM
OTM
ITM
Open Interest
Change in OI
Volume

Without this, the workflow cannot rank CE/PE strikes.

Status: Pending

9. Strike Selection Logic

This is the first true decision layer.

Example:

Underlying

↓

ATM

↓

Nearby strikes

↓

Liquidity

↓

Premium range

↓

Candidate strikes

Status: Pending

10. Trade Decision

The final workflow should answer:

Buy CE

or

Buy PE

or

No Trade

with:

Entry
Stop Loss
Target
Confidence
Reason

Status: Pending

Overall Assessment
Layer	Status
Market Data Collection	✅ Complete
Data Normalization	✅ Complete
Data Validation	✅ Complete
Data Audit	✅ Complete
Market Structure Analysis	⏳ Pending
Trend Analysis	⏳ Pending
Momentum Analysis	⏳ Pending
Volatility Analysis	⏳ Pending
Support & Resistance	⏳ Pending
Option Chain Analysis	⏳ Pending
Strike Selection	⏳ Pending
CE/PE Decision Engine	⏳ Pending
Recommendation

Do not expand the market data collection layer further. It is sufficient for the current objective.

The next phase should be to consume the validated candle data and build the Market Intelligence layers that ultimately produce a deterministic CE/PE selection. This keeps the implementation aligned with your stated flow rather than drifting into unnecessary infrastructure.



------------------------
