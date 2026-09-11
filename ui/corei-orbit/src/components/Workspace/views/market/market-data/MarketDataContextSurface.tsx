import React from 'react';
import { Globe2, ShieldAlert } from 'lucide-react';
import { useMarketStore } from '../../../../../services/marketDataService';

interface MarketDataContextSurfaceProps {
  symbol: string | null;
}

const MarketDataContextSurface: React.FC<MarketDataContextSurfaceProps> = ({
  symbol,
}) => {
  const instruments = useMarketStore((state) => state.instruments);
  const loading = useMarketStore((state) => state.loading);
  const error = useMarketStore((state) => state.error);

  const instrument = symbol ? instruments[symbol] : undefined;
  const observationAvailable = Boolean(instrument);

  const contextState = loading
    ? 'REFRESHING'
    : error
      ? 'ERROR'
      : observationAvailable
        ? 'OBSERVATION CONTEXT AVAILABLE'
        : 'NO CONTEXT';

  return (
    <section className="md-context-surface">
      <header className="md-context-surface-header">
        <div className="md-context-surface-title">
          <Globe2 size={14} />
          <span>MARKET DATA CONTEXT</span>
        </div>

        <span className="md-context-surface-mode">
          READ ONLY
        </span>
      </header>

      <div className="md-context-grid">
        <div className="md-context-field">
          <span className="md-field-label">INSTRUMENT</span>
          <strong>{symbol || 'NONE'}</strong>
        </div>

        <div className="md-context-field">
          <span className="md-field-label">MARKET</span>
          <strong>NOT EXPOSED</strong>
        </div>

        <div className="md-context-field">
          <span className="md-field-label">SESSION</span>
          <strong>NOT EXPOSED</strong>
        </div>

        <div className="md-context-field">
          <span className="md-field-label">VENUE</span>
          <strong>NOT EXPOSED</strong>
        </div>

        <div className="md-context-field">
          <span className="md-field-label">EXCHANGE</span>
          <strong>NOT EXPOSED</strong>
        </div>

        <div className="md-context-field">
          <span className="md-field-label">ASSET CLASS</span>
          <strong>NOT EXPOSED</strong>
        </div>

        <div className="md-context-field">
          <span className="md-field-label">CURRENCY</span>
          <strong>NOT EXPOSED</strong>
        </div>

        <div className="md-context-field">
          <span className="md-field-label">CONTEXT STATE</span>
          <strong
            className={
              observationAvailable && !error
                ? 'md-context-value-active'
                : undefined
            }
          >
            {contextState}
          </strong>
        </div>
      </div>

      <footer className="md-context-surface-footer">
        <span>
          <ShieldAlert size={11} />
          CONTEXT ATTRIBUTES REQUIRE GOVERNED BACKEND EXPOSURE
        </span>

        <span>
          {symbol ? `INSTRUMENT: ${symbol}` : 'INSTRUMENT: NONE'}
        </span>

        <span>
          NO CONTEXT VALUES SYNTHESIZED
        </span>
      </footer>
    </section>
  );
};

export default MarketDataContextSurface;
