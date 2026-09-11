# INSTITUTIONAL-GRADE FOREX TRADING PLATFORM
## FULL END-TO-END ARCHITECTURE — PRODUCTION DESIGN
### Version 1.0 | Confidential | Authoritative Reference

---

# PART 1 — TRADING PLATFORM ARCHITECTURE

---

## 1.1 SYSTEM OVERVIEW

```
╔══════════════════════════════════════════════════════════════════════════╗
║              INSTITUTIONAL FOREX TRADING PLATFORM                        ║
║                                                                           ║
║  Objective : Consistent risk-adjusted returns at scale                   ║
║  Model     : Event-driven, deterministic, replay-safe                    ║
║  Identity  : SHA-256 hash-chained across all layers                      ║
║  Authority : Kafka event log = single source of truth                    ║
╚══════════════════════════════════════════════════════════════════════════╝
```

**Non-Negotiable System Guarantees:**

| Guarantee | Definition |
|---|---|
| Determinism | Identical input → identical output, always |
| Replayability | Full system replay from Kafka event log |
| No Hidden State | All state derived from event log only |
| Ordering Integrity | Global + partition ordering preserved |
| Identity Preservation | No ID regeneration in OMS/EMS layer |
| Lineage Continuity | Unbroken hash chain from signal → fill |
| Event-Time Governance | All logic uses `event_time` (no system clock) |

---

## 1.2 MASTER PHASE ARCHITECTURE (A → D)

```
 ┌──────────────────────────────────────────────────────────────────────┐
 │  PHASE 0    — GOVERNANCE LAYER                                        │
 │               (decision authority, versioning, change control)        │
 └─────────────────────────────┬────────────────────────────────────────┘
                                │
                                ▼
 ┌──────────────────────────────────────────────────────────────────────┐
 │  PHASE A    — TRADING LOGIC LAYER                                     │
 │               (strategy taxonomy, signal generation, trade intent)    │
 └─────────────────────────────┬────────────────────────────────────────┘
                                │ TradeIntent_v1
                                ▼
 ┌──────────────────────────────────────────────────────────────────────┐
 │  PHASE B    — CONSTRAINT LAYER                                        │
 │               (risk constraints, limits, enforceable boundaries)      │
 └─────────────────────────────┬────────────────────────────────────────┘
                                │ constraint_output
                                ▼
 ┌──────────────────────────────────────────────────────────────────────┐
 │  PHASE C    — INFRASTRUCTURE LAYER                                    │
 │               (event system, state model, orchestration, storage)     │
 └─────────────────────────────┬────────────────────────────────────────┘
                                │ execution_ready_system_state
                                ▼
 ┌──────────────────────────────────────────────────────────────────────┐
 │  PHASE D    — EXECUTION PIPELINE                                      │
 │               (execution intent → risk → policy → order → fill)      │
 └─────────────────────────────┬────────────────────────────────────────┘
                                │
                                ▼
                         EXTERNAL BROKERS
```

---

## 1.3 COMPLETE TRADING DATA FLOW

