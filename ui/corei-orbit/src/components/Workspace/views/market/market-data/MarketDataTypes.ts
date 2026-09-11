/**
 * COREI MARKET DATA
 * MD-01 — Shared domain types
 *
 * This file contains UI/domain contracts only.
 *
 * Important:
 * - These types do not create market authority.
 * - Backend payloads remain authoritative.
 * - NOT_EXPOSED is a valid governed UI state.
 * - No execution/order functionality belongs here.
 */

/* ============================================================================
   AUTHORITY
   ============================================================================ */

export type AuthorityState =
  | 'UNKNOWN'
  | 'NON_AUTHORITATIVE'
  | 'GOVERNED'
  | 'AUTHORITATIVE';

export type ExposureState =
  | 'AVAILABLE'
  | 'BACKEND_AVAILABLE'
  | 'NOT_EXPOSED';

export interface AuthorityDescriptor {
  state: AuthorityState;
  exposure: ExposureState;
  source?: string;
  stream?: string;
  schema?: string;
}


/* ============================================================================
   MARKET DATA STATE
   ============================================================================ */

export type AvailabilityState =
  | 'UNKNOWN'
  | 'AVAILABLE'
  | 'UNAVAILABLE';

export type FreshnessState =
  | 'UNKNOWN'
  | 'REALTIME'
  | 'DELAYED'
  | 'STALE';

export type QualityState =
  | 'UNKNOWN'
  | 'VALID'
  | 'DEGRADED'
  | 'INVALID';

export type IntegrityState =
  | 'UNKNOWN'
  | 'PASS'
  | 'WARNING'
  | 'FAIL';

export type TrustState =
  | 'UNKNOWN'
  | 'UNTRUSTED'
  | 'TRUSTED';

export interface MarketDataState {
  availability: AvailabilityState;
  freshness: FreshnessState;
  quality: QualityState;
  integrity: IntegrityState;
  trust: TrustState;
  authority: AuthorityState;
}


/* ============================================================================
   INSTRUMENT
   ============================================================================ */

export interface InstrumentObservation {
  price: number;
  change: number;
  history: number[];
}

export interface InstrumentIdentity {
  instrumentId?: string;
  symbol: string;
  name?: string;
  type?: string;
  assetClass?: string;
}

export interface InstrumentMarketContext {
  market?: string;
  exchange?: string;
  venue?: string;
  currency?: string;
  session?: string;
}

export interface InstrumentContract {
  underlying?: string;
  expiry?: string;
  strike?: number;
  contractType?: string;
}

export interface MarketInstrument {
  identity: InstrumentIdentity;
  market?: InstrumentMarketContext;
  contract?: InstrumentContract;
  observation?: InstrumentObservation;
  state?: MarketDataState;
}


/* ============================================================================
   QUOTE / BBO
   ============================================================================ */

export interface QuoteObservation {
  bidPrice?: number;
  bidSize?: number;
  askPrice?: number;
  askSize?: number;
  spread?: number;
  midPrice?: number;

  eventTime?: number;
  receiveTime?: number;
  sequence?: number;

  source?: string;
  venue?: string;
  feed?: string;
}


/* ============================================================================
   TRADE
   ============================================================================ */

export interface TradeObservation {
  tradeId?: string;
  instrument?: string;

  price?: number;
  quantity?: number;
  notional?: number;

  side?: 'BUY' | 'SELL' | 'UNKNOWN';

  venue?: string;
  condition?: string;
  sequence?: number;

  eventTime?: number;
  source?: string;
  lineage?: string;
}


/* ============================================================================
   ORDER BOOK / DEPTH
   ============================================================================ */

export interface OrderBookLevel {
  price?: number;
  size?: number;
  orderCount?: number;
}

export interface OrderBookObservation {
  venue?: string;
  eventTime?: number;
  sequence?: number;

  bids: OrderBookLevel[];
  asks: OrderBookLevel[];
}

export type OrderBookView =
  | 'L1'
  | 'L2'
  | 'L3'
  | 'CONSOLIDATED'
  | 'VENUE'
  | 'HISTORICAL'
  | 'REPLAY';


