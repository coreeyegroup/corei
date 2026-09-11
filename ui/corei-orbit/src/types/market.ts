/**
 * COREI — Market Data Types
 *
 * MD-01A: Market Data Types
 *
 * INVARIANTS:
 * 1. Types reflect actual backend data shape
 * 2. No fabricated fields
 * 3. Explicit state dimensions (not collapsed to single status)
 * 4. Temporal fields distinguish event_time vs receive_time
 */

// ─── INSTRUMENT ───
export interface Instrument {
  id: string;
  symbol: string;
  name?: string;
  type?: 'EQUITY' | 'ETF' | 'INDEX' | 'FUTURE' | 'OPTION' | 'FX' | 'CRYPTO' | 'COMMODITY' | 'BOND' | 'UNKNOWN';
  assetClass?: string;
  exchange?: string;
  currency?: string;
  underlying?: string;
}

// ─── QUOTE ───
export interface Quote {
  symbol: string;
  bidPrice?: number;
  bidSize?: number;
  askPrice?: number;
  askSize?: number;
  midPrice?: number;
  spread?: number;
  spreadPercent?: number;
  eventTime: string;
  receiveTime?: string;
  sequence?: number;
  source?: string;
  venue?: string;
}

// ─── TRADE ───
export interface Trade {
  id: string;
  symbol: string;
  price: number;
  quantity: number;
  notional: number;
  side?: 'BUY' | 'SELL';
  venue?: string;
  condition?: string;
  sequence?: number;
  eventTime: string;
  source?: string;
}

// ─── BAR / OHLCV ───
export interface Bar {
  symbol: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  trades?: number;
  vwap?: number;
  interval: string;
  eventTime: string;
  venue?: string;
}

// ─── DATA STATE DIMENSIONS ───
export type AvailabilityState = 'UNKNOWN' | 'AVAILABLE' | 'UNAVAILABLE';
export type QualityState = 'UNKNOWN' | 'VALID' | 'DEGRADED' | 'INVALID';
export type FreshnessState = 'UNKNOWN' | 'REALTIME' | 'DELAYED' | 'STALE';
export type IntegrityState = 'UNKNOWN' | 'PASS' | 'WARNING' | 'FAIL';
export type TrustState = 'UNKNOWN' | 'UNTRUSTED' | 'TRUSTED';
export type AuthorityState = 'UNKNOWN' | 'NON_AUTHORITATIVE' | 'GOVERNED' | 'AUTHORITATIVE';

export interface DataState {
  availability: AvailabilityState;
  quality: QualityState;
  freshness: FreshnessState;
  integrity: IntegrityState;
  trust: TrustState;
  authority: AuthorityState;
}

// ─── SOURCE AUTHORITY ───
export interface SourceAuthority {
  source: string;
  feed: string;
  venue: string;
  schema: string;
  version: string;
  status: string;
  lastEvent: string;
  eventAge: number | null;
}

// ─── INTELLIGENCE OBSERVATION ───
export interface ChangeObservation {
  type: 'PRICE' | 'VOLUME' | 'FLOW' | 'SPREAD' | 'DEPTH' | 'VOLATILITY' | 'RELATIONSHIP' | 'VENUE' | 'SESSION';
  symbol: string;
  previousValue?: number;
  currentValue?: number;
  changePercent?: number;
  eventTime: string;
  evidence?: string;
}

export interface UnusualObservation {
  type: 'ACTIVITY' | 'TRADE' | 'FLOW' | 'LIQUIDITY' | 'RELATIONSHIP';
  symbol: string;
  description: string;
  severity: 'LOW' | 'MEDIUM' | 'HIGH';
  eventTime: string;
  evidence?: string;
}

export interface EmergingObservation {
  type: 'ACTIVITY' | 'FLOW' | 'RELATIONSHIP' | 'STRUCTURE';
  symbol: string;
  description: string;
  confidence: 'LOW' | 'MEDIUM' | 'HIGH';
  eventTime: string;
  evidence?: string;
}

export interface IntelligenceData {
  changed: ChangeObservation[];
  unusual: UnusualObservation[];
  emerging: EmergingObservation[];
}

// ─── MARKET DATA STATE ───
export interface MarketDataState {
  instruments: Instrument[];
  quotes: Quote[];
  trades: Trade[];
  bars: Bar[];
  dataState: DataState;
  sourceAuthority: SourceAuthority;
  intelligence: IntelligenceData;
  isLoading: boolean;
  error: string | null;
  lastUpdated: number | null;
}
