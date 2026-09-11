import React from 'react';
import { BarChart3, ShieldAlert } from 'lucide-react';
import { useMarketStore } from '../../../../../services/marketDataService';

interface MarketDataDerivedSurfaceProps {
  symbol: string | null;
}

const MarketDataDerivedSurface: React.FC<MarketDataDerivedSurfaceProps> = ({
  symbol,
}) => {
  const instruments = useMarketStore((state) => state.instruments);
  const loading = useMarketStore((state) => state.loading);
  const error = useMarketStore((state) => state.error);

  const instrument = symbol ? instruments[symbol] : undefined;
  const observationAvailable = Boolean(instrument);

  const derivedState = loading
    ? 'REFRESHING'
    : error
      ? 'ERROR'
      : observationAvailable
        ? 'OBSERVATION AVAILABLE'
        : 'NO DERIVED SOURCE';

  return (
    <section className="md-derived-surface">
      <header className="md-derived-surface-header">
        <div className="md-derived-surface-title">
          <BarChart3 size={14} />
          <span>DERIVED MARKET DATA</span>
        </div>

        <span className="md-derived-surface-mode">
          READ ONLY
        </span>
      </header>

      <div className="md-derived-grid">
        <div className="md-derived-field">
          <span className="md-field-label">INSTRUMENT</span>
          <strong>{symbol || 'NONE'}</strong>
        </div>

        <div className="md-derived-field">
          <span className="md-field-label">STATISTICS</span>
          <strong>NOT EXPOSED</strong>
        </div>

        <div className="md-derived-field">
          <span className="md-field-label">FEATURES</span>
          <strong>NOT EXPOSED</strong>
        </div>

        <div className="md-derived-field">
          <span className="md-field-label">LIQUIDITY</span>
          <strong>NOT EXPOSED</strong>
        </div>

        <div className="md-derived-field">
          <span className="md-field-label">FLOW</span>
          <strong>NOT EXPOSED</strong>
        </div>

        <div className="md-derived-field">
          <span className="md-field-label">VOLATILITY</span>
          <strong>NOT EXPOSED</strong>
        </div>

        <div className="md-derived-field">
          <span className="md-field-label">RELATIONSHIPS</span>
          <strong>NOT EXPOSED</strong>
        </div>

        <div className="md-derived-field">
          <span className="md-field-label">DERIVED STATE</span>
          <strong
            className={
              observationAvailable && !error
                ? 'md-derived-value-active'
                : undefined
            }
          >
            {derivedState}
          </strong>
        </div>
      </div>

      <div className="md-derived-boundary">
        <div className="md-derived-boundary-item">
          <span className="md-field-label">CURRENT OBSERVATION</span>
          <strong>
            {instrument ? 'AVAILABLE' : 'NOT AVAILABLE'}
          </strong>
        </div>

        <div className="md-derived-boundary-item">
          <span className="md-field-label">FEATURE COMPUTATION</span>
          <strong>NOT COMPUTED IN UI</strong>
        </div>

        <div className="md-derived-boundary-item">
          <span className="md-field-label">RELATIONSHIP ENGINE</span>
          <strong>NOT EXPOSED</strong>
        </div>
      </div>

      <footer className="md-derived-surface-footer">
        <span>
          <ShieldAlert size={11} />
          DERIVED DATA REQUIRES GOVERNED BACKEND EXPOSURE
        </span>

        <span>
          {symbol ? `INSTRUMENT: ${symbol}` : 'INSTRUMENT: NONE'}
        </span>

        <span>
          NO DERIVED METRICS SYNTHESIZED
        </span>
      </footer>
    </section>
  );
};

export default MarketDataDerivedSurface;