```
 ┌─────────────────────────────────────────────────────────────────────────────────────────┐
 │                      COMPLETE END-TO-END TRADING DATA FLOW                               │
 └─────────────────────────────────────────────────────────────────────────────────────────┘

  [EXTERNAL FEEDS]
  Forex Broker APIs ──┐
  ECN/Prime Broker ───┤
  Market Data Vendors─┘
          │
          ▼
  ┌───────────────────┐
  │  Market Data      │  → raw_market_data_stream (Kafka)
  │  Ingestion Svc    │  → Tick data, BBO, OHLC, Depth
  └────────┬──────────┘
           │
           ▼
  ┌───────────────────┐
  │  Market Data      │  → normalized_market_data_stream (Kafka)
  │  Normalizer Svc   │  → Validates, deduplicates, stamps event_time
  └────────┬──────────┘
           │
           ├──────────────────────────────────────────────────┐
           │                                                  │
           ▼                                                  ▼
  ┌───────────────────┐                            ┌──────────────────────┐
  │  TimescaleDB      │                            │  Feature Store       │
  │  (tick/OHLC       │                            │  (computed           │
  │   storage)        │                            │   indicators)        │
  └───────────────────┘                            └──────────┬───────────┘
                                                              │
                                                              ▼
  ──────────────────────────────── PHASE A ───────────────────────────────

  ┌──────────────────────────────────────────────────────────────────────┐
  │                    STRATEGY ENGINE SERVICE                            │
  │                                                                       │
  │  Strategy Taxonomy:                                                   │
  │    Time Horizon : HFT / Intraday / Swing / Positional                 │
  │    Signal Type  : Momentum / MeanRev / Arbitrage / ML                 │
  │    Data Dep     : Price / Orderbook / Macro / Alt-data                │
  │    Exec Style   : Aggressive / Passive                                │
  │                                                                       │
  │  Signal = f(Market State, Strategy Config, Internal Logic)            │
  │  Market State = fully ordered, time-indexed at event_time             │
  └────────────────────────────┬─────────────────────────────────────────┘
                               │
                               ▼
  ┌──────────────────────────────────────────────────────────────────────┐
  │                    SIGNAL PROCESSOR SERVICE                           │
  │                                                                       │
  │  Output: Signal_v1 {                                                  │
  │    signal_id        = HASH_v1(CBE_encode(signal_payload))             │
  │    strategy_id                                                        │
  │    instrument       (e.g., EUR/USD, GBP/JPY)                          │
  │    direction        ∈ {+1=LONG, 0=NEUTRAL, -1=SHORT}                 │
  │    signal_strength  ∈ [0,1] (monotonic, deterministic)               │
  │    validity_window  (expiry = event_time + validity_window)           │
  │    event_time       (epoch nanoseconds, UTC, exchange-sourced)        │
  │  }                                                                    │
  └────────────────────────────┬─────────────────────────────────────────┘
                               │ → signal_events (Kafka)
                               ▼
  ┌──────────────────────────────────────────────────────────────────────┐
  │                    DECISION ENGINE SERVICE                            │
  │                                                                       │
  │  Functions:                                                           │
  │    - Multi-signal aggregation (conflict resolution)                   │
  │    - priority_level enforcement (from Phase A, immutable)             │
  │    - Trade intent formation                                           │
  │                                                                       │
  │  Output: TradeIntent_v1 {                                             │
  │    trade_intent_id  = HASH_v1(CBE_encode([instrument, direction,      │
  │                       size, aggregation_score, signal_ids_sorted,     │
  │                       event_time]))                                   │
  │    instrument                                                         │
  │    direction        ∈ {BUY, SELL}                                     │
  │    size             (int64, fixed-point, no floats)                   │
  │    aggregation_score                                                  │
  │    signal_ids       (List<bytes32>, SORTED)                           │
  │    event_time       (int64, epoch ns)                                 │
  │    encoding_version = 1                                               │
  │  }                                                                    │
  └────────────────────────────┬─────────────────────────────────────────┘
                               │ → decision_events (Kafka)
                               │
                               │      [CEIL MERGE POINT]
                               │  ┌───────────────────────────────┐
                               │  │  CEIL (Controlled External     │
                               │  │  Input Layer)                  │
                               │  │  External Source → CEIL →      │
                               │  │  Validated External Intent     │
                               │  │  origin_type = EXTERNAL        │
                               │  └───────────┬───────────────────┘
                               └──────────────┤
                                              ▼

  ──────────────────────────────── PHASE D ───────────────────────────────

  ┌──────────────────────────────────────────────────────────────────────┐
  │  STEP D1: EXECUTION INTENT SERVICE                                   │
  │                                                                       │
  │  TradeIntent → ExecutionIntent                                        │
  │  (zero logic mutation, strict pass-through + schema normalization)    │
  │                                                                       │
  │  ExecutionIntent = F(TradeIntent, configuration_snapshot)             │
  │  lineage_hash = HASH_v1(parent_event.lineage_hash + intent_id)        │
  │  origin_type ∈ {CORE, EXTERNAL}                                       │
  └────────────────────────────┬─────────────────────────────────────────┘
                               │ → execution_intent_stream (Kafka)
                               ▼
  ┌──────────────────────────────────────────────────────────────────────┐
  │  STEP D2: DECISION ENGINE (EXECUTION SIDE)                            │
  │                                                                       │
  │  Validates ExecutionIntent against:                                   │
  │    - market conditions                                                │
  │    - time window constraints                                          │
  │    - instrument policy                                                │
  │    - duplicate / stale intent detection                               │
  │                                                                       │
  │  Output: DecisionValidated event                                      │
  └────────────────────────────┬─────────────────────────────────────────┘
                               │ → decision_validated_stream (Kafka)
                               ▼
  ┌──────────────────────────────────────────────────────────────────────┐
  │  STEP D3: RISK ENGINE SERVICE                                         │
  │                                                                       │
  │  Enforcement Hierarchy (strict):                                      │
  │    Firm-level > Portfolio > Strategy > Trade                          │
  │                                                                       │
  │  Checks:                                                              │
  │    [1] Max position size per instrument                               │
  │    [2] Max daily loss threshold (firm kill-switch)                    │
  │    [3] Max drawdown tolerance                                         │
  │    [4] Capital at risk per trade                                      │
  │    [5] Exposure concentration                                         │
  │    [6] Correlation limits (cross-pair)                                │
  │    [7] EXTERNAL origin → stricter thresholds (reduced capital,        │
  │        tighter exposure, stricter drawdown)                           │
  │                                                                       │
  │  Output: RiskApproved | RiskRejected                                  │
  └────────────────────────────┬─────────────────────────────────────────┘
                               │ → risk_approved_stream (Kafka)
                               ▼
  ┌──────────────────────────────────────────────────────────────────────┐
  │  STEP D4: POLICY ENGINE SERVICE                                       │
  │                                                                       │
  │  Execution Throttling + Operational Rules:                            │
  │    - Rate limits (orders/sec per instrument)                          │
  │    - Market session constraints (London/NY/Tokyo/Sydney)              │
  │    - Instrument whitelist enforcement                                 │
  │    - Execution time-window validation                                 │
  │    - Broker routing policy                                            │
  │    - Anti-gaming / wash-trade detection                               │
  │                                                                       │
  │  Output: PolicyDecision event                                         │
  └────────────────────────────┬─────────────────────────────────────────┘
                               │ → policy_decision_stream (Kafka)
                               ▼
  ┌──────────────────────────────────────────────────────────────────────┐
  │  STEP D5: ORDER ENGINE SERVICE                                        │
  │                                                                       │
  │  Order Lifecycle:                                                     │
  │   Create → Validate → Emit → Acknowledge → Fill → Partial →          │
  │   Cancel → Close                                                      │
  │                                                                       │
  │  ExecutionOrder = {                                                   │
  │    order_id         = HASH_v1(execution_intent_id + risk_hash +      │
  │                       policy_hash)                                    │
  │    trade_intent_id  (preserved, NOT regenerated)                      │
  │    instrument                                                         │
  │    direction                                                          │
  │    quantity                                                           │
  │    order_type       (MARKET / LIMIT / STOP)                           │
  │    execution_type   (from config snapshot)                            │
  │    time_in_force                                                      │
  │    event_time       (propagated, never mutated)                       │
  │    lineage_hash     (extended chain)                                  │
  │  }                                                                    │
  └────────────────────────────┬─────────────────────────────────────────┘
                               │ → execution_order_stream (Kafka)
                               ▼
  ┌──────────────────────────────────────────────────────────────────────┐
  │  STEP D6: EXECUTION ROUTER (SOR)                                      │
  │                                                                       │
  │  Smart Order Router:                                                  │
  │    - Broker selection (cost, latency, fill quality)                   │
  │    - Liquidity routing (Prime broker / ECN / LP)                      │
  │    - Failover routing (automatic)                                     │
  │    - Slippage control                                                 │
  │                                                                       │
  └────────────────────────────┬─────────────────────────────────────────┘
                               │
                               ▼
  ┌──────────────────────────────────────────────────────────────────────┐
  │  OMS → EMS → BROKER ADAPTER                                          │
  │                                                                       │
  │  OMS (Order Management System) — TRANSPORT ONLY                      │
  │    - Maintains order state machine                                    │
  │    - Does NOT create new IDs (inherits from ExecutionOrder)           │
  │    - Protocol: FIX 4.4 / REST / WebSocket                            │
  │                                                                       │
  │  EMS (Execution Management System) — TRANSPORT ONLY                  │
  │    - Direct broker connectivity                                       │
  │    - Heartbeat management                                             │
  │    - Session recovery                                                 │
  │                                                                       │
  │  Broker Adapter Service                                               │
  │    - Broker normalization layer                                       │
  │    - Interactive Brokers / Alpaca / MT5 / FIX adapters               │
  │    - Multi-broker routing + failover                                  │
  └────────────────────────────┬─────────────────────────────────────────┘
                               │
                               ▼
                     EXTERNAL BROKER / ECN
                               │
                               ▼ (Fill event)
  ┌──────────────────────────────────────────────────────────────────────┐
  │  STEP D7: FILL HANDLER SERVICE                                        │
  │                                                                       │
  │  Processes: Fill / Partial Fill / Rejection                           │
  │  Emits: fill_stream → reconciliation_stream → portfolio_update        │
  │  Lineage: fill_event links back to original signal_id                 │
  └────────────────────────────┬─────────────────────────────────────────┘
                               │ → fill_stream (Kafka)
                               ▼
  ┌──────────────────────────────────────────────────────────────────────┐
  │  STEP D8: RECONCILIATION SERVICE                                      │
  │                                                                       │
  │  - Broker statement vs internal state comparison                      │
  │  - Mismatch detection + alerting                                      │
  │  - Position reconciliation                                            │
  │  - PnL reconciliation                                                 │
  └────────────────────────────┬─────────────────────────────────────────┘
                               │ → reconciliation_stream (Kafka)
                               ▼
  ┌──────────────────────────────────────────────────────────────────────┐
  │  PORTFOLIO SERVICE (STATE AUTHORITY)                                  │
  │                                                                       │
  │  State model: State(t) = f(Event_Log[0 → t])                         │
  │  Snapshot   : derived(State) → stored in PostgreSQL                   │
  │                                                                       │
  │  Tracks:                                                              │
  │    - Open positions (per instrument, per account, per strategy)       │
  │    - Realized PnL (fee + slippage included)                           │
  │    - Unrealized PnL (mark-to-market, live pricing)                    │
  │    - Exposure (per instrument, per currency, total)                   │
  │    - Drawdown (current, peak, rolling)                                │
  │    - Capital allocation (per account + per strategy partition)        │
  └────────────────────────────┬─────────────────────────────────────────┘
                               │
                               ▼
  ┌──────────────────────────────────────────────────────────────────────┐
  │  FEEDBACK / LEARNING LOOP (PHASE A STEP 8)                           │
  │                                                                       │
  │  performance_snapshot_set = f(                                        │
  │    portfolio_state_snapshot,                                          │
  │    outcome_record_set,                                                │
  │    configuration_snapshot                                             │
  │  )                                                                    │
  │                                                                       │
  │  Lifecycle: Collect → Validate → Evaluate → Update → Version →       │
  │             Approve → Deploy (governance gate required)               │
  │                                                                       │
  │  Controls: bounded parameter updates (delta_max enforced)            │
  │            no auto-deployment, no overfitting loops                   │
  └──────────────────────────────────────────────────────────────────────┘
```

