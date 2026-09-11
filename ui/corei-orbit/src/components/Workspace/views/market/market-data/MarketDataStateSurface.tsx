import React from 'react';
import { Activity, ShieldAlert } from 'lucide-react';
import { useMarketStore } from '../../../../../services/marketDataService';

interface MarketDataStateSurfaceProps {
  symbol: string | null;
}

const MarketDataStateSurface: React.FC<MarketDataStateSurfaceProps> = ({
  symbol,
}) => {
  const instruments = useMarketStore((state) => state.instruments);
  const loading = useMarketStore((state) => state.loading);
  const error = useMarketStore((state) => state.error);

  const instrument = symbol ? instruments[symbol] : undefined;
  const observationAvailable = Boolean(instrument);

  const historyCount = instrument?.history?.length ?? 0;

  const availability = loading
    ? 'CHECKING'
    : error
      ? 'ERROR'
      : observationAvailable
        ? 'AVAILABLE'
        : 'UNAVAILABLE';

  const observationState = loading
    ? 'REFRESHING'
    : error
      ? 'ERROR'
      : observationAvailable
        ? 'OBSERVED'
        : 'NO OBSERVATION';

  return (
    <section className="md-state-surface">
      <header className="md-state-surface-header">
        <div className="md-state-surface-title">
          <Activity size={14} />
          <span>MARKET DATA STATE</span>
        </div>

        <span className="md-state-surface-mode">
          READ ONLY
        </span>
      </header>

      <div className="md-state-grid">
        <div className="md-state-field">
          <span className="md-field-label">AVAILABILITY</span>
          <strong
            className={
              availability === 'AVAILABLE'
                ? 'md-state-value-active'
                : undefined
            }
          >
            {availability}
          </strong>
        </div>

        <div className="md-state-field">
          <span className="md-field-label">OBSERVATION</span>
          <strong>{observationState}</strong>
        </div>

        <div className="md-state-field">
          <span className="md-field-label">OBSERVATIONS</span>
          <strong>{observationAvailable ? historyCount : '—'}</strong>
        </div>

        <div className="md-state-field">
          <span className="md-field-label">FRESHNESS</span>
          <strong>NOT EXPOSED</strong>
        </div>

        <div className="md-state-field">
          <span className="md-field-label">QUALITY</span>
          <strong>NOT EXPOSED</strong>
        </div>

        <div className="md-state-field">
          <span className="md-field-label">INTEGRITY</span>
          <strong>NOT EXPOSED</strong>
        </div>

        <div className="md-state-field">
          <span className="md-field-label">COMPLETENESS</span>
          <strong>NOT EXPOSED</strong>
        </div>

        <div className="md-state-field">
          <span className="md-field-label">TRUST</span>
          <strong>NOT EXPOSED</strong>
        </div>
      </div>

      <footer className="md-state-surface-footer">
        <span>
          <ShieldAlert size={11} />
          GOVERNED DATA-STATE METADATA REQUIRES BACKEND EXPOSURE
        </span>

        <span>
          {symbol ? `INSTRUMENT: ${symbol}` : 'INSTRUMENT: NONE'}
        </span>

        <span>
          {error ? `ERROR: ${error}` : 'NO SYNTHETIC STATE GENERATED'}
        </span>
      </footer>
    </section>
  );
};

export default MarketDataStateSurface;
