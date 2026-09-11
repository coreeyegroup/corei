import React from 'react';
import { GitCompareArrows, Lock, Search } from 'lucide-react';
import { useMarketStore } from '../../../../../services/marketDataService';

interface MarketDataComparisonSurfaceProps {
  selectedSymbol?: string | null;
}

const MarketDataComparisonSurface: React.FC<MarketDataComparisonSurfaceProps> = ({
  selectedSymbol,
}) => {
  const { instruments, loading, error } = useMarketStore();

  const symbols = Object.keys(instruments);
  const symbol = selectedSymbol || symbols[0] || null;
  const observation = symbol ? instruments[symbol] : undefined;

  const state = loading
    ? 'LOADING'
    : error
      ? 'ERROR'
      : observation
        ? 'OBSERVED'
        : 'NO OBSERVATION';

  return (
    <section className="market-data-surface market-data-comparison-surface">
      <header className="market-data-surface-header">
        <div>
          <div className="market-data-surface-eyebrow">HISTORICAL / COMPARISON</div>
          <h3>Observation Comparison</h3>
          <p>
            Compare governed observations, snapshots, or datasets only when the
            authoritative comparison objects are exposed by the backend.
          </p>
        </div>

        <div className="market-data-surface-badge">
          <Lock size={12} />
          READ ONLY
        </div>
      </header>

      <div className="market-data-comparison-state">
        <div className="market-data-comparison-state-label">OBSERVATION STATE</div>
        <strong>{state}</strong>
        <span>{symbol || 'NO INSTRUMENT SELECTED'}</span>
      </div>

      <div className="market-data-comparison-grid">
        <div className="market-data-comparison-column">
          <div className="market-data-comparison-column-title">LEFT OBJECT</div>
          <div className="market-data-comparison-value">NOT EXPOSED</div>
          <span>Snapshot / dataset selection is unavailable.</span>
        </div>

        <div className="market-data-comparison-divider">
          <GitCompareArrows size={16} />
        </div>

        <div className="market-data-comparison-column">
          <div className="market-data-comparison-column-title">RIGHT OBJECT</div>
          <div className="market-data-comparison-value">NOT EXPOSED</div>
          <span>Snapshot / dataset selection is unavailable.</span>
        </div>
      </div>

      <div className="market-data-comparison-metadata">
        <div>
          <span>LEFT SNAPSHOT ID</span>
          <strong>NOT EXPOSED</strong>
        </div>
        <div>
          <span>RIGHT SNAPSHOT ID</span>
          <strong>NOT EXPOSED</strong>
        </div>
        <div>
          <span>LEFT EVENT TIME</span>
          <strong>NOT EXPOSED</strong>
        </div>
        <div>
          <span>RIGHT EVENT TIME</span>
          <strong>NOT EXPOSED</strong>
        </div>
        <div>
          <span>DATASET ID</span>
          <strong>NOT EXPOSED</strong>
        </div>
        <div>
          <span>COMPARISON STATUS</span>
          <strong>NOT EXPOSED</strong>
        </div>
      </div>

      <div className="market-data-comparison-actions">
        <button type="button" disabled title="Comparison objects are not exposed">
          <Search size={13} />
          SELECT LEFT
        </button>
        <button type="button" disabled title="Comparison objects are not exposed">
          <Search size={13} />
          SELECT RIGHT
        </button>
        <button type="button" disabled title="Comparison engine is not exposed">
          <GitCompareArrows size={13} />
          COMPARE
        </button>
        <button type="button" disabled title="Comparison lineage is not exposed">
          TRACE
        </button>
        <button type="button" disabled title="Comparison export is not exposed">
          EXPORT
        </button>
      </div>

      <div className="market-data-comparison-boundary">
        <div>
          <strong>AUTHORITY BOUNDARY</strong>
          <span>
            Current observation values may be displayed from the existing Market
            Data API. Comparison deltas, snapshot identity, dataset identity,
            event-time alignment, lineage, and evidence are not computed or
            inferred in the UI.
          </span>
        </div>
      </div>

      <footer className="market-data-surface-footer">
        <span>SOURCE: MARKET DATA API</span>
        <span>COMPARISON: NOT EXPOSED</span>
        <span>EXECUTION: NOT PERMITTED</span>
      </footer>
    </section>
  );
};

export default MarketDataComparisonSurface;