---

## 1.4 COMPLETE LINEAGE HASH CHAIN

```
 signal_id
     │   = HASH_v1(CBE_encode(signal_payload))
     ▼
 trade_intent_id
     │   = HASH_v1(CBE_encode([instrument, direction, size,
     │             aggregation_score, signal_ids_sorted, event_time]))
     ▼
 execution_intent_lineage_hash
     │   = HASH_v1(parent_event.lineage_hash + execution_intent_id)
     ▼
 decision_lineage_hash
     │   = HASH_v1(execution_intent_lineage_hash + decision_id)
     ▼
 risk_lineage_hash
     │   = HASH_v1(decision_lineage_hash + risk_check_id)
     ▼
 policy_lineage_hash
     │   = HASH_v1(risk_lineage_hash + policy_id)
     ▼
 order_lineage_hash
     │   = HASH_v1(policy_lineage_hash + order_id)
     ▼
 fill_lineage_hash
         = HASH_v1(order_lineage_hash + fill_id)

 ─────────────────────────────────────────────────
 ANY CHAIN BREAK → SYSTEM INVALID → HALT
 ─────────────────────────────────────────────────
 All hashes: SHA-256, canonical byte encoding (CBE)
 All fields: fixed-point int64 (NO floating point)
 All times : epoch nanoseconds UTC (NO system clock)
```

---

## 1.5 COMPLETE KAFKA EVENT STREAM DESIGN

```
PARTITION KEY RULE: account_id + order_id (strict ordering enforced)

 ┌──────────────────────────────────────────────────────────────────────┐
 │  MARKET DATA STREAMS                                                 │
 │                                                                      │
 │  raw_market_data          → raw ticks, BBO, depth (pre-validation)  │
 │  normalized_market_data   → validated, deduplicated, event_time      │
 └──────────────────────────────────────────────────────────────────────┘

 ┌──────────────────────────────────────────────────────────────────────┐
 │  CORE TRADING STREAMS                                                │
 │                                                                      │
 │  signal_events            → Phase A signal output                   │
 │  decision_events          → TradeIntent from Decision Engine         │
 │  constraint_events        → Phase B constraint evaluation results    │
 │  system_events            → platform health / control events         │
 └──────────────────────────────────────────────────────────────────────┘

 ┌──────────────────────────────────────────────────────────────────────┐
 │  EXECUTION PIPELINE STREAMS                                          │
 │                                                                      │
 │  execution_intent_stream  → D1 output (ExecutionIntent)              │
 │  decision_validated_stream→ D2 output (validated for execution)      │
 │  risk_approved_stream     → D3 output (risk-cleared intents)         │
 │  policy_decision_stream   → D4 output (policy-approved intents)      │
 │  execution_order_stream   → D5 output (ExecutionOrder)               │
 │  fill_stream              → D7 output (Fill / Partial / Reject)      │
 │  reconciliation_stream    → D8 output (reconciled state deltas)      │
 └──────────────────────────────────────────────────────────────────────┘

 ┌──────────────────────────────────────────────────────────────────────┐
 │  FAILURE / CONTROL STREAMS                                           │
 │                                                                      │
 │  dead_letter_stream       → failed events (all stages)               │
 │  retry_stream             → retryable events with backoff metadata   │
 │  kill_switch_stream       → emergency halt events                    │
 │  audit_stream             → full audit trail (immutable)             │
 └──────────────────────────────────────────────────────────────────────┘

 TOPIC CONFIGURATION:
   retention.ms             = 7 days (audit streams: permanent)
   min.insync.replicas      = 2 (production: 3 brokers)
   replication.factor       = 3 (production)
   cleanup.policy           = delete (audit: compact + delete)
   Schema validation        = Confluent Schema Registry (Avro)
```

---

## 1.6 COMPLETE SERVICE CATALOGUE

### PHASE A — Trading Logic Services

| Service | Role | Input | Output |
|---|---|---|---|
| market-data-ingestion | Raw feed ingestion | Broker APIs / Vendor feeds | raw_market_data |
| market-data-normalizer | Validation + dedup | raw_market_data | normalized_market_data |
| feature-store | Indicator computation | normalized_market_data | feature vectors |
| strategy-engine-service | Signal generation | Market state + config | signal_events |
| signal-processor | Signal validation + lifecycle | signal_events | validated signals |

### PHASE B — Constraint Services

| Service | Role | Input | Output |
|---|---|---|---|
| constraint-engine-service | Phase B enforcement spec | trade_intent + portfolio state | constraint_output |

### PHASE C — Infrastructure / Core Services

| Service | Role | Input | Output |
|---|---|---|---|
| event-ingestion-service | Raw event intake | All producers | Validated entry into Kafka |
| event-validation-service | Schema + content validation | Raw events | Validated events / DLQ |
| event-ordering-service | Global ordering guarantee | Validated events | Ordered event stream |
| identity-service | Deterministic ID + lineage | All entity payloads | hash-identified entities |
| orchestration-service | Pipeline stage routing | Events | Service dispatch |
| state-update-service | Portfolio + system state update | fill_stream + reconciliation | State delta |
| snapshot-service | Periodic state snapshot | State deltas | StateSnapshot in PostgreSQL |
| replay-engine | Deterministic replay from log | Kafka log | Replay output |

### PHASE D — Execution Pipeline Services

| Service | Role | Input | Output |
|---|---|---|---|
| execution-intent-service | TradeIntent → ExecutionIntent | decision_events | execution_intent_stream |
| decision-engine-service | Execution-side validation | execution_intent_stream | decision_validated_stream |
| risk-engine-service | Risk enforcement | decision_validated_stream | risk_approved_stream |
| policy-engine-service | Policy + throttle control | risk_approved_stream | policy_decision_stream |
| order-engine-service | Order construction + lifecycle | policy_decision_stream | execution_order_stream |
| execution-router (SOR) | Smart order routing | execution_order_stream | broker dispatch |
| fill-handler-service | Fill processing | Broker fills | fill_stream |
| reconciliation-service | Broker vs internal state | fill_stream + broker statements | reconciliation_stream |

### Trading Infra Services

| Service | Role | Protocol |
|---|---|---|
| OMS | Order state machine — transport only | FIX 4.4 / WebSocket |
| EMS | Broker connectivity — transport only | FIX / REST / WebSocket |
| broker-adapter-service | Broker normalization | Per-broker adapter |
| broker-routing-layer | Multi-broker selection + failover | Internal |

### Portfolio / Risk State Services

| Service | Role | Authority |
|---|---|---|
| portfolio-service | State authority | Positions, PnL, exposure |
| exposure-service | Real-time exposure calculation | Per instrument / currency |
| capital-partition-service | Account + strategy capital isolation | Per account_id |

### Platform Services

| Service | Role |
|---|---|
| api-gateway | Rate limiting, request validation, auth |
| auth-service | Keycloak RBAC |
| config-service | Source of all configuration |
| config-snapshot-service | Immutable snapshot generator |
| audit-service | Append-only audit log |
| monitoring-service | System health aggregation |
| failure-handling-service | Dead letter + retry orchestration |
| historical-data-service | OHLC + tick history API |
| backtest-engine | Deterministic historical replay |

