import React from 'react';
import { History, ShieldAlert } from 'lucide-react';
import { useMarketStore } from '../../../../../services/marketDataService';

interface MarketDataHistoricalSurfaceProps {
  symbol: string | null;
}

const MarketDataHistoricalSurface: React.FC<MarketDataHistoricalSurfaceProps> = ({
  symbol,
}) => {
  const instruments = useMarketStore((state) => state.instruments);
  const loading = useMarketStore((state) => state.loading);
  const error = useMarketStore((state) => state.error);

  const instrument = symbol ? instruments[symbol] : undefined;
  const observationAvailable = Boolean(instrument);
  const historyCount = instrument?.history?.length ?? 0;

  const historyState = loading
    ? 'REFRESHING'
    : error
      ? 'ERROR'
      : observationAvailable
        ? 'OBSERVATION HISTORY AVAILABLE'
        : 'NO HISTORY';

  return (
    <section className="md-historical-surface">
      <header className="md-historical-surface-header">
        <div className="md-historical-surface-title">
          <History size={14} />
          <span>MARKET DATA HISTORICAL</span>
        </div>

        <span className="md-historical-surface-mode">
          READ ONLY
        </span>
      </header>

      <div className="md-historical-grid">
        <div className="md-historical-field">
          <span className="md-field-label">INSTRUMENT</span>
          <strong>{symbol || 'NONE'}</strong>
        </div>

        <div className="md-historical-field">
          <span className="md-field-label">OBSERVATIONS</span>
          <strong>{observationAvailable ? historyCount : '—'}</strong>
        </div>

        <div className="md-historical-field">
          <span className="md-field-label">DATASET</span>
          <strong>NOT EXPOSED</strong>
        </div>

        <div className="md-historical-field">
          <span className="md-field-label">SNAPSHOT</span>
          <strong>NOT EXPOSED</strong>
        </div>

        <div className="md-historical-field">
          <span className="md-field-label">ARCHIVE</span>
          <strong>NOT EXPOSED</strong>
        </div>

        <div className="md-historical-field">
          <span className="md-field-label">EVENT RANGE</span>
          <strong>NOT EXPOSED</strong>
        </div>

        <div className="md-historical-field">
          <span className="md-field-label">COMPARISON</span>
          <strong>NOT EXPOSED</strong>
        </div>

        <div className="md-historical-field">
          <span className="md-field-label">HISTORY STATE</span>
          <strong
            className={
              observationAvailable && !error
                ? 'md-historical-value-active'
                : undefined
            }
          >
            {historyState}
          </strong>
        </div>
      </div>

      <div className="md-historical-actions">
        <button type="button" disabled>
          SEARCH
        </button>
        <button type="button" disabled>
          LOAD DATASET
        </button>
        <button type="button" disabled>
          SNAPSHOT
        </button>
        <button type="button" disabled>
          COMPARE
        </button>
        <button type="button" disabled>
          TRACE
        </button>
        <button type="button" disabled>
          EXPORT
        </button>
      </div>

      <footer className="md-historical-surface-footer">
        <span>
          <ShieldAlert size={11} />
          HISTORICAL DATASETS REQUIRE GOVERNED BACKEND EXPOSURE
        </span>

        <span>
          {symbol ? `INSTRUMENT: ${symbol}` : 'INSTRUMENT: NONE'}
        </span>

        <span>
          NO HISTORICAL DATASET OR SNAPSHOT VALUES SYNTHESIZED
        </span>
      </footer>
    </section>
  );
};

export default MarketDataHistoricalSurface;
