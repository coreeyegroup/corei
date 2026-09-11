/**
 * COREI MARKET DATA
 * MD-01 — Capability Registry
 *
 * Purpose:
 *   Defines the complete Market Data workstation capability surface.
 *
 * This registry is intentionally separate from React rendering.
 *
 * Rules:
 *   - Registry describes capabilities.
 *   - Exposure describes current frontend authority.
 *   - NOT_EXPOSED does not mean the capability does not exist architecturally.
 *   - No unavailable backend data is fabricated here.
 *   - Market Data remains read-only with respect to trading execution.
 */

import type {
  CapabilityDescriptor,
  ExposureState,
  MarketDataCapability,
} from './MarketDataTypes';


/* ============================================================================
   GROUPS
   ============================================================================ */

export type MarketDataCapabilityGroup =
  | 'COMMAND'
  | 'OBSERVATION'
  | 'CONTEXT'
  | 'DATA_STATE'
  | 'GOVERNANCE'
  | 'ORIGIN'
  | 'HISTORICAL'
  | 'REPLAY'
  | 'DERIVED'
  | 'INTELLIGENCE'
  | 'OPERATIONS';


export interface MarketDataCapabilityGroupDescriptor {
  id: MarketDataCapabilityGroup;
  title: string;
  order: number;
  capabilities: readonly MarketDataCapability[];
}


/* ============================================================================
   CAPABILITY FACTORY
   ============================================================================ */

function capability(
  id: MarketDataCapability,
  title: string,
  description: string,
  exposure: ExposureState = 'NOT_EXPOSED',
): CapabilityDescriptor {
  return {
    id,
    title,
    description,
    exposure,
    readOnly: true,
  };
}


/* ============================================================================
   COMMAND
   ============================================================================ */

export const COMMAND_CAPABILITIES: readonly CapabilityDescriptor[] = [
  capability(
    'OVERVIEW',
    'Overview',
    'Unified Market Data workstation overview.',
    'BACKEND_AVAILABLE',
  ),
];


/* ============================================================================
   OBSERVATION
   ============================================================================ */

export const OBSERVATION_CAPABILITIES: readonly CapabilityDescriptor[] = [
  capability(
    'INSTRUMENTS',
    'Instruments',
    'Instrument universe and selected-instrument observation.',
    'AVAILABLE',
  ),

  capability(
    'QUOTES',
    'Quotes',
    'Bid, ask, midpoint, spread and quote-size observation.',
  ),

  capability(
    'TRADES',
    'Trades',
    'Executed market-trade observations.',
  ),

  capability(
    'ORDER_BOOK',
    'Order Book',
    'Governed order-book observation surface.',
  ),

  capability(
    'DEPTH',
    'Depth',
    'Market depth and price-level liquidity observation.',
  ),

  capability(
    'TIME_AND_SALES',
    'Time & Sales',
    'Chronological trade and market-event tape.',
  ),

  capability(
    'BARS',
    'OHLC / Bars',
    'Governed OHLCV bar observations.',
  ),

  capability(
    'MARKET_STATUS',
    'Market Status',
    'Exchange, venue and market operational status.',
  ),
];


/* ============================================================================
   CONTEXT
   ============================================================================ */

export const CONTEXT_CAPABILITIES: readonly CapabilityDescriptor[] = [
  capability(
    'SESSION',
    'Session',
    'Trading-session context and state.',
  ),

  capability(
    'VENUE',
    'Venue',
    'Venue-specific market context.',
  ),

  capability(
    'EXCHANGE',
    'Exchange',
    'Exchange-level market context.',
  ),

  capability(
    'CROSS_MARKET',
    'Cross-Market',
    'Cross-market observation and context relationships.',
  ),
];


/* ============================================================================
   DATA STATE
   ============================================================================ */

export const DATA_STATE_CAPABILITIES: readonly CapabilityDescriptor[] = [
  capability(
    'DATA_STATE',
    'Data State',
    'Availability, freshness, quality, integrity and trust state.',
    'BACKEND_AVAILABLE',
  ),

  capability(
    'DATA_QUALITY',
    'Data Quality',
    'Quality and validation state of market observations.',
  ),
];


/* ============================================================================
   GOVERNANCE
   ============================================================================ */

export const GOVERNANCE_CAPABILITIES: readonly CapabilityDescriptor[] = [
  capability(
    'GOVERNANCE',
    'Governance',
    'Market-data governance and authority controls.',
  ),

  capability(
    'SCHEMA',
    'Schema',
    'Governed market-data schema visibility.',
  ),

  capability(
    'CONTRACT',
    'Contract',
    'Market-data API and event contract visibility.',
    'AVAILABLE',
  ),
];


/* ============================================================================
   ORIGIN
   ============================================================================ */

export const ORIGIN_CAPABILITIES: readonly CapabilityDescriptor[] = [
  capability(
    'SOURCE',
    'Source',
    'Originating market-data source.',
  ),

  capability(
    'FEED',
    'Feed',
    'Market-data feed identity and state.',
  ),

  capability(
    'PROVENANCE',
    'Provenance',
    'Evidence of market-data origin and authority.',
  ),

  capability(
    'LINEAGE',
    'Lineage',
    'Data lineage from source through downstream processing.',
  ),
];