---

## 1.7 ORDER LIFECYCLE STATE MACHINE

```
  NEW
   │
   ▼
  VALIDATED (by Decision Engine)
   │
   ├──[risk rejected]──► RISK_REJECTED → dead_letter_stream
   │
   ▼
  RISK_APPROVED
   │
   ├──[policy rejected]──► POLICY_REJECTED → dead_letter_stream
   │
   ▼
  POLICY_APPROVED
   │
   ▼
  SUBMITTED (to OMS/EMS)
   │
   ├──[ack timeout]──► TIMEOUT → retry_stream
   │
   ▼
  ACKNOWLEDGED (by broker)
   │
   ├──[rejected by broker]──► BROKER_REJECTED → dead_letter_stream
   │
   ├──[partial fill]──► PARTIALLY_FILLED
   │                         │
   │                         ├──[remaining qty]──► stays in SUBMITTED
   │                         └──[complete]──► FILLED
   ▼
  FILLED
   │
   ▼
  RECONCILED
   │
   ▼
  CLOSED
```

---

## 1.8 PORTFOLIO STATE MODEL

```
 State(t) = f(Event_Log[0 → t])   ← AUTHORITATIVE
 Snapshot  = derived(State(t))     ← STORED (PostgreSQL)

 Portfolio State Components:
 ├── Positions {}
 │     instrument → {qty, avg_cost, direction, open_time, strategy_id}
 ├── Realized PnL
 │     trade_id → {pnl, fees, slippage, close_time}
 ├── Unrealized PnL
 │     mark-to-market using current_bid/ask
 ├── Exposure
 │     per_instrument, per_currency, total_usd_equivalent
 ├── Drawdown
 │     current, peak_equity, peak_date, max_drawdown_pct
 └── Capital
       total_capital, allocated, available, reserved

 PnL ACCOUNTING RULE (STRICT):
   realized_pnl = gross_pnl - fees - slippage
   unrealized_pnl = (current_price - entry_price) × qty × pip_value
   total_pnl = realized_pnl + unrealized_pnl

 RECONCILIATION RULE:
   broker_position == internal_position → PASS
   delta detected → ALERT → HALT new orders → investigate
```

---

## 1.9 FOREX-SPECIFIC DESIGN CONSIDERATIONS

```
INSTRUMENT SCOPE:
  Majors  : EUR/USD, GBP/USD, USD/JPY, USD/CHF, USD/CAD, AUD/USD, NZD/USD
  Minors  : EUR/GBP, EUR/JPY, GBP/JPY, AUD/JPY ...
  Exotics : USD/TRY, USD/ZAR, USD/SGD ...

MARKET SESSION MODEL:
  Sydney   : 22:00–07:00 UTC
  Tokyo    : 00:00–09:00 UTC
  London   : 08:00–17:00 UTC (PEAK liquidity)
  New York : 13:00–22:00 UTC (PEAK overlap: 13:00–17:00 UTC)

  Policy Engine MUST enforce trading restrictions per session.
  Illiquid windows (22:00–00:00 UTC Sun) → restricted

TICK MODEL:
  Bid/Ask spread tracking per instrument
  event_time = exchange timestamp (nanoseconds UTC)
  Fallback: ingestion timestamp + correction flag

RISK METRICS (FOREX-SPECIFIC):
  pip_value               = lot_size × pip_size / exchange_rate
  max_leverage_per_trade  = defined in constraint config
  margin_requirement      = per instrument (regulatory + broker)
  swap_rates              = overnight carry (from broker feed)
  correlation_matrix      = updated daily (e.g. EUR/USD vs GBP/USD)

EXECUTION TYPES:
  MARKET   → instant execution, slippage accepted
  LIMIT    → price-specified, may not fill
  STOP     → trigger-based
  OCO      → one-cancels-other (pairs)
```

---

# PART 2 — INFRASTRUCTURE ARCHITECTURE

---

## 2.1 INFRASTRUCTURE OVERVIEW

```
╔══════════════════════════════════════════════════════════════════════════╗
║              INFRASTRUCTURE STACK — PRODUCTION TOPOLOGY                  ║
║                                                                           ║
║  Current State : Single-node K8s (core-node) — development validated     ║
║  Target State  : Multi-node production cluster                            ║
║                                                                           ║
║  Stack Lock:                                                              ║
║    OS          : Ubuntu Server 22.04 LTS                                  ║
║    Runtime     : Docker Engine 29.4.0 + containerd (K8s)                 ║
║    Orchestration : Kubernetes v1.29.15 (KRaft-aware)                      ║
║    Event Bus   : Apache Kafka 3.6.1 (KRaft mode)                         ║
║    State DB    : PostgreSQL (Helm managed)                                ║
║    Time-Series : TimescaleDB 2.x-pg15                                     ║
║    Cache       : Redis (standalone, cache-only)                           ║
║    Networking  : Calico CNI + MetalLB + NGINX Ingress                     ║
║    Packaging   : Helm v3.20.2                                             ║
╚══════════════════════════════════════════════════════════════════════════╝
```

---

## 2.2 NODE TOPOLOGY (CURRENT → PRODUCTION)

```
 ╔══════════════════════════════════════════════════════╗
 ║  CURRENT (VALIDATED — PHASE 0–10 COMPLETE)           ║
 ║                                                      ║
 ║  core-node (192.168.1.3)                             ║
 ║  Ubuntu 22.04 | 4 core | 8 GB | 60 GB SSD           ║
 ║  Kubernetes control-plane (single-node)              ║
 ╚══════════════════════════════════════════════════════╝

 ╔══════════════════════════════════════════════════════════════════════════╗
 ║  PRODUCTION TARGET — MULTI-NODE CLUSTER                                  ║
 ║                                                                          ║
 ║  Node Role         Qty  vCPU  RAM    Disk   Purpose                     ║
 ║  ─────────────────────────────────────────────────────────────────────  ║
 ║  k8s-control-01    1    4     8GB    60GB   K8s control plane           ║
 ║  k8s-control-02    1    4     8GB    60GB   K8s control plane HA        ║
 ║  k8s-control-03    1    4     8GB    60GB   K8s control plane HA        ║
 ║                                                                          ║
 ║  kafka-node-01     1    8     32GB   500GB  Kafka broker+controller      ║
 ║  kafka-node-02     1    8     32GB   500GB  Kafka broker+controller      ║
 ║  kafka-node-03     1    8     32GB   500GB  Kafka broker+controller      ║
 ║                                                                          ║
 ║  db-node-01        1    8     32GB   1TB    PostgreSQL primary           ║
 ║  db-node-02        1    8     32GB   1TB    PostgreSQL replica           ║
 ║  tsdb-node-01      1    8     32GB   2TB    TimescaleDB primary          ║
 ║  tsdb-node-02      1    8     32GB   2TB    TimescaleDB replica          ║
 ║                                                                          ║
 ║  compute-node-01   1    16    32GB   200GB  Trading services             ║
 ║  compute-node-02   1    16    32GB   200GB  Trading services             ║
 ║  compute-node-03   1    16    32GB   200GB  Trading services             ║
 ║                                                                          ║
 ║  infra-node-01     1    8     16GB   200GB  Prometheus/Grafana/Loki      ║
 ║  infra-node-02     1    8     16GB   200GB  Vault/Keycloak/Registry      ║
 ╚══════════════════════════════════════════════════════════════════════════╝
```

---

## 2.3 FULL INFRA PHASE EXECUTION SEQUENCE

