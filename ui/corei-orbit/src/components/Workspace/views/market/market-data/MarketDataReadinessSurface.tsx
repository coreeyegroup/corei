import React from 'react';
import { CheckCircle2, Lock, ShieldAlert } from 'lucide-react';
import { useMarketStore } from '../../../../../services/marketDataService';

interface MarketDataReadinessSurfaceProps {
  selectedSymbol?: string | null;
}

const MarketDataReadinessSurface: React.FC<MarketDataReadinessSurfaceProps> = ({
  selectedSymbol,
}) => {
  const { instruments, loading, error } = useMarketStore();

  const symbols = Object.keys(instruments);
  const symbol = selectedSymbol || symbols[0] || null;
  const observation = symbol ? instruments[symbol] : undefined;

  const observationState = loading
    ? 'LOADING'
    : error
      ? 'ERROR'
      : observation
        ? 'AVAILABLE'
        : 'UNAVAILABLE';

  const observableReadiness =
    loading ? 'PENDING' : error ? 'BLOCKED' : observation ? 'OBSERVABLE' : 'UNKNOWN';

  const backendReadiness = [
    ['FEED READINESS', 'NOT EXPOSED'],
    ['SCHEMA READINESS', 'NOT EXPOSED'],
    ['VALIDATION READINESS', 'NOT EXPOSED'],
    ['PERSISTENCE READINESS', 'NOT EXPOSED'],
    ['REPLAY READINESS', 'NOT EXPOSED'],
    ['INTELLIGENCE READINESS', 'NOT EXPOSED'],
    ['OPERATIONAL READINESS', 'NOT EXPOSED'],
  ];

  return (
    <section className="market-data-surface market-data-readiness-surface">
      <header className="market-data-surface-header">
        <div>
          <div className="market-data-surface-eyebrow">OPERATIONS / READINESS</div>
          <h3>Market Data Readiness</h3>
          <p>
            Readiness is separated between observable frontend state and
            authoritative backend readiness metadata.
          </p>
        </div>

        <div className="market-data-surface-badge">
          <Lock size={12} />
          READ ONLY
        </div>
      </header>

      <div className="market-data-readiness-summary">
        <div>
          <span>INSTRUMENT</span>
          <strong>{symbol || 'NONE SELECTED'}</strong>
        </div>

        <div>
          <span>OBSERVATION</span>
          <strong>{observationState}</strong>
        </div>

        <div>
          <span>OBSERVABLE READINESS</span>
          <strong>{observableReadiness}</strong>
        </div>

        <div>
          <span>EXECUTION READINESS</span>
          <strong>NOT APPLICABLE</strong>
        </div>
      </div>

      <div className="market-data-readiness-section">
        <div className="market-data-readiness-section-header">
          <div>
            <span className="market-data-surface-eyebrow">BACKEND AUTHORITY</span>
            <h4>Readiness Domains</h4>
          </div>

          <ShieldAlert size={16} />
        </div>

        <div className="market-data-readiness-grid">
          {backendReadiness.map(([label, value]) => (
            <div key={label} className="market-data-readiness-item">
              <span>{label}</span>
              <strong>{value}</strong>
            </div>
          ))}
        </div>
      </div>

      <div className="market-data-readiness-observation">
        <div className="market-data-readiness-observation-icon">
          <CheckCircle2 size={16} />
        </div>

        <div>
          <strong>OBSERVABLE MARKET DATA</strong>
          <span>
            The existing Market Data API provides the current instrument
            observation surface. This does not establish feed, schema,
            validation, persistence, replay, intelligence, or operational
            readiness.
          </span>
        </div>
      </div>

      <div className="market-data-readiness-boundary">
        <strong>AUTHORITY BOUNDARY</strong>
        <span>
          The UI must not infer READY, HEALTHY, VALIDATED, PERSISTED,
          REPLAYABLE, INTELLIGENT, or OPERATIONALLY READY states from the
          presence of an observed price alone.
        </span>
      </div>

      <footer className="market-data-surface-footer">
        <span>SOURCE: MARKET DATA API</span>
        <span>READINESS AUTHORITY: NOT EXPOSED</span>
        <span>EXECUTION: NOT PERMITTED</span>
      </footer>
    </section>
  );
};

export default MarketDataReadinessSurface;