/* ============================================================================
   OHLC / BARS
   ============================================================================ */

export type BarInterval =
  | '1m'
  | '5m'
  | '15m'
  | '1h'
  | '1d';

export interface OHLCVObservation {
  eventTime?: number;

  open?: number;
  high?: number;
  low?: number;
  close?: number;

  volume?: number;

  interval?: BarInterval;

  source?: string;
  venue?: string;
}


/* ============================================================================
   TIME & SALES
   ============================================================================ */

export interface TimeAndSalesObservation {
  eventTime?: number;
  price?: number;
  quantity?: number;
  side?: 'BUY' | 'SELL' | 'UNKNOWN';

  tradeId?: string;
  sequence?: number;

  venue?: string;
  source?: string;
}


/* ============================================================================
   MARKET STATUS
   ============================================================================ */

export type MarketStatus =
  | 'UNKNOWN'
  | 'OPEN'
  | 'CLOSED'
  | 'PRE_OPEN'
  | 'POST_CLOSE'
  | 'HALTED'
  | 'DEGRADED';

export interface MarketStatusObservation {
  status: MarketStatus;

  market?: string;
  exchange?: string;
  venue?: string;
  session?: string;

  eventTime?: number;
  source?: string;
}


/* ============================================================================
   DATA GOVERNANCE
   ============================================================================ */

export interface DataGovernanceState {
  schema?: string;
  contract?: string;

  normalization?: string;
  validation?: string;
  reconciliation?: string;

  precision?: string;

  authority: AuthorityState;
  exposure: ExposureState;
}


/* ============================================================================
   PROVENANCE / LINEAGE
   ============================================================================ */

export interface MarketDataProvenance {
  source?: string;
  vendor?: string;
  feed?: string;
  venue?: string;

  eventId?: string;
  eventTime?: number;

  schema?: string;
}

export interface MarketDataLineage {
  source?: string;
  ingestion?: string;
  rawEvent?: string;
  normalization?: string;
  validation?: string;
  stream?: string;
  persistence?: string;
  derivedData?: string;
  feature?: string;
  intelligence?: string;
}


/* ============================================================================
   HISTORICAL DATA
   ============================================================================ */

export interface HistoricalQuery {
  instrument?: string;
  venue?: string;
  eventType?: string;

  startTime?: number;
  endTime?: number;

  session?: string;
  source?: string;
  schema?: string;
}

export interface HistoricalDataset {
  datasetId?: string;
  name?: string;

  instrument?: string;
  venue?: string;
  source?: string;
  schema?: string;

  startTime?: number;
  endTime?: number;

  eventCount?: number;
}


/* ============================================================================
   REPLAY
   ============================================================================ */

export interface ReplayRequest {
  replayId?: string;
  datasetId?: string;

  instrument?: string;
  venue?: string;

  startTime?: number;
  endTime?: number;

  speed?: number;
  checkpoint?: string;
}

export type ReplayStatus =
  | 'IDLE'
  | 'READY'
  | 'RUNNING'
  | 'PAUSED'
  | 'STOPPED'
  | 'COMPLETED'
  | 'FAILED';

export interface ReplayState {
  status: ReplayStatus;

  replayId?: string;
  datasetId?: string;

  currentEventTime?: number;
  processedEvents?: number;

  checkpoint?: string;

  validation?: 'UNKNOWN' | 'PASS' | 'FAIL';
}


/* ============================================================================
   DERIVED DATA
   ============================================================================ */

export interface DerivedMarketData {
  statistics?: Record<string, number>;
  features?: Record<string, number>;
  liquidity?: Record<string, number>;
  flow?: Record<string, number>;
  volatility?: Record<string, number>;
  relationships?: Record<string, number>;
}


/* ============================================================================
   COREI INTELLIGENCE
   ============================================================================ */

export type IntelligenceQuestion =
  | 'WHAT_CHANGED'
  | 'WHAT_IS_UNUSUAL'
  | 'WHAT_IS_EMERGING'
  | 'RELATIONSHIPS'
  | 'EVIDENCE'
  | 'WHY';

