import React from 'react';
import { Play, ShieldAlert } from 'lucide-react';
import { useMarketStore } from '../../../../../services/marketDataService';

interface MarketDataReplaySurfaceProps {
  symbol: string | null;
}

const MarketDataReplaySurface: React.FC<MarketDataReplaySurfaceProps> = ({
  symbol,
}) => {
  const instruments = useMarketStore((state) => state.instruments);
  const loading = useMarketStore((state) => state.loading);
  const error = useMarketStore((state) => state.error);

  const instrument = symbol ? instruments[symbol] : undefined;
  const observationAvailable = Boolean(instrument);

  const replayState = loading
    ? 'REFRESHING'
    : error
      ? 'ERROR'
      : observationAvailable
        ? 'OBSERVATION AVAILABLE'
        : 'NO REPLAY SOURCE';

  return (
    <section className="md-replay-surface">
      <header className="md-replay-surface-header">
        <div className="md-replay-surface-title">
          <Play size={14} />
          <span>MARKET DATA REPLAY</span>
        </div>

        <span className="md-replay-surface-mode">
          READ ONLY
        </span>
      </header>

      <div className="md-replay-grid">
        <div className="md-replay-field">
          <span className="md-field-label">INSTRUMENT</span>
          <strong>{symbol || 'NONE'}</strong>
        </div>

        <div className="md-replay-field">
          <span className="md-field-label">REPLAY ID</span>
          <strong>NOT EXPOSED</strong>
        </div>

        <div className="md-replay-field">
          <span className="md-field-label">DATASET</span>
          <strong>NOT EXPOSED</strong>
        </div>

        <div className="md-replay-field">
          <span className="md-field-label">EVENT RANGE</span>
          <strong>NOT EXPOSED</strong>
        </div>

        <div className="md-replay-field">
          <span className="md-field-label">START TIME</span>
          <strong>NOT EXPOSED</strong>
        </div>

        <div className="md-replay-field">
          <span className="md-field-label">END TIME</span>
          <strong>NOT EXPOSED</strong>
        </div>

        <div className="md-replay-field">
          <span className="md-field-label">CHECKPOINT</span>
          <strong>NOT EXPOSED</strong>
        </div>

        <div className="md-replay-field">
          <span className="md-field-label">REPLAY STATE</span>
          <strong
            className={
              observationAvailable && !error
                ? 'md-replay-value-active'
                : undefined
            }
          >
            {replayState}
          </strong>
        </div>
      </div>

      <div className="md-replay-controls">
        <button type="button" disabled>
          START
        </button>
        <button type="button" disabled>
          PAUSE
        </button>
        <button type="button" disabled>
          STOP
        </button>
        <button type="button" disabled>
          STEP
        </button>
        <button type="button" disabled>
          JUMP
        </button>
        <button type="button" disabled>
          CHECKPOINT
        </button>
        <button type="button" disabled>
          RESET
        </button>
        <button type="button" disabled>
          VALIDATE
        </button>
      </div>

      <footer className="md-replay-surface-footer">
        <span>
          <ShieldAlert size={11} />
          DETERMINISTIC REPLAY REQUIRES GOVERNED BACKEND EXPOSURE
        </span>

        <span>
          {symbol ? `INSTRUMENT: ${symbol}` : 'INSTRUMENT: NONE'}
        </span>

        <span>
          NO REPLAY SESSION OR CONTROL STATE SYNTHESIZED
        </span>
      </footer>
    </section>
  );
};

export default MarketDataReplaySurface;