/* ============================================================================
   HISTORICAL
   ============================================================================ */

export const HISTORICAL_CAPABILITIES: readonly CapabilityDescriptor[] = [
  capability(
    'HISTORICAL',
    'Historical Data',
    'Historical market-data search and access.',
  ),

  capability(
    'DATASET',
    'Dataset',
    'Governed historical datasets.',
  ),

  capability(
    'SNAPSHOT',
    'Snapshot',
    'Point-in-time market-data snapshots.',
  ),

  capability(
    'COMPARISON',
    'Comparison',
    'Comparison of historical market-data states.',
  ),
];


/* ============================================================================
   REPLAY
   ============================================================================ */

export const REPLAY_CAPABILITIES: readonly CapabilityDescriptor[] = [
  capability(
    'REPLAY',
    'Replay',
    'Deterministic market-data replay.',
  ),

  capability(
    'RECONSTRUCTION',
    'Reconstruction',
    'Historical market-state reconstruction.',
  ),

  capability(
    'CHECKPOINT',
    'Checkpoint',
    'Replay checkpoint management and inspection.',
  ),

  capability(
    'REPLAY_VALIDATION',
    'Replay Validation',
    'Validation of replay correctness against governed data.',
  ),
];


/* ============================================================================
   DERIVED DATA
   ============================================================================ */

export const DERIVED_CAPABILITIES: readonly CapabilityDescriptor[] = [
  capability(
    'DERIVED',
    'Derived Data',
    'Derived market observations generated from governed source data.',
  ),

  capability(
    'FEATURES',
    'Features',
    'Market features generated from governed observations.',
  ),

  capability(
    'LIQUIDITY',
    'Liquidity',
    'Liquidity-derived market measurements.',
  ),

  capability(
    'FLOW',
    'Flow',
    'Market-flow derived observations.',
  ),

  capability(
    'VOLATILITY',
    'Volatility',
    'Volatility-derived market measurements.',
  ),

  capability(
    'RELATIONSHIPS',
    'Relationships',
    'Cross-instrument and cross-market relationships.',
  ),
];


/* ============================================================================
   COREI INTELLIGENCE
   ============================================================================ */

export const INTELLIGENCE_CAPABILITIES: readonly CapabilityDescriptor[] = [
  capability(
    'WHAT_CHANGED',
    'What Changed?',
    'Detection and presentation of meaningful market changes.',
  ),

  capability(
    'UNUSUAL',
    'What Is Unusual?',
    'Identification of unusual market conditions or observations.',
  ),

  capability(
    'EMERGING',
    'What Is Emerging?',
    'Identification of emerging market conditions.',
  ),

  capability(
    'RELATIONSHIPS',
    'Relationships',
    'Interpretation of changing market relationships.',
  ),

  capability(
    'EVIDENCE',
    'Evidence',
    'Evidence supporting a market interpretation.',
  ),

  capability(
    'INTELLIGENCE_TRACE',
    'Intelligence Trace',
    'Trace from interpretation back to supporting evidence and dependencies.',
  ),
];


/* ============================================================================
   OPERATIONS
   ============================================================================ */

export const OPERATIONS_CAPABILITIES: readonly CapabilityDescriptor[] = [
  capability(
    'FEED_MONITORING',
    'Feed Monitoring',
    'Observation of market-feed operational state.',
  ),

  capability(
    'ALERTS',
    'Alerts',
    'Market-data operational alerts.',
  ),

  capability(
    'RECOVERY',
    'Recovery',
    'Market-data recovery and continuity state.',
  ),

  capability(
    'AUDIT',
    'Audit',
    'Market-data operational audit visibility.',
  ),

  capability(
    'CONTROLS',
    'Controls',
    'Read-only market-data operational controls.',
  ),
];


/* ============================================================================
   GROUP REGISTRY
   ============================================================================ */