export interface IntelligenceEvidence {
  evidenceId?: string;
  type?: string;
  description?: string;

  eventId?: string;
  eventTime?: number;

  source?: string;
  lineage?: string;
}

export interface IntelligenceTrace {
  question: IntelligenceQuestion;

  interpretation?: string;

  confidence?: number;

  evidence: IntelligenceEvidence[];

  dependencies?: string[];
  lineage?: string;
}


/* ============================================================================
   MARKET DATA CAPABILITY
   ============================================================================ */

export type MarketDataCapability =
  | 'OVERVIEW'
  | 'INSTRUMENTS'
  | 'QUOTES'
  | 'TRADES'
  | 'ORDER_BOOK'
  | 'DEPTH'
  | 'TIME_AND_SALES'
  | 'BARS'
  | 'MARKET_STATUS'
  | 'SESSION'
  | 'VENUE'
  | 'EXCHANGE'
  | 'CROSS_MARKET'
  | 'DATA_STATE'
  | 'DATA_QUALITY'
  | 'GOVERNANCE'
  | 'SCHEMA'
  | 'CONTRACT'
  | 'SOURCE'
  | 'FEED'
  | 'PROVENANCE'
  | 'LINEAGE'
  | 'HISTORICAL'
  | 'DATASET'
  | 'SNAPSHOT'
  | 'COMPARISON'
  | 'REPLAY'
  | 'RECONSTRUCTION'
  | 'CHECKPOINT'
  | 'REPLAY_VALIDATION'
  | 'DERIVED'
  | 'FEATURES'
  | 'LIQUIDITY'
  | 'FLOW'
  | 'VOLATILITY'
  | 'RELATIONSHIPS'
  | 'WHAT_CHANGED'
  | 'UNUSUAL'
  | 'EMERGING'
  | 'EVIDENCE'
  | 'INTELLIGENCE_TRACE'
  | 'FEED_MONITORING'
  | 'ALERTS'
  | 'RECOVERY'
  | 'AUDIT'
  | 'CONTROLS';


export interface CapabilityDescriptor {
  id: MarketDataCapability;
  title: string;
  description: string;

  exposure: ExposureState;

  readOnly: boolean;
}


/* ============================================================================
   AUTHORITATIVE STREAMS
   ============================================================================ */

export const MARKET_DATA_STREAMS = [
  'market_ticks_stream',
  'market_ohlcv_stream',
  'market_depth_stream',
  'market_status_stream',
  'market_replay_stream',
  'synthetic_market_stream',
  'market_validation_stream',
  'feature_precompute_stream',
] as const;

export type MarketDataStream =
  (typeof MARKET_DATA_STREAMS)[number];


/* ============================================================================
   GOVERNED SCHEMAS
   ============================================================================ */

export const MARKET_DATA_SCHEMAS = [
  'tick_v1',
  'ohlcv_v1',
  'depth_v1',
  'market_status_v1',
  'replay_tick_v1',
  'synthetic_tick_v1',
] as const;

export type MarketDataSchema =
  (typeof MARKET_DATA_SCHEMAS)[number];


/* ============================================================================
   GOVERNED OHLCV INTERVALS
   ============================================================================ */

export const GOVERNED_BAR_INTERVALS: readonly BarInterval[] = [
  '1m',
  '5m',
  '15m',
  '1h',
  '1d',
];


/* ============================================================================
   UI PERMISSION BOUNDARY
   ============================================================================ */

export type MarketDataPermission =
  | 'VIEW'
  | 'SEARCH'
  | 'FILTER'
  | 'COMPARE'
  | 'TRACE'
  | 'REPLAY'
  | 'EXPORT';

export const MARKET_DATA_READ_PERMISSIONS: readonly MarketDataPermission[] = [
  'VIEW',
  'SEARCH',
  'FILTER',
  'COMPARE',
  'TRACE',
  'REPLAY',
  'EXPORT',
];
