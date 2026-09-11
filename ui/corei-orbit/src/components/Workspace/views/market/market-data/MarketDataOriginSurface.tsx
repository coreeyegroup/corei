import React from 'react';
import { GitBranch, ShieldAlert } from 'lucide-react';
import { useMarketStore } from '../../../../../services/marketDataService';

interface MarketDataOriginSurfaceProps {
  symbol: string | null;
}

const MarketDataOriginSurface: React.FC<MarketDataOriginSurfaceProps> = ({
  symbol,
}) => {
  const instruments = useMarketStore((state) => state.instruments);
  const loading = useMarketStore((state) => state.loading);
  const error = useMarketStore((state) => state.error);

  const instrument = symbol ? instruments[symbol] : undefined;
  const observationAvailable = Boolean(instrument);

  const originState = loading
    ? 'REFRESHING'
    : error
      ? 'ERROR'
      : observationAvailable
        ? 'OBSERVATION SOURCE AVAILABLE'
        : 'NO SOURCE';

  return (
    <section className="md-origin-surface">
      <header className="md-origin-surface-header">
        <div className="md-origin-surface-title">
          <GitBranch size={14} />
          <span>MARKET DATA ORIGIN &amp; LINEAGE</span>
        </div>

        <span className="md-origin-surface-mode">
          READ ONLY
        </span>
      </header>

      <div className="md-origin-grid">
        <div className="md-origin-field">
          <span className="md-field-label">SOURCE</span>
          <strong
            className={
              observationAvailable && !error
                ? 'md-origin-value-active'
                : undefined
            }
          >
            MARKET DATA API
          </strong>
        </div>

        <div className="md-origin-field">
          <span className="md-field-label">VENDOR</span>
          <strong>NOT EXPOSED</strong>
        </div>

        <div className="md-origin-field">
          <span className="md-field-label">FEED</span>
          <strong>NOT EXPOSED</strong>
        </div>

        <div className="md-origin-field">
          <span className="md-field-label">VENUE</span>
          <strong>NOT EXPOSED</strong>
        </div>

        <div className="md-origin-field">
          <span className="md-field-label">PROVENANCE</span>
          <strong>NOT EXPOSED</strong>
        </div>

        <div className="md-origin-field">
          <span className="md-field-label">LINEAGE</span>
          <strong>NOT EXPOSED</strong>
        </div>

        <div className="md-origin-field">
          <span className="md-field-label">ORIGIN STATE</span>
          <strong>{originState}</strong>
        </div>

        <div className="md-origin-field">
          <span className="md-field-label">INSTRUMENT</span>
          <strong>{symbol || 'NONE'}</strong>
        </div>
      </div>

      <footer className="md-origin-surface-footer">
        <span>
          <ShieldAlert size={11} />
          PROVENANCE AND LINEAGE REQUIRE GOVERNED BACKEND EXPOSURE
        </span>

        <span>
          {symbol ? `INSTRUMENT: ${symbol}` : 'INSTRUMENT: NONE'}
        </span>

        <span>
          NO ORIGIN OR LINEAGE VALUES SYNTHESIZED
        </span>
      </footer>
    </section>
  );
};

export default MarketDataOriginSurface;
