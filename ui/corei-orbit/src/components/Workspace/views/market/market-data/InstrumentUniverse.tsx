/**
 * COREI MARKET DATA
 * MD-01 — Instrument Universe
 *
 * Responsibilities:
 *   - Present the currently exposed instrument universe.
 *   - Allow instrument selection.
 *   - Filter the universe locally.
 *   - Present only authoritative fields currently exposed by the
 *     existing Market Data contract.
 *
 * Current source:
 *   useMarketStore()
 *
 * Current exposed instrument contract:
 *   price
 *   change
 *   history
 *
 * This component deliberately does NOT fabricate:
 *   - bid / ask
 *   - venue
 *   - exchange
 *   - sequence
 *   - event timestamp
 *   - feed
 *   - depth
 */

import React, {
  useMemo,
} from 'react';

import {
  Activity,
  AlertTriangle,
  Database,
  Search,
} from 'lucide-react';

import {
  useMarketStore,
} from '../../../../../services/marketDataService';

import type {
  InstrumentData,
} from '../../../../../services/tradingService';


/* ============================================================================
   TYPES
   ============================================================================ */

export interface InstrumentUniverseProps {
  selectedSymbol: string;

  onSelect: (symbol: string) => void;

  searchQuery?: string;

  onSearchChange?: (value: string) => void;

  maxHeight?: number | string;
}


/* ============================================================================
   HELPERS
   ============================================================================ */

function formatPrice(
  price: number | undefined,
): string {
  if (typeof price !== 'number' || !Number.isFinite(price)) {
    return '—';
  }

  return price.toLocaleString(
    undefined,
    {
      minimumFractionDigits: 2,
      maximumFractionDigits: 8,
    },
  );
}


function formatChange(
  change: number | undefined,
): string {
  if (typeof change !== 'number' || !Number.isFinite(change)) {
    return '—';
  }

  const sign = change > 0
    ? '+'
    : '';

  return `${sign}${change.toFixed(2)}%`;
}


function changeClass(
  change: number | undefined,
): string {
  if (typeof change !== 'number' || !Number.isFinite(change)) {
    return 'neutral';
  }

  if (change > 0) {
    return 'positive';
  }

  if (change < 0) {
    return 'negative';
  }

  return 'neutral';
}


/* ============================================================================
   COMPONENT
   ============================================================================ */

const InstrumentUniverse: React.FC<
  InstrumentUniverseProps
> = ({
  selectedSymbol,
  onSelect,
  searchQuery = '',
  onSearchChange,
  maxHeight = 360,
}) => {
  const instruments = useMarketStore(
    (state) => state.instruments,
  );

  const loading = useMarketStore(
    (state) => state.loading,
  );

  const error = useMarketStore(
    (state) => state.error,
  );


  /* --------------------------------------------------------------------------
     SYMBOL LIST
     -------------------------------------------------------------------------- */

  const symbols = useMemo(
    () => Object.keys(instruments).sort(
      (a, b) => a.localeCompare(b),
    ),
    [instruments],
  );


  /* --------------------------------------------------------------------------
     FILTER
     -------------------------------------------------------------------------- */

  const filteredSymbols = useMemo(() => {
    const normalizedQuery =
      searchQuery.trim().toLowerCase();

    if (!normalizedQuery) {
      return symbols;
    }

    return symbols.filter(
      (symbol) =>
        symbol
          .toLowerCase()
          .includes(normalizedQuery),
    );
  }, [
    searchQuery,
    symbols,
  ]);


  /* ==========================================================================
     RENDER
     ========================================================================== */

  return (
    <section className="md-universe">
      <header className="md-surface-header">
        <div className="md-surface-heading">
          <Database
            size={13}
            strokeWidth={1.7}
            aria-hidden="true"
          />

          <div>
            <div className="md-surface-title">
              INSTRUMENT UNIVERSE
            </div>

            <div className="md-surface-subtitle">
              Currently exposed market instruments
            </div>
          </div>
        </div>

        <div className="md-surface-count">
          {filteredSymbols.length}
        </div>
      </header>


      <div className="md-universe-toolbar">
        <div className="md-universe-search">
          <Search
            size={12}
            strokeWidth={1.7}
            aria-hidden="true"
          />

          <input
            type="search"
            value={searchQuery}
            onChange={(event) =>
              onSearchChange?.(
                event.target.value,
              )
            }
            placeholder="Filter instruments..."
            aria-label="Filter instruments"
            autoComplete="off"
            spellCheck={false}
          />
        </div>

        <span className="md-universe-authority">
          MARKET DATA
        </span>
      </div>


      <div
        className="md-universe-list"
        style={{
          maxHeight,
        }}
        role="listbox"
        aria-label="Instrument universe"
      >
        {loading && symbols.length === 0 && (
          <div className="md-universe-state">
            <Activity
              size={15}
              strokeWidth={1.6}
              className="md-spin"
              aria-hidden="true"
            />

            <span>
              Loading instruments...
            </span>
          </div>
        )}


        {!loading && error && (
          <div className="md-universe-state md-universe-error">
            <AlertTriangle
              size={15}
              strokeWidth={1.6}
              aria-hidden="true"
            />

            <div>
              <strong>
                Market Data unavailable
              </strong>

              <span>
                {error}
              </span>
            </div>
          </div>
        )}


        {!loading &&
          !error &&
          symbols.length === 0 && (
            <div className="md-universe-state">
              <Database
                size={15}
                strokeWidth={1.6}
                aria-hidden="true"
              />

              <span>
                No instruments exposed.
              </span>
            </div>
          )}


        {!loading &&
          !error &&
          symbols.length > 0 &&
          filteredSymbols.length === 0 && (
            <div className="md-universe-state">
              <Search
                size={15}
                strokeWidth={1.6}
                aria-hidden="true"
              />

              <span>
                No instruments match the current filter.
              </span>
            </div>
          )}


        {filteredSymbols.map((symbol) => {
          const instrument: InstrumentData =
            instruments[symbol];

          const selected =
            symbol === selectedSymbol;

          const historyCount =
            Array.isArray(instrument?.history)
              ? instrument.history.length
              : 0;

          return (
            <button
              key={symbol}
              type="button"
              role="option"
              aria-selected={selected}
              className={
                selected
                  ? 'md-instrument-row is-selected'
                  : 'md-instrument-row'
              }
              onClick={() => onSelect(symbol)}
            >
              <span className="md-instrument-main">
                <span className="md-instrument-symbol">
                  {symbol}
                </span>

                <span className="md-instrument-meta">
                  HISTORY {historyCount}
                </span>
              </span>


              <span className="md-instrument-observation">
                <span className="md-instrument-price">
                  {formatPrice(
                    instrument?.price,
                  )}
                </span>

                <span
                  className={
                    `md-instrument-change ${changeClass(
                      instrument?.change,
                    )}`
                  }
                >
                  {formatChange(
                    instrument?.change,
                  )}
                </span>
              </span>
            </button>
          );
        })}
      </div>


      <footer className="md-universe-footer">
        <span>
          SOURCE
        </span>

        <span className="md-universe-footer-value">
          trading / market-data
        </span>

        <span className="md-universe-footer-state">
          EXPOSED
        </span>
      </footer>
    </section>
  );
};


export default InstrumentUniverse;