export const MARKET_DATA_CAPABILITY_GROUPS:
  readonly MarketDataCapabilityGroupDescriptor[] = [
    {
      id: 'COMMAND',
      title: 'Command',
      order: 0,
      capabilities: COMMAND_CAPABILITIES.map(
        ({ id }) => id,
      ),
    },

    {
      id: 'OBSERVATION',
      title: 'Observation',
      order: 1,
      capabilities: OBSERVATION_CAPABILITIES.map(
        ({ id }) => id,
      ),
    },

    {
      id: 'CONTEXT',
      title: 'Context',
      order: 2,
      capabilities: CONTEXT_CAPABILITIES.map(
        ({ id }) => id,
      ),
    },

    {
      id: 'DATA_STATE',
      title: 'Data State',
      order: 3,
      capabilities: DATA_STATE_CAPABILITIES.map(
        ({ id }) => id,
      ),
    },

    {
      id: 'GOVERNANCE',
      title: 'Governance',
      order: 4,
      capabilities: GOVERNANCE_CAPABILITIES.map(
        ({ id }) => id,
      ),
    },

    {
      id: 'ORIGIN',
      title: 'Origin & Lineage',
      order: 5,
      capabilities: ORIGIN_CAPABILITIES.map(
        ({ id }) => id,
      ),
    },

    {
      id: 'HISTORICAL',
      title: 'Historical',
      order: 6,
      capabilities: HISTORICAL_CAPABILITIES.map(
        ({ id }) => id,
      ),
    },

    {
      id: 'REPLAY',
      title: 'Replay',
      order: 7,
      capabilities: REPLAY_CAPABILITIES.map(
        ({ id }) => id,
      ),
    },

    {
      id: 'DERIVED',
      title: 'Derived Data',
      order: 8,
      capabilities: DERIVED_CAPABILITIES.map(
        ({ id }) => id,
      ),
    },

    {
      id: 'INTELLIGENCE',
      title: 'COREI Intelligence',
      order: 9,
      capabilities: INTELLIGENCE_CAPABILITIES.map(
        ({ id }) => id,
      ),
    },

    {
      id: 'OPERATIONS',
      title: 'Operations',
      order: 10,
      capabilities: OPERATIONS_CAPABILITIES.map(
        ({ id }) => id,
      ),
    },
  ];


/* ============================================================================
   COMPLETE REGISTRY
   ============================================================================ */

export const MARKET_DATA_CAPABILITIES:
  readonly CapabilityDescriptor[] = [
    ...COMMAND_CAPABILITIES,
    ...OBSERVATION_CAPABILITIES,
    ...CONTEXT_CAPABILITIES,
    ...DATA_STATE_CAPABILITIES,
    ...GOVERNANCE_CAPABILITIES,
    ...ORIGIN_CAPABILITIES,
    ...HISTORICAL_CAPABILITIES,
    ...REPLAY_CAPABILITIES,
    ...DERIVED_CAPABILITIES,
    ...INTELLIGENCE_CAPABILITIES,
    ...OPERATIONS_CAPABILITIES,
];


/* ============================================================================
   LOOKUP
   ============================================================================ */

export const MARKET_DATA_CAPABILITY_MAP:
  ReadonlyMap<MarketDataCapability, CapabilityDescriptor> =
  new Map(
    MARKET_DATA_CAPABILITIES.map(
      (descriptor) => [descriptor.id, descriptor],
    ),
  );


export function getMarketDataCapability(
  id: MarketDataCapability,
): CapabilityDescriptor {
  return (
    MARKET_DATA_CAPABILITY_MAP.get(id) ??
    capability(
      id,
      id,
      'Capability descriptor not registered.',
      'NOT_EXPOSED',
    )
  );
}


/* ============================================================================
   EXPOSURE HELPERS
   ============================================================================ */

export function isMarketDataCapabilityExposed(
  id: MarketDataCapability,
): boolean {
  const descriptor = getMarketDataCapability(id);

  return (
    descriptor.exposure === 'AVAILABLE' ||
    descriptor.exposure === 'BACKEND_AVAILABLE'
  );
}


export function getMarketDataExposure(
  id: MarketDataCapability,
): ExposureState {
  return getMarketDataCapability(id).exposure;
}


/* ============================================================================
   READ-ONLY PERMISSION BOUNDARY
   ============================================================================ */

export const MARKET_DATA_EXECUTION_BOUNDARY = Object.freeze({
  orderPlacement: false,
  orderCancellation: false,
  orderModification: false,
  orderRouting: false,
  executionControl: false,
});


/* ============================================================================
   FEATURE COUNTS
   ============================================================================ */

export const MARKET_DATA_CAPABILITY_COUNTS = Object.freeze({
  total: MARKET_DATA_CAPABILITIES.length,

  command: COMMAND_CAPABILITIES.length,
  observation: OBSERVATION_CAPABILITIES.length,
  context: CONTEXT_CAPABILITIES.length,
  dataState: DATA_STATE_CAPABILITIES.length,
  governance: GOVERNANCE_CAPABILITIES.length,
  origin: ORIGIN_CAPABILITIES.length,
  historical: HISTORICAL_CAPABILITIES.length,
  replay: REPLAY_CAPABILITIES.length,
  derived: DERIVED_CAPABILITIES.length,
  intelligence: INTELLIGENCE_CAPABILITIES.length,
  operations: OPERATIONS_CAPABILITIES.length,
});


/* ============================================================================
   INTEGRITY CHECK
   ============================================================================ */

export function validateMarketDataCapabilityRegistry(): {
  valid: boolean;
  duplicateIds: MarketDataCapability[];
  total: number;
} {
  const seen = new Set<MarketDataCapability>();
  const duplicateIds: MarketDataCapability[] = [];

  for (const descriptor of MARKET_DATA_CAPABILITIES) {
    if (seen.has(descriptor.id)) {
      duplicateIds.push(descriptor.id);
    }

    seen.add(descriptor.id);
  }

  return {
    valid: duplicateIds.length === 0,
    duplicateIds,
    total: MARKET_DATA_CAPABILITIES.length,
  };
}
