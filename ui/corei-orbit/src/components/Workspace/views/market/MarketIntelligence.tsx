import React, { useMemo, useState } from 'react';
import {
  Activity,
  AlertTriangle,
  CheckCircle2,
  Database,
  Eye,
  GitBranch,
  History,
  RefreshCw,
  Search,
  ShieldCheck,
  XCircle,
} from 'lucide-react';
import { useMarketStore } from '../../../../services/marketDataService';
import './MarketIntelligence.css';
import MarketDataWorkspace from './market-data/MarketDataWorkspace';

export type MarketIntelligenceSection =
  | 'overview'
  | 'market-data'
  | 'market-health'
  | 'technical'
  | 'structure'
  | 'trend'
  | 'volatility'
  | 'momentum'
  | 'regime';

interface MarketIntelligenceProps {
  section?: MarketIntelligenceSection;
}

interface HistoryObservation {
  sequence: number;
  price: number;
  delta: number | null;
}

const SECTION_META: Record<
  MarketIntelligenceSection,
  { title: string; subtitle: string; short: string }
> = {
  overview: {
    title: 'Market Intelligence',
    subtitle:
      'Institutional market workspace — observation, state, discovery and intelligence boundary',
    short: 'Overview',
  },
  'market-data': {
    title: 'Market Data',
    subtitle:
      'Governed market observation surface using the existing Orbit market-data contract',
    short: 'Data',
  },
  'market-health': {
    title: 'Market Health',
    subtitle:
      'Market-data availability and observable service-state boundary',
    short: 'Health',
  },
  technical: {
    title: 'Technical Indicators',
    subtitle:
      'Technical analytics require an authoritative analytical provider',
    short: 'Technical',
  },
  structure: {
    title: 'Market Structure',
    subtitle:
      'Structure analytics require authoritative market-structure data',
    short: 'Structure',
  },
  trend: {
    title: 'Trend Analysis',
    subtitle:
      'Trend analytics require authoritative analytical state',
    short: 'Trend',
  },
  volatility: {
    title: 'Volatility Analysis',
    subtitle:
      'Volatility analytics require authoritative analytical state',
    short: 'Volatility',
  },
  momentum: {
    title: 'Momentum Analysis',
    subtitle:
      'Momentum analytics require authoritative analytical state',
    short: 'Momentum',
  },
  regime: {
    title: 'Market Regime',
    subtitle:
      'Regime state requires an authoritative market-context provider',
    short: 'Regime',
  },
};

function formatPrice(value: number | undefined): string {
  if (value === undefined || !Number.isFinite(value)) {
    return '--';
  }

  return value.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 8,
  });
}

function formatChange(value: number | undefined): string {
  if (value === undefined || !Number.isFinite(value)) {
    return '--';
  }

  return `${value >= 0 ? '+' : ''}${value.toFixed(4)}`;
}

function formatInteger(value: number): string {
  return value.toLocaleString();
}

function changeClass(value: number | undefined): string {
  if (value === undefined || !Number.isFinite(value)) {
    return 'neutral';
  }

  if (value > 0) {
    return 'positive';
  }

  if (value < 0) {
    return 'negative';
  }

  return 'neutral';
}

function capabilityState(
  available: boolean,
): 'AVAILABLE' | 'NOT_EXPOSED' {
  return available ? 'AVAILABLE' : 'NOT_EXPOSED';
}

function deriveHistory(history: number[]): HistoryObservation[] {
  return history.slice(-32).map((price, index, values) => {
    const previous = index > 0 ? values[index - 1] : null;

    return {
      sequence: history.length - values.length + index + 1,
      price,
      delta:
        previous !== null && Number.isFinite(previous) && Number.isFinite(price)
          ? price - previous
          : null,
    };
  }).reverse();
}

const CapabilityBoundary: React.FC<{
  title: string;
  description: string;
}> = ({ title, description }) => (
  <section className="mi-capability-boundary">
    <div className="mi-boundary-icon">
      <ShieldCheck size={17} />
    </div>

    <div className="mi-boundary-copy">
      <div className="mi-boundary-kicker">AUTHORITY BOUNDARY</div>
      <h3>{title}</h3>
      <p>{description}</p>
      <span className="mi-state-badge neutral">NOT EXPOSED</span>
    </div>
  </section>
);