```
 Phase 0  → Machine Preparation (OS + kernel tuning)
 Phase 1  → Container Foundation (Docker Engine)
 Phase 2  → Kubernetes Cluster (control plane + CNI)
 Phase 3  → Core K8s Infra (Ingress + MetalLB + Cert-Manager)
 Phase 4  → Deployment Layer (Helm v3)
 Phase 5  → Event Backbone (Kafka KRaft)
 Phase 6  → Storage Layer (PostgreSQL + TimescaleDB + Redis)
 Phase 7  → Platform Control (Keycloak + Vault + API Gateway)
 Phase 8  → Observability (Prometheus + Grafana + Loki + OTEL)
 Phase 9  → CI/CD + Registry (Harbor + GitHub Actions)
 Phase 10 → Core Platform Services (event pipeline skeleton)
 Phase 11 → Execution Pipeline (trading engine)
 Phase 12 → Trading Infra (OMS/EMS/broker)
 Phase 13 → UI + Docs + Workflow Automation
```

---

## 2.4 KUBERNETES NAMESPACE ARCHITECTURE

```
 ┌──────────────────────────────────────────────────────────────────────┐
 │                  KUBERNETES NAMESPACE MODEL                           │
 └──────────────────────────────────────────────────────────────────────┘

 namespace: kafka               → Kafka cluster (KRaft)
 namespace: storage             → PostgreSQL, TimescaleDB, Redis
 namespace: ingress-nginx       → NGINX Ingress Controller
 namespace: metallb-system      → MetalLB LoadBalancer
 namespace: cert-manager        → TLS certificate management
 namespace: auth                → Keycloak (identity provider)
 namespace: vault               → HashiCorp Vault (secrets)
 namespace: monitoring          → Prometheus, Grafana, Alertmanager
 namespace: logging             → Loki, Promtail
 namespace: tracing             → Jaeger / Tempo (OpenTelemetry)
 namespace: registry            → Harbor (container registry)
 namespace: cicd                → ArgoCD / GitHub Actions runner
 namespace: platform            → api-gateway, config-service,
                                   identity-service, audit-service
 namespace: market-data         → ingestion, normalizer, feature-store
 namespace: strategy            → strategy-engine, signal-processor
 namespace: execution           → decision, risk, policy, order,
                                   execution-router, fill-handler
 namespace: trading-infra       → OMS, EMS, broker-adapter
 namespace: portfolio           → portfolio-svc, exposure-svc,
                                   snapshot-svc, replay-engine
 namespace: n8n                 → Workflow automation

 ISOLATION RULES:
   execution namespace → network policy: only receives from strategy
   trading-infra       → network policy: only receives from execution
   storage             → network policy: only accessible from platform/
                          execution/portfolio namespaces
   vault               → network policy: only accessible from platform
```

---

## 2.5 COMPLETE INFRA COMPONENT STACK (PHASE-BY-PHASE)

### PHASE 0 — Machine Preparation (LOCKED ✅)
```
 core-node: Ubuntu 22.04 LTS
 ├── Swap:        DISABLED (swapoff -a + fstab)
 ├── Hostname:    core-node (192.168.1.3)
 ├── Time Sync:   Chrony → pool.ntp.org
 ├── Ulimits:     nofile=1048576, nproc=65535
 ├── Kernel:      somaxconn=65535, tcp_tw_reuse=1,
 │                vm.swappiness=0, max_map_count=262144
 └── SSH:         coreeye@192.168.1.3 (bridged network)
```

### PHASE 1 — Docker Runtime (LOCKED ✅)
```
 Docker Engine 29.4.0
 ├── Storage Driver: overlay2
 ├── Cgroup Driver:  systemd (K8s compatible)
 ├── Logging:        json-file (100MB × 3 rotation)
 └── Registry:       192.168.1.3:5000 (insecure local)
     containerd config: insecure_skip_verify = true
```

### PHASE 2 — Kubernetes Cluster (LOCKED ✅)
```
 Kubernetes v1.29.15
 ├── Mode:       Single-node control-plane (taint removed)
 ├── Runtime:    containerd (SystemdCgroup = true)
 ├── CNI:        Calico v3.27.0 (pod CIDR: 192.168.0.0/16)
 ├── DNS:        CoreDNS (cluster.local)
 └── Status:     core-node = Ready
```

### PHASE 3 — Core K8s Infra (LOCKED ✅)
```
 Ingress:     NGINX Ingress Controller
 LoadBalancer: MetalLB v0.14.5 (Layer2 ARP)
               IP Pool: 192.168.1.240–192.168.1.250
               Ingress External IP: 192.168.1.240
 TLS:         Cert-Manager v1.14.4
```

### PHASE 4 — Deployment Layer (LOCKED ✅)
```
 Helm v3.20.2
 Rules:
   ✔ NO kubectl apply for apps (Helm only)
   ✔ NO latest tags (pin all versions)
   ✔ values.yaml = source of truth
   ✔ {{ .Release.Name }} for all resource names
 Repos: bitnami, ingress-nginx, prometheus-community
```

### PHASE 5 — Kafka Event Backbone (LOCKED ✅)
```
 Apache Kafka 3.6.1 (bitnami/kafka chart 26.6.2)
 ├── Mode:         KRaft (NO ZooKeeper)
 ├── Controller:   1 (StatefulSet)
 ├── Broker:       1 (StatefulSet, kafka-broker-0)
 ├── Endpoint:     kafka.kafka.svc.cluster.local:9092
 ├── Storage:      PVC (5Gi, local-path)
 ├── log.dirs:     /var/lib/kafka/data
 ├── Auth:         PLAINTEXT (dev) → SASL_SSL (production)
 └── Listeners:    kafka-0.kafka:9092 (internal)

 PRODUCTION UPGRADE REQUIRED:
   → 3 brokers + 3 controllers (KRaft quorum)
   → SASL_SSL authentication
   → Schema Registry (Confluent)
   → Kafka Connect (for DB sink/source)
   → Increase replication.factor = 3
```

### PHASE 6 — Storage Layer (LOCKED ✅)
```
 PostgreSQL (bitnami/postgresql, namespace: storage)
 ├── Pod:       postgres-postgresql-0
 ├── Service:   postgres-postgresql.storage.svc.cluster.local:5432
 ├── Database:  coredb (password: corepass → Vault in prod)
 └── Role:      system state, snapshots, config (NOT event history)

 TimescaleDB (native StatefulSet, namespace: storage)
 ├── Image:     timescale/timescaledb:2.14.2-pg15 (PIN this)
 ├── Service:   timescaledb.storage.svc.cluster.local:5432
 ├── Database:  marketdb
 ├── Extension: timescaledb (auto-enabled)
 └── Role:      tick data, OHLC, signal history, indicators

 Redis (bitnami/redis standalone, namespace: storage)
 ├── Pod:       redis-master-0
 ├── Service:   redis-master.storage.svc.cluster.local:6379
 ├── Auth:      disabled (dev) → enabled (production)
 └── Role:      CACHE ONLY (NOT source of truth)
     WARNING:   Redis = derived state. Never write directly without
                first persisting to Kafka → PostgreSQL

 DATA FLOW RULE (STRICT):
   Kafka → PostgreSQL (state)
   Kafka → TimescaleDB (time-series)
   PostgreSQL / TimescaleDB → Redis (cache, derived only)

 STORAGE SCHEMA DESIGN:

 PostgreSQL (coredb):
   Table: portfolio_snapshots    (snapshot_id, account_id, state_json,
                                   snapshot_time, lineage_hash)
   Table: orders                 (order_id, trade_intent_id, instrument,
                                   direction, qty, status, created_at)
   Table: positions              (position_id, account_id, instrument,
                                   qty, avg_cost, open_time, strategy_id)
   Table: config_snapshots       (config_id, version, config_json,
                                   created_at, approved_by)
   Table: strategy_versions      (strategy_id, version, params_json,
                                   deployed_at, approved_by)

 TimescaleDB (marketdb):
   Hypertable: ticks             (time, instrument, bid, ask, bid_vol,
                                   ask_vol, source) → partition by day
   Hypertable: ohlc_1m           (time, instrument, open, high, low,
                                   close, volume) → partition by month
   Hypertable: signals           (time, signal_id, strategy_id,
                                   instrument, direction, strength)
   Hypertable: fills             (time, fill_id, order_id, instrument,
                                   direction, qty, price, fees)
```

