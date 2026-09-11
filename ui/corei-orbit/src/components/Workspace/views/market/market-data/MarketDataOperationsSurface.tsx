import React from 'react';
import { Activity, ShieldAlert } from 'lucide-react';
import { useMarketStore } from '../../../../../services/marketDataService';

interface MarketDataOperationsSurfaceProps {
  symbol: string | null;
}

const MarketDataOperationsSurface: React.FC<
  MarketDataOperationsSurfaceProps
> = ({ symbol }) => {
  const instruments = useMarketStore((state) => state.instruments);
  const loading = useMarketStore((state) => state.loading);
  const error = useMarketStore((state) => state.error);

  const instrument = symbol ? instruments[symbol] : undefined;
  const observationAvailable = Boolean(instrument);

  const operationalState = loading
    ? 'REFRESHING'
    : error
      ? 'ERROR'
      : observationAvailable
        ? 'OBSERVATION AVAILABLE'
        : 'NO OPERATIONAL SOURCE';

  return (
    <section className="md-operations-surface">
      <header className="md-operations-surface-header">
        <div className="md-operations-surface-title">
          <Activity size={14} />
          <span>MARKET DATA OPERATIONS</span>
        </div>

        <span className="md-operations-surface-mode">
          READ ONLY
        </span>
      </header>

      <div className="md-operations-grid">
        <div className="md-operations-field">
          <span className="md-field-label">INSTRUMENT</span>
          <strong>{symbol || 'NONE'}</strong>
        </div>

        <div className="md-operations-field">
          <span className="md-field-label">FEED MONITORING</span>
          <strong>NOT EXPOSED</strong>
        </div>

        <div className="md-operations-field">
          <span className="md-field-label">DATA MONITORING</span>
          <strong>NOT EXPOSED</strong>
        </div>

        <div className="md-operations-field">
          <span className="md-field-label">ALERTS</span>
          <strong>NOT EXPOSED</strong>
        </div>

        <div className="md-operations-field">
          <span className="md-field-label">RECOVERY</span>
          <strong>NOT EXPOSED</strong>
        </div>

        <div className="md-operations-field">
          <span className="md-field-label">AUDIT</span>
          <strong>NOT EXPOSED</strong>
        </div>

        <div className="md-operations-field">
          <span className="md-field-label">CONTROLS</span>
          <strong>NOT EXPOSED</strong>
        </div>

        <div className="md-operations-field">
          <span className="md-field-label">OPERATIONAL STATE</span>
          <strong
            className={
              observationAvailable && !error
                ? 'md-operations-value-active'
                : undefined
            }
          >
            {operationalState}
          </strong>
        </div>
      </div>

      <div className="md-operations-boundary">
        <div className="md-operations-boundary-field">
          <span className="md-field-label">PAUSE FEED</span>
          <button type="button" disabled>
            NOT EXPOSED
          </button>
        </div>

        <div className="md-operations-boundary-field">
          <span className="md-field-label">RESUME FEED</span>
          <button type="button" disabled>
            NOT EXPOSED
          </button>
        </div>

        <div className="md-operations-boundary-field">
          <span className="md-field-label">RECONNECT</span>
          <button type="button" disabled>
            NOT EXPOSED
          </button>
        </div>

        <div className="md-operations-boundary-field">
          <span className="md-field-label">FAILOVER</span>
          <button type="button" disabled>
            NOT EXPOSED
          </button>
        </div>

        <div className="md-operations-boundary-field">
          <span className="md-field-label">RECOVERY CONTROL</span>
          <button type="button" disabled>
            NOT EXPOSED
          </button>
        </div>
      </div>

      <footer className="md-operations-surface-footer">
        <span>
          <ShieldAlert size={11} />
          OPERATIONAL CONTROLS REQUIRE AUTHORITATIVE BACKEND EXPOSURE
        </span>

        <span>
          {symbol ? `INSTRUMENT: ${symbol}` : 'INSTRUMENT: NONE'}
        </span>

        <span>
          NO OPERATIONAL CONTROL STATE SYNTHESIZED
        </span>
      </footer>
    </section>
  );
};

export default MarketDataOperationsSurface;