const MarketIntelligence: React.FC<MarketIntelligenceProps> = ({
  section = 'overview',
}) => {
  const instruments = useMarketStore((state) => state.instruments);
  const loading = useMarketStore((state) => state.loading);
  const error = useMarketStore((state) => state.error);
  const fetchData = useMarketStore((state) => state.fetchData);

  const [query, setQuery] = useState('');
  const [selectedSymbol, setSelectedSymbol] = useState<string>('');

  const symbols = useMemo(
    () =>
      Object.keys(instruments).sort((a, b) =>
        a.localeCompare(b),
      ),
    [instruments],
  );


  const filteredSymbols = useMemo(() => {
    const normalized = query.trim().toLowerCase();

    if (!normalized) {
      return symbols;
    }

    return symbols.filter((symbol) =>
      symbol.toLowerCase().includes(normalized),
    );
  }, [query, symbols]);

  const effectiveSelectedSymbol =
    selectedSymbol && instruments[selectedSymbol]
      ? selectedSymbol
      : symbols[0] ?? '';

  const selectedInstrument = effectiveSelectedSymbol
    ? instruments[effectiveSelectedSymbol]
    : undefined;

  const priceHistory: number[] = selectedInstrument?.history ?? [];

  const observations: HistoryObservation[] =
    deriveHistory(priceHistory);

  const latestHistoryPrice =
    priceHistory.length > 0
      ? priceHistory[priceHistory.length - 1]
      : undefined;

  const priceMatchesHistory =
    selectedInstrument &&
    latestHistoryPrice !== undefined &&
    Number.isFinite(latestHistoryPrice)
      ? selectedInstrument.price === latestHistoryPrice
      : null;

  const lastObservedChange =
    selectedInstrument?.change !== undefined
      ? selectedInstrument.change
      : undefined;

  const meta = SECTION_META[section];

  const handleRefresh = () => {
    void fetchData();
  };

  if (section === 'market-data') {
    return <MarketDataWorkspace />;
  }

  if (section !== 'overview') {
    return (
      <div className="mi-workstation">
        <header className="mi-authority-header">
          <div>
            <div className="mi-eyebrow">MARKET INTELLIGENCE / {meta.short.toUpperCase()}</div>
            <h2>{meta.title}</h2>
            <p>{meta.subtitle}</p>
          </div>

          <div className="mi-authority-state">
            <span className="mi-state-dot neutral" />
            <span>AUTHORITY REQUIRED</span>
          </div>
        </header>

        <CapabilityBoundary
          title={`${meta.title} analytical surface is not synthesized in the UI`}
          description="This surface remains explicitly bounded until an authoritative backend analytical contract is exposed. No placeholder market intelligence is presented as fact."
        />
      </div>
    );
  }

  return (
    <div className="mi-workstation">
      {/* ------------------------------------------------------------------ */}
      {/* AUTHORITY HEADER                                                   */}
      {/* ------------------------------------------------------------------ */}

      <header className="mi-authority-header">
        <div className="mi-authority-title">
          <div className="mi-eyebrow">
            MARKET INTELLIGENCE / MARKET DATA
          </div>

          <h2>{meta.title}</h2>

          <p>{meta.subtitle}</p>
        </div>

        <div className="mi-authority-state">
          <span
            className={`mi-state-dot ${
              error ? 'negative' : loading ? 'neutral' : 'positive'
            }`}
          />

          <span>
            {error
              ? 'DATA ERROR'
              : loading
                ? 'ACQUIRING'
                : 'OBSERVATION AVAILABLE'}
          </span>
        </div>
      </header>

      {/* ------------------------------------------------------------------ */}
      {/* COMMAND SURFACE                                                    */}
      {/* ------------------------------------------------------------------ */}

      <section className="mi-command-surface">
        <div className="mi-command-search">
          <Search size={15} />
          <input
            type="text"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search instrument..."
            aria-label="Search instrument"
          />

          {query && (
            <button
              type="button"
              className="mi-icon-button"
              onClick={() => setQuery('')}
              aria-label="Clear search"
              title="Clear search"
            >
              <XCircle size={14} />
            </button>
          )}
        </div>

        <div className="mi-command-divider" />

        <button
          type="button"
          className="mi-command-button"
          onClick={handleRefresh}
          disabled={loading}
        >
          <RefreshCw
            size={14}
            className={loading ? 'mi-spin' : ''}
          />
          REFRESH
        </button>

        <div className="mi-command-meta">
          <span>API CONTRACT</span>
          <strong>InstrumentData</strong>
        </div>
      </section>

      {error && (
        <div className="mi-error-strip">
          <AlertTriangle size={14} />
          <span>{error}</span>
        </div>
      )}

      {/* ------------------------------------------------------------------ */}
      {/* AUTHORITY STRIP                                                     */}
      {/* ------------------------------------------------------------------ */}

      <section className="mi-authority-strip">
        <div className="mi-authority-cell">
          <span>SOURCE</span>
          <strong>MARKET DATA API</strong>
        </div>

        <div className="mi-authority-cell">
          <span>ENDPOINT</span>
          <strong>/trading/market-data</strong>
        </div>

        <div className="mi-authority-cell">
          <span>INSTRUMENTS</span>
          <strong>{formatInteger(symbols.length)}</strong>
        </div>

        <div className="mi-authority-cell">
          <span>EVENT AUTHORITY</span>
          <strong className="muted">NOT EXPOSED</strong>
        </div>

        <div className="mi-authority-cell">
          <span>LINEAGE</span>
          <strong className="muted">NOT EXPOSED</strong>
        </div>

        <div className="mi-authority-cell">
          <span>REPLAY</span>
          <strong className="muted">NOT EXPOSED</strong>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* PRIMARY WORKSPACE                                                  */}
      {/* ------------------------------------------------------------------ */}

      <main className="mi-main-grid">
        {/* INSTRUMENT EXPLORER */}

        <section className="mi-panel mi-explorer-panel">
          <div className="mi-panel-header">
            <div>
              <span className="mi-panel-kicker">01 / OBSERVATION</span>
              <h3>Instrument Explorer</h3>
            </div>

            <span className="mi-panel-count">
              {filteredSymbols.length} / {symbols.length}
            </span>
          </div>

          <div className="mi-instrument-list">
            {filteredSymbols.length === 0 ? (
              <div className="mi-empty-state">
                <Database size={18} />
                <span>
                  {symbols.length === 0
                    ? 'NO MARKET DATA AVAILABLE'
                    : 'NO INSTRUMENT MATCH'}
                </span>
              </div>
            ) : (
              filteredSymbols.map((symbol) => {
                const instrument = instruments[symbol];

                return (
                  <button
                    type="button"
                    key={symbol}
                    className={`mi-instrument-row ${
                      selectedSymbol === symbol ? 'selected' : ''
                    }`}
                    onClick={() => setSelectedSymbol(symbol)}
                  >
                    <div className="mi-instrument-identity">
                      <strong>{symbol}</strong>
                      <span>
                        {instrument.history.length} observations
                      </span>
                    </div>

                    <div className="mi-instrument-value">
                      <strong>{formatPrice(instrument.price)}</strong>

                      <span
                        className={`mi-change ${changeClass(
                          instrument.change,
                        )}`}
                      >
                        {formatChange(instrument.change)}
                      </span>
                    </div>
                  </button>
                );
              })
            )}
          </div>
        </section>

        {/* SELECTED INSTRUMENT */}

        <section className="mi-panel mi-observation-panel">
          <div className="mi-panel-header">
            <div>
              <span className="mi-panel-kicker">02 / LIVE OBSERVATION</span>
              <h3>
                {effectiveSelectedSymbol || 'No instrument selected'}
              </h3>
            </div>

            <div className="mi-panel-tools">
              <span className="mi-readonly-badge">
                READ ONLY
              </span>
            </div>
          </div>

          {selectedInstrument ? (
            <>
              <div className="mi-price-object">
                <div>
                  <span className="mi-object-label">LAST OBSERVED PRICE</span>

                  <div className="mi-price-value">
                    {formatPrice(selectedInstrument.price)}
                  </div>
                </div>

                <div className="mi-change-object">
                  <span className="mi-object-label">CHANGE</span>

                  <strong
                    className={changeClass(selectedInstrument.change)}
                  >
                    {formatChange(selectedInstrument.change)}
                  </strong>
                </div>
              </div>

              <div className="mi-observation-grid">
                <div className="mi-observation-field">
                  <span>HISTORY OBSERVATIONS</span>
                  <strong>{formatInteger(priceHistory.length)}</strong>
                </div>

                <div className="mi-observation-field">
                  <span>LATEST HISTORY VALUE</span>
                  <strong>{formatPrice(latestHistoryPrice)}</strong>
                </div>

                <div className="mi-observation-field">
                  <span>HISTORY / LAST PRICE</span>
                  <strong>
                    {priceMatchesHistory === null
                      ? 'UNRESOLVED'
                      : priceMatchesHistory
                        ? 'MATCH'
                        : 'DIFFERENCE'}
                  </strong>
                </div>

                <div className="mi-observation-field">
                  <span>OBSERVATION CHANGE</span>
                  <strong
                    className={changeClass(lastObservedChange)}
                  >
                    {formatChange(lastObservedChange)}
                  </strong>
                </div>
              </div>

              <div className="mi-field-boundary">
                <div>
                  <span>BID / ASK</span>
                  <strong>NOT EXPOSED</strong>
                </div>

                <div>
                  <span>VENUE</span>
                  <strong>NOT EXPOSED</strong>
                </div>

                <div>
                  <span>SEQUENCE</span>
                  <strong>NOT EXPOSED</strong>
                </div>

                <div>
                  <span>EVENT TIME</span>
                  <strong>NOT EXPOSED</strong>
                </div>
              </div>
            </>
          ) : (
            <div className="mi-empty-state large">
              <Eye size={19} />
              <span>SELECT AN INSTRUMENT TO INSPECT</span>
            </div>
          )}
        </section>
      </main>

      {/* ------------------------------------------------------------------ */}
      {/* SECONDARY WORKSPACE                                                */}
      {/* ------------------------------------------------------------------ */}

      <section className="mi-secondary-grid">
        {/* DATA STATE */}

        <section className="mi-panel">
          <div className="mi-panel-header">
            <div>
              <span className="mi-panel-kicker">03 / DATA STATE</span>
              <h3>Observation State</h3>
            </div>
          </div>

          <div className="mi-state-grid">
            <div className="mi-state-row">
              <span>AVAILABILITY</span>
              <strong className="positive">
                {capabilityState(symbols.length > 0)}
              </strong>
            </div>

            <div className="mi-state-row">
              <span>PAYLOAD</span>
              <strong className="positive">VALID</strong>
            </div>

            <div className="mi-state-row">
              <span>FRESHNESS</span>
              <strong className="muted">NOT EXPOSED</strong>
            </div>

            <div className="mi-state-row">
              <span>INTEGRITY</span>
              <strong className="muted">NOT EXPOSED</strong>
            </div>

            <div className="mi-state-row">
              <span>TRUST</span>
              <strong className="muted">NOT EXPOSED</strong>
            </div>

            <div className="mi-state-row">
              <span>AUTHORITY</span>
              <strong>API PAYLOAD</strong>
            </div>
          </div>
        </section>

        {/* OBSERVATION STREAM */}

        <section className="mi-panel mi-stream-panel">
          <div className="mi-panel-header">
            <div>
              <span className="mi-panel-kicker">
                04 / OBSERVATION HISTORY
              </span>
              <h3>Observed Price Sequence</h3>
            </div>

            <span className="mi-panel-count">
              LOCAL DERIVATION
            </span>
          </div>

          {observations.length === 0 ? (
            <div className="mi-empty-state">
              <History size={17} />
              <span>NO HISTORY EXPOSED</span>
            </div>
          ) : (
            <div className="mi-observation-table">
              <div className="mi-table-head">
                <span>SEQUENCE</span>
                <span>PRICE</span>
                <span>DELTA</span>
              </div>

              {observations.slice(0, 12).map((observation) => (
                <div
                  className="mi-table-row"
                  key={observation.sequence}
                >
                  <span>#{observation.sequence}</span>

                  <strong>
                    {formatPrice(observation.price)}
                  </strong>

                  <span
                    className={changeClass(observation.delta ?? undefined)}
                  >
                    {observation.delta === null
                      ? '--'
                      : formatChange(observation.delta)}
                  </span>
                </div>
              ))}
            </div>
          )}
        </section>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* GOVERNANCE / PROVENANCE                                            */}
      {/* ------------------------------------------------------------------ */}

      <section className="mi-governance-grid">
        <div className="mi-governance-cell">
          <Database size={15} />
          <div>
            <span>SCHEMA</span>
            <strong>InstrumentData</strong>
          </div>
        </div>

        <div className="mi-governance-cell">
          <GitBranch size={15} />
          <div>
            <span>PROVENANCE</span>
            <strong>NOT EXPOSED</strong>
          </div>
        </div>

        <div className="mi-governance-cell">
          <History size={15} />
          <div>
            <span>REPLAY LINEAGE</span>
            <strong>NOT EXPOSED</strong>
          </div>
        </div>

        <div className="mi-governance-cell">
          <CheckCircle2 size={15} />
          <div>
            <span>UI DERIVATION</span>
            <strong>DETERMINISTIC</strong>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* COREI INTELLIGENCE LENS                                            */}
      {/* ------------------------------------------------------------------ */}

      <section className="mi-intelligence-panel">
        <div className="mi-intelligence-header">
          <div>
            <span className="mi-panel-kicker">
              05 / COREI INTELLIGENCE LENS
            </span>
            <h3>What does the observation tell us?</h3>
          </div>

          <Activity size={16} />
        </div>

        <div className="mi-intelligence-grid">
          <div className="mi-intelligence-item available">
            <span>WHAT CHANGED?</span>

            <strong>
              {selectedInstrument
                ? `OBSERVED CHANGE ${formatChange(
                    selectedInstrument.change,
                  )}`
                : 'SELECT INSTRUMENT'}
            </strong>

            <small>
              Derived directly from the current market-data contract.
            </small>
          </div>

          <div className="mi-intelligence-item">
            <span>WHAT IS UNUSUAL?</span>
            <strong>NOT EXPOSED</strong>
            <small>
              Requires authoritative anomaly/analytics state.
            </small>
          </div>

          <div className="mi-intelligence-item">
            <span>WHAT IS EMERGING?</span>
            <strong>NOT EXPOSED</strong>
            <small>
              Requires governed analytical intelligence.
            </small>
          </div>

          <div className="mi-intelligence-item">
            <span>RELATIONSHIPS</span>
            <strong>NOT EXPOSED</strong>
            <small>
              Cross-market relationship state is not in the current contract.
            </small>
          </div>

          <div className="mi-intelligence-item">
            <span>EVIDENCE</span>
            <strong>
              {selectedInstrument
                ? `${priceHistory.length} OBSERVATIONS`
                : 'NO OBSERVATION'}
            </strong>
            <small>
              Evidence is limited to the data actually returned by the API.
            </small>
          </div>

          <div className="mi-intelligence-item">
            <span>WHY?</span>
            <strong>NOT EXPOSED</strong>
            <small>
              Causal interpretation must originate from an authoritative
              intelligence layer.
            </small>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* CAPABILITY BOUNDARY                                                 */}
      {/* ------------------------------------------------------------------ */}

      <footer className="mi-footer">
        <div>
          <span className="mi-footer-indicator" />
          <span>MARKET DATA VIEW / READ ONLY</span>
        </div>

        <span>
          Order placement, routing and execution are outside this surface.
        </span>
      </footer>
    </div>
  );
};

export default MarketIntelligence;