### PHASE 7 — Platform Control (TO BUILD)
```
 Keycloak (namespace: auth)
 ├── Version:   24.x
 ├── Helm:      bitnami/keycloak
 ├── DB:        PostgreSQL (coredb, keycloak schema)
 ├── Realm:     trading-platform
 ├── Clients:   api-gateway, services (service accounts)
 ├── Roles:     trader, risk-admin, ops, readonly, system
 └── Protocol:  OIDC + OAuth2

 HashiCorp Vault (namespace: vault)
 ├── Version:   1.16.x
 ├── Mode:      Kubernetes auth backend
 ├── Secrets:   db passwords, broker API keys, JWT secrets
 ├── PKI:       internal TLS certificate authority
 └── Policy:    per-service secret access control

 API Gateway (namespace: platform)
 ├── Options:   Kong / NGINX / Envoy (recommend: Envoy + Ambassador)
 ├── Features:  Rate limiting, JWT validation, request tracing,
 │              mTLS between services
 └── Routing:   /api/v1/* → internal services

 Config Service + Config Snapshot Service
 ├── config-service:          Source of all configuration
 ├── config-snapshot-service: Immutable snapshot generator
 │                            (every config version = hash-identified)
 └── Vault integration:       secrets injected at runtime
```

### PHASE 8 — Observability (TO BUILD)
```
 Prometheus (namespace: monitoring)
 ├── Helm:    prometheus-community/kube-prometheus-stack
 ├── Scrape:  All services (port 9090 + /metrics endpoint)
 ├── Alerts:  AlertManager → Telegram + PagerDuty
 └── Retention: 30 days

 Grafana (namespace: monitoring)
 ├── Datasources: Prometheus, Loki, Tempo, TimescaleDB
 └── Dashboards:
     ├── Platform Health     (pod status, resource usage)
     ├── Kafka Metrics       (consumer lag, throughput, partition health)
     ├── Trading Pipeline    (signal rate, decision rate, fill rate)
     ├── Risk Dashboard      (exposure, drawdown, PnL live)
     ├── Execution Quality   (latency distribution, rejection rate)
     └── Reconciliation      (broker vs internal mismatch alerts)

 Loki (namespace: logging)
 ├── Log aggregation from all pods (Promtail DaemonSet)
 ├── Retention: 30 days
 └── Queries via Grafana

 OpenTelemetry Collector (namespace: tracing)
 ├── Traces: End-to-end request tracing (signal → fill)
 ├── Backend: Jaeger / Grafana Tempo
 └── Instrumentation: FastAPI / Python services (auto-instrumented)

 KEY METRICS TO TRACK:
   signal_generation_rate_per_strategy
   decision_engine_latency_p99
   risk_check_latency_p99
   order_submission_latency_p99
   fill_rate_pct
   rejection_rate_pct
   kafka_consumer_lag_per_topic
   portfolio_drawdown_current_pct
   position_exposure_usd
   reconciliation_mismatch_count
   dead_letter_queue_depth
```

### PHASE 9 — CI/CD + Registry (TO BUILD)
```
 Harbor Registry (namespace: registry)
 ├── URL:       registry.core-node.local (or cloud ECR)
 ├── Projects:  core-system/
 ├── Scanning:  Trivy (vulnerability scan on push)
 └── Proxy:     Pull-through cache for Docker Hub / ECR

 GitHub Actions Pipeline:
 ├── Trigger:  push to main / PR merge
 ├── Steps:
 │   [1] lint + unit test
 │   [2] docker build
 │   [3] trivy scan (fail on CRITICAL)
 │   [4] push to Harbor (tagged: git-sha, never latest)
 │   [5] helm upgrade --install (via kubeconfig secret)
 │   [6] smoke test (health endpoint check)
 │   [7] slack / telegram notification
 └── Environments: PR → dev | main → staging | tag → prod (manual gate)

 ArgoCD (GitOps — optional upgrade):
 ├── Git repo = desired state
 ├── ArgoCD = reconciler
 └── Drift detection + auto-sync (staging), manual (prod)
```

### PHASE 10–12 — Core Services (TO BUILD, Closed-Loop Model)
```
 DEPLOYMENT ORDER (STRICT):

 1. identity-service
 2. event-ingestion-service
 3. event-validation-service
 4. event-ordering-service
 5. orchestration-service
 6. portfolio-service (STATE AUTHORITY)
 7. snapshot-service
 8. replay-engine
    ── LOOP VALIDATION GATE ──
 9. strategy-engine-service (skeleton)
 10. signal-processor
 11. constraint-engine-service
 12. execution-intent-service
 13. decision-engine-service (execution side)
 14. risk-engine-service
 15. policy-engine-service
 16. order-engine-service
 17. execution-router
 18. fill-handler-service
 19. reconciliation-service
    ── CLOSED LOOP VALIDATION GATE ──
 20. OMS (pass-through)
 21. EMS (pass-through)
 22. broker-adapter-service (MOCK → LIVE)

 LOOP VALIDATION CRITERIA (MUST PASS BEFORE HARDENING):
   ✔ Determinism:     same input → same output
   ✔ Replayability:   full loop replayable from Kafka
   ✔ State Consistency: portfolio state matches expected
   ✔ Event Integrity: no missing/duplicated/unordered events
   ✔ Traceability:    every output linked to input via hash chain
```

### PHASE 13 — UI + Docs + Workflow
```
 Trading UI (React + WebSocket)
 ├── Live position dashboard
 ├── Strategy management console
 ├── Risk limit controls
 ├── Order management interface
 ├── PnL + drawdown visualization
 └── System health overlay

 n8n Workflow Automation
 ├── Pre-trading checks (daily)
 ├── Post-trading reconciliation (nightly)
 ├── Alert routing (Telegram / PagerDuty)
 ├── Strategy lifecycle management
 └── Broker connectivity health checks

 Documentation (Docusaurus)
 ├── API reference
 ├── Event schema contracts
 ├── Runbook / operational procedures
 └── Architecture decisions (ADR log)
```

---

## 2.6 NETWORK ARCHITECTURE

```
 ┌─────────────────────────────────────────────────────────────────────┐
 │              NETWORK FLOW — PRODUCTION                               │
 └─────────────────────────────────────────────────────────────────────┘

 External World (Internet / Broker Feeds)
          │
          ▼
 [Router / Firewall]
   Allowed Inbound:
     443 (HTTPS / WSS — UI + API)
     FIX port (4000-4002 — broker connectivity, internal only)
          │
          ▼
 MetalLB (192.168.1.240 — LAN)
          │
          ▼
 NGINX Ingress Controller
   ├── /api/*       → api-gateway service
   ├── /grafana     → grafana service
   ├── /kafka-ui    → kafka-ui service
   └── /            → UI service
          │
          ▼
 Kubernetes Services (ClusterIP)
   Internal service mesh:
     ├── mTLS between services (Vault PKI or cert-manager)
     ├── NetworkPolicy enforcement per namespace
     └── Service discovery: <svc>.<ns>.svc.cluster.local

 KAFKA INTERNAL ADDRESSING:
   kafka.kafka.svc.cluster.local:9092 (SINGLE canonical endpoint)
   ⚠️  NEVER use kafka-broker-0.kafka or localhost inside services

 EXTERNAL BROKER CONNECTIVITY:
   Egress-only from trading-infra namespace
   FIX/REST/WebSocket over TLS
   Failover: primary → secondary → tertiary broker
```

