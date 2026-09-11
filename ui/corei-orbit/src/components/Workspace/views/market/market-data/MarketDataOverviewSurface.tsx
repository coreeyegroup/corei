import React from 'react';
import { Activity, ShieldAlert } from 'lucide-react';
import { useMarketStore } from '../../../../../services/marketDataService';

interface MarketDataOverviewSurfaceProps {
  symbol: string | null;
}

const MarketDataOverviewSurface: React.FC<
  MarketDataOverviewSurfaceProps
> = ({ symbol }) => {
  const instruments = useMarketStore((state) => state.instruments);
  const loading = useMarketStore((state) => state.loading);
  const error = useMarketStore((state) => state.error);

  const instrumentCount = Object.keys(instruments).length;
  const instrument = symbol ? instruments[symbol] : undefined;
  const observationCount = instrument?.history.length ?? 0;
  const observationAvailable = Boolean(instrument);

  const availabilityState = loading
    ? 'REFRESHING'
    : error
      ? 'ERROR'
      : instrumentCount > 0
        ? 'AVAILABLE'
        : 'UNAVAILABLE';

  const observationState = loading
    ? 'REFRESHING'
    : error
      ? 'ERROR'
      : observationAvailable
        ? 'AVAILABLE'
        : 'NOT AVAILABLE';

  return (
    <section className="md-overview-surface">
      <header className="md-overview-surface-header">
        <div className="md-overview-surface-title">
          <Activity size={14} />
          <span>MARKET DATA OVERVIEW</span>
        </div>

        <span className="md-overview-surface-mode">
          READ ONLY
        </span>
      </header>

      <div className="md-overview-grid">
        <div className="md-overview-field">
          <span className="md-field-label">INSTRUMENTS</span>
          <strong>{instrumentCount}</strong>
        </div>

        <div className="md-overview-field">
          <span className="md-field-label">SELECTED</span>
          <strong>{symbol || 'NONE'}</strong>
        </div>

        <div className="md-overview-field">
          <span className="md-field-label">LAST OBSERVED</span>
          <strong>
            {instrument
              ? instrument.price.toLocaleString(undefined, {
                  maximumFractionDigits: 8,
                })
              : 'NOT AVAILABLE'}
          </strong>
        </div>

        <div className="md-overview-field">
          <span className="md-field-label">CHANGE</span>
          <strong>
            {instrument
              ? instrument.change.toLocaleString(undefined, {
                  maximumFractionDigits: 8,
                })
              : 'NOT AVAILABLE'}
          </strong>
        </div>

        <div className="md-overview-field">
          <span className="md-field-label">OBSERVATIONS</span>
          <strong>{observationCount}</strong>
        </div>

        <div className="md-overview-field">
          <span className="md-field-label">AVAILABILITY</span>
          <strong
            className={
              availabilityState === 'AVAILABLE'
                ? 'md-overview-value-active'
                : undefined
            }
          >
            {availabilityState}
          </strong>
        </div>

        <div className="md-overview-field">
          <span className="md-field-label">OBSERVATION STATE</span>
          <strong
            className={
              observationState === 'AVAILABLE'
                ? 'md-overview-value-active'
                : undefined
            }
          >
            {observationState}
          </strong>
        </div>

        <div className="md-overview-field">
          <span className="md-field-label">SOURCE</span>
          <strong>MARKET DATA API</strong>
        </div>
      </div>

      <div className="md-overview-boundary">
        <div className="md-overview-boundary-field">
          <span className="md-field-label">OBSERVATION</span>
          <strong>
            {observationAvailable ? 'EXPOSED' : 'NOT AVAILABLE'}
          </strong>
        </div>

        <div className="md-overview-boundary-field">
          <span className="md-field-label">DETAILED MARKET DATA</span>
          <strong>NOT EXPOSED</strong>
        </div>

        <div className="md-overview-boundary-field">
          <span className="md-field-label">INTELLIGENCE</span>
          <strong>NOT EXPOSED</strong>
        </div>

        <div className="md-overview-boundary-field">
          <span className="md-field-label">REPLAY</span>
          <strong>NOT EXPOSED</strong>
        </div>
      </div>

      <footer className="md-overview-surface-footer">
        <span>
          <ShieldAlert size={11} />
          OVERVIEW REFLECTS ONLY CURRENTLY EXPOSED MARKET DATA
        </span>

        <span>
          {symbol ? `INSTRUMENT: ${symbol}` : 'INSTRUMENT: NONE'}
        </span>

        <span>
          NO UNEXPOSED MARKET STATE SYNTHESIZED
        </span>
      </footer>
    </section>
  );
};

export default MarketDataOverviewSurface;
