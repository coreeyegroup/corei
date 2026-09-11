import React from 'react';
import { Database, ShieldCheck } from 'lucide-react';
import { useMarketStore } from '../../../../../services/marketDataService';

interface MarketDataAuthorityStripProps {
  symbol: string | null;
}

const MarketDataAuthorityStrip: React.FC<MarketDataAuthorityStripProps> = ({
  symbol,
}) => {
  const instruments = useMarketStore((state) => state.instruments);
  const loading = useMarketStore((state) => state.loading);
  const error = useMarketStore((state) => state.error);

  const instrument = symbol ? instruments[symbol] : undefined;
  const observationAvailable = Boolean(instrument);

  const dataState = loading
    ? 'REFRESHING'
    : error
      ? 'ERROR'
      : observationAvailable
        ? 'OBSERVATION AVAILABLE'
        : 'NO SELECTION';

  return (
    <section className="md-authority-strip">
      <header className="md-authority-strip-header">
        <div className="md-authority-strip-title">
          <ShieldCheck size={14} />
          <span>MARKET DATA AUTHORITY</span>
        </div>

        <span className="md-authority-strip-mode">
          READ ONLY
        </span>
      </header>

      <div className="md-authority-strip-grid">
        <div className="md-authority-field">
          <span className="md-field-label">SOURCE</span>
          <strong>MARKET DATA API</strong>
        </div>

        <div className="md-authority-field">
          <span className="md-field-label">FEED</span>
          <strong>NOT EXPOSED</strong>
        </div>

        <div className="md-authority-field">
          <span className="md-field-label">VENUE</span>
          <strong>NOT EXPOSED</strong>
        </div>

        <div className="md-authority-field">
          <span className="md-field-label">EVENT STREAM</span>
          <strong>NOT EXPOSED</strong>
        </div>

        <div className="md-authority-field">
          <span className="md-field-label">SCHEMA</span>
          <strong>NOT EXPOSED</strong>
        </div>

        <div className="md-authority-field">
          <span className="md-field-label">DATA STATE</span>
          <strong
            className={
              observationAvailable && !error
                ? 'md-authority-value-active'
                : undefined
            }
          >
            {dataState}
          </strong>
        </div>

        <div className="md-authority-field">
          <span className="md-field-label">LAST EVENT</span>
          <strong>NOT EXPOSED</strong>
        </div>

        <div className="md-authority-field">
          <span className="md-field-label">EVENT AGE</span>
          <strong>NOT EXPOSED</strong>
        </div>
      </div>

      <footer className="md-authority-strip-footer">
        <span>
          <Database size={11} />
          CURRENT CONTRACT: MARKET DATA OBSERVATION
        </span>

        <span>
          {symbol ? `INSTRUMENT: ${symbol}` : 'INSTRUMENT: NONE'}
        </span>

        <span>
          AUTHORITY METADATA REQUIRES GOVERNED BACKEND EXPOSURE
        </span>
      </footer>
    </section>
  );
};

export default MarketDataAuthorityStrip;