---

## 2.7 SECURITY ARCHITECTURE

```
 ┌──────────────────────────────────────────────────────────────────────┐
 │                   SECURITY LAYERS                                     │
 └──────────────────────────────────────────────────────────────────────┘

 Layer 1 — Identity & Access (Keycloak)
   ├── Human operators: OIDC login → JWT → API gateway
   ├── Services: OAuth2 client credentials → scoped tokens
   └── Roles: trader | risk-admin | ops | readonly | system

 Layer 2 — Secrets Management (Vault)
   ├── DB credentials: dynamic secrets (auto-rotated)
   ├── Broker API keys: static secrets (manually rotated)
   ├── JWT signing keys: PKI-managed
   └── Kubernetes auth: service account → Vault policy

 Layer 3 — Network Security
   ├── NetworkPolicy: namespace isolation
   ├── mTLS: service-to-service (Vault PKI or cert-manager)
   ├── Ingress TLS: cert-manager (Let's Encrypt or internal CA)
   └── Egress policy: only trading-infra can reach broker endpoints

 Layer 4 — Container Security
   ├── Non-root containers (runAsNonRoot: true)
   ├── Read-only filesystem (readOnlyRootFilesystem: true)
   ├── No privileged containers
   ├── Image scanning: Trivy in CI pipeline
   └── Resource limits: CPU + memory on every container

 Layer 5 — Audit & Compliance
   ├── Kubernetes audit log: all API server requests
   ├── audit-service: append-only audit_stream (Kafka)
   ├── Every order traceable to initiating signal (lineage hash)
   └── Full system replay capability (deterministic audit)
```

---

## 2.8 HELM VALUES STRUCTURE (PRODUCTION PATTERN)

```yaml
# services/<service-name>/helm/<service>/values-prod.yaml

image:
  repository: 192.168.1.3:5000/<service-name>
  tag: "v1.2.3"            # NEVER latest
  pullPolicy: IfNotPresent

replicaCount: 3              # prod = 3 minimum

resources:
  requests:
    cpu: "500m"
    memory: "512Mi"
  limits:
    cpu: "1000m"
    memory: "1Gi"

env:
  ENVIRONMENT: "prod"
  KAFKA_BOOTSTRAP: "kafka.kafka.svc.cluster.local:9092"
  POSTGRES_HOST: "postgres-postgresql.storage.svc.cluster.local"
  TSDB_HOST: "timescaledb.storage.svc.cluster.local"
  REDIS_HOST: "redis-master.storage.svc.cluster.local"
  LOG_LEVEL: "INFO"

vault:
  enabled: true
  role: "<service-name>-role"
  secrets:
    - path: "secret/data/trading/db"
      key: "POSTGRES_PASSWORD"
    - path: "secret/data/trading/broker"
      key: "BROKER_API_KEY"

probes:
  readiness:
    path: /health/ready
    initialDelaySeconds: 10
    periodSeconds: 5
  liveness:
    path: /health/live
    initialDelaySeconds: 30
    periodSeconds: 10

serviceAccount:
  create: true
  name: "<service-name>-sa"

networkPolicy:
  enabled: true
  ingress:
    - from:
        namespace: execution   # or strategy, platform, etc.

podDisruptionBudget:
  enabled: true
  minAvailable: 2
```

---

## 2.9 SERVICE STANDARD (FastAPI PYTHON)

```python
# services/<service>/app/main.py — STANDARD TEMPLATE

import asyncio
from fastapi import FastAPI
from prometheus_client import Counter, Histogram
from opentelemetry import trace

app = FastAPI(title="<service-name>")

# Metrics
events_processed = Counter("events_processed_total", "...", ["status"])
processing_latency = Histogram("processing_latency_seconds", "...")

# Health endpoints (MANDATORY on every service)
@app.get("/health/ready")
async def ready():
    # Check: Kafka connection, DB connection
    return {"status": "ready"}

@app.get("/health/live")
async def live():
    return {"status": "alive"}

@app.get("/metrics")
async def metrics():
    # Prometheus metrics endpoint
    ...

# Dockerfile STANDARD:
# FROM python:3.11-slim
# WORKDIR /app
# COPY requirements.txt .
# RUN pip install --no-cache-dir -r requirements.txt
# COPY app/ .
# USER nobody          ← non-root
# CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
```

---

## 2.10 DEPLOYMENT ENVIRONMENT MODEL

```
 ┌──────────────────────────────────────────────────────────────────────┐
 │  ENVIRONMENT STRATEGY                                                 │
 └──────────────────────────────────────────────────────────────────────┘

 DEV (Current — core-node single node)
 ├── All services at replicaCount: 1
 ├── Kafka: 1 broker, no auth
 ├── Persistence: disabled (fast iteration)
 ├── Broker: MOCK / paper trading only
 └── Helm release suffix: -dev

 STAGING (Pre-production)
 ├── All services at replicaCount: 2
 ├── Kafka: 3 brokers, SASL enabled
 ├── Persistence: enabled
 ├── Broker: paper trading / sandbox
 └── Helm release suffix: -staging

 PRODUCTION (Live)
 ├── All services at replicaCount: 3+
 ├── Kafka: 3 brokers, SASL_SSL
 ├── Full HA, PodDisruptionBudgets
 ├── Broker: live (after full validation)
 ├── Human approval gate before deploy
 └── Helm release suffix: (none / -prod)

 PROMOTION RULE:
   dev → staging:  automated (CI passes)
   staging → prod: MANUAL APPROVAL (risk + engineering sign-off)

 ROLLBACK RULE:
   helm rollback <release> <revision>
   ArgoCD: git revert → auto-sync
```

---

## 2.11 CRITICAL ARCHITECTURE DECISIONS (ADRs)

| # | Decision | Rationale | Alternative Rejected |
|---|---|---|---|
| 1 | Kafka as single source of truth | Replayable, ordered, durable | Redis Streams (limited retention) |
| 2 | KRaft mode (no ZooKeeper) | Simplified ops, fewer failure points | ZooKeeper (legacy) |
| 3 | SHA-256 hash chain for lineage | Deterministic, tamper-evident audit | UUID (non-deterministic) |
| 4 | No floating point in financial calcs | Eliminates rounding non-determinism | float64 (causes replay diff) |
| 5 | event_time only (no system clock) | Deterministic replay guarantee | System clock (non-deterministic) |
| 6 | Helm-only deployments | Versioned, reproducible, rollback-safe | kubectl apply (no version control) |
| 7 | OMS/EMS are transport-only | Prevents ID regeneration violations | Smart OMS (creates own IDs) |
| 8 | TimescaleDB (not ClickHouse) | pg15 ecosystem, Helm-compatible | ClickHouse (heavier, complex setup) |
| 9 | CEIL isolation at Risk Engine merge | Prevents external input contamination | Direct injection into strategy |
| 10 | Fixed-point int64 for all prices | Consistent precision, no drift | Decimal type (language-dependent) |

---

## 2.12 KNOWN ISSUES & REMEDIATION BACKLOG

| Issue | Severity | Phase | Fix Required |
|---|---|---|---|
| `latest` image tags in use | HIGH | 6 | Pin: timescale/timescaledb:2.14.2-pg15, Redis, PostgreSQL |
| localhost:5000 registry | HIGH | 10 | Use 192.168.1.3:5000 consistently, or migrate to Harbor |
| No persistence in Kafka | HIGH | 5 | PVC already fixed; validate log.dirs = /var/lib/kafka/data |
| PLAINTEXT Kafka auth | HIGH | 5 | Upgrade to SASL_SSL before staging |
| Single-node K8s | MEDIUM | 2 | Add nodes for production |
| No Schema Registry | MEDIUM | 5 | Deploy Confluent Schema Registry |
| Redis no auth | MEDIUM | 6 | Enable auth.enabled=true + Vault secret |
| DB passwords hardcoded | HIGH | 6 | Vault integration required |
| No NetworkPolicies | HIGH | all | Deploy per-namespace policies |
| No PodDisruptionBudgets | MEDIUM | all | Add to all production deployments |
| signal-service worker (no probe) | LOW | 10 | Confirmed fixed in Phase 10 |

---

## 2.13 SYSTEM STARTUP SEQUENCE (PRODUCTION)

```
 START SEQUENCE (ordered, each layer waits for previous):

 1. Storage Layer Ready
    ├── PostgreSQL primary: pg_isready
    ├── TimescaleDB: pg_isready + extension check
    └── Redis: redis-cli ping

 2. Kafka Cluster Ready
    ├── All 3 brokers: Running + ISR = 3
    ├── All topics created with correct replication
    └── Schema Registry: healthy

 3. Platform Control Ready
    ├── Vault: unsealed + auth backend configured
    ├── Keycloak: realm + clients configured
    └── API Gateway: upstream healthy

 4. Core Platform Services Ready
    ├── identity-service: /health/ready
    ├── event-ingestion-service: /health/ready
    ├── event-validation-service: /health/ready
    ├── event-ordering-service: /health/ready
    └── portfolio-service: /health/ready (state loaded)

 5. Market Data Ready
    ├── market-data-ingestion: connected to feed
    └── market-data-normalizer: processing ticks

 6. Strategy Engine Ready
    ├── strategy-engine: /health/ready
    └── signal-processor: /health/ready

 7. Execution Pipeline Ready
    ├── All D1-D8 services: /health/ready
    └── Risk Engine: limits loaded from config

 8. Trading Infra Ready
    ├── OMS: /health/ready
    ├── EMS: broker connection established
    └── broker-adapter: session active

 9. SYSTEM LIVE — TRADING ENABLED
    (Only after all above pass)

 KILL SWITCH (EMERGENCY HALT):
   kill_switch_stream.emit({"action": "HALT_ALL", "reason": "..."})
   → All services: drain current orders, reject new intents
   → Risk engine: close all positions (configurable)
   → Alert: Telegram + PagerDuty immediate
```

---

## 2.14 PERFORMANCE TARGETS (PRODUCTION SLA)

| Metric | Target | Hard Limit |
|---|---|---|
| Tick ingestion latency | < 1ms | < 5ms |
| Signal generation latency | < 10ms | < 50ms |
| Decision engine latency P99 | < 5ms | < 20ms |
| Risk check latency P99 | < 2ms | < 10ms |
| Order submission latency P99 | < 50ms | < 200ms |
| Fill notification latency | < 100ms | < 500ms |
| Kafka consumer lag (signal) | < 100 msgs | < 1000 msgs |
| System replay throughput | 50K events/sec | 10K minimum |
| Portfolio state consistency | Eventual < 500ms | < 2s |
| Reconciliation cycle | Every 5 min | Every 15 min |

---

## 2.15 DISASTER RECOVERY MODEL

```
 FAILURE SCENARIOS & RESPONSES:

 Scenario 1: Single Pod Crash
   Detection : Kubernetes liveness probe
   Response  : Auto-restart (K8s)
   RTO       : < 30 seconds

 Scenario 2: Kafka Broker Down (1 of 3)
   Detection : Prometheus Kafka metrics
   Response  : KRaft auto-leader election, ISR maintained
   RTO       : < 60 seconds (no data loss, RF=3)

 Scenario 3: Database Node Failure
   Detection : Prometheus + PostgreSQL exporter
   Response  : Failover to replica (Patroni / pg_auto_failover)
   RTO       : < 120 seconds
   RPO       : < 5 seconds (streaming replication)

 Scenario 4: Complete Node Loss
   Detection : Kubernetes node NotReady
   Response  : Pod rescheduling to remaining nodes
   RTO       : < 5 minutes

 Scenario 5: Broker Connectivity Loss
   Detection : EMS heartbeat timeout
   Response  : execution-router failover to secondary broker
   RTO       : < 10 seconds (orders pending)

 Scenario 6: Risk Limit Breach
   Detection : risk-engine real-time check
   Response  : kill_switch_stream → HALT_ALL
   RTO       : immediate (< 1 second)
   Action    : No new orders, existing orders → human review

 BACKUP STRATEGY:
   Kafka     : 3x replication + offsite log archival (S3/GCS)
   PostgreSQL: daily snapshot + continuous WAL archival
   TimescaleDB: daily snapshot + continuous WAL
   Config    : Git-versioned (all configs in Helm values)
   Secrets   : Vault HA + periodic export to encrypted backup
```

---

## 2.16 WHAT IS BUILT vs WHAT REMAINS

```
 ╔══════════════════════════════════════════════════════════════════════╗
 ║  PHASES LOCKED (INFRASTRUCTURE FOUNDATION COMPLETE)                  ║
 ╠══════════════════════════════════════════════════════════════════════╣
 ║  Phase 0   OS + Machine Preparation          ✅ LOCKED               ║
 ║  Phase 1   Docker Container Runtime          ✅ LOCKED               ║
 ║  Phase 2   Kubernetes Cluster                ✅ LOCKED               ║
 ║  Phase 3   Ingress + MetalLB + Cert-Manager  ✅ LOCKED               ║
 ║  Phase 4   Helm Deployment Layer             ✅ LOCKED               ║
 ║  Phase 5   Kafka Event Backbone              ✅ LOCKED               ║
 ║  Phase 6   Storage Layer (PG+TSDB+Redis)     ✅ LOCKED               ║
 ║  Phase 10  Multi-service skeleton            ✅ LOCKED (skeleton)    ║
 ╠══════════════════════════════════════════════════════════════════════╣
 ║  PHASES PENDING (BUILD NEXT)                                         ║
 ╠══════════════════════════════════════════════════════════════════════╣
 ║  Phase 7   Platform Control (Keycloak+Vault) 🔴 CRITICAL NEXT        ║
 ║  Phase 8   Observability (Prom+Grafana+Loki) 🔴 CRITICAL NEXT        ║
 ║  Phase 9   CI/CD + Harbor Registry           🔴 REQUIRED             ║
 ║  Phase 10  Core Platform Services (hardened) 🟡 IN PROGRESS          ║
 ║  Phase 11  Execution Pipeline (trading)      🟡 IN PROGRESS          ║
 ║  Phase 12  Trading Infra (OMS/EMS/broker)    ⚪ PENDING              ║
 ║  Phase 13  UI + n8n + Docs                   ⚪ PENDING              ║
 ╚══════════════════════════════════════════════════════════════════════╝
```

---

*Document Version: 1.0 | Generated from Phase A–D specifications and Phase 0–10 implementation records*
*Classification: Authoritative Reference — all phases must align to this document*
*Change Control: Any modification requires reason + impact analysis + rollback plan*
