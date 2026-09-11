import React from 'react';
import { Activity, Database, Radio } from 'lucide-react';
import { useMarketStore } from '../../../../../services/marketDataService';

interface TradeSurfaceProps {
  symbol: string | null;
}

function formatPrice(value: number): string {
  if (!Number.isFinite(value)) return '—';

  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 8,
  }).format(value);
}

function formatChange(value: number): string {
  if (!Number.isFinite(value)) return '—';

  const prefix = value > 0 ? '+' : '';
  return `${prefix}${value.toFixed(2)}%`;
}

const TradeSurface: React.FC<TradeSurfaceProps> = ({ symbol }) => {
  const instruments = useMarketStore((state) => state.instruments);
  const loading = useMarketStore((state) => state.loading);
  const error = useMarketStore((state) => state.error);

  if (!symbol) {
    return (
      <section className="md-trade-surface md-surface">
        <header className="md-surface-header">
          <div>
            <span className="md-eyebrow">OBSERVATION</span>
            <h3>Trade</h3>
          </div>
          <span className="md-surface-state">NO SELECTION</span>
        </header>

        <div className="md-trade-empty">
          Select an instrument to inspect trade observations.
        </div>
      </section>
    );
  }

  const instrument = instruments[symbol];

  if (!instrument) {
    return (
      <section className="md-trade-surface md-surface">
        <header className="md-surface-header">
          <div>
            <span className="md-eyebrow">OBSERVATION</span>
            <h3>Trade</h3>
          </div>
          <span className="md-surface-state">UNAVAILABLE</span>
        </header>

        <div className="md-trade-empty">
          <strong>{symbol}</strong>
          <span>
            {loading
              ? 'Waiting for current market observation.'
              : error || 'No trade observation is currently exposed.'}
          </span>
        </div>
      </section>
    );
  }

  const changeClass =
    instrument.change > 0
      ? 'positive'
      : instrument.change < 0
        ? 'negative'
        : 'neutral';

  return (
    <section className="md-trade-surface md-surface">
      <header className="md-surface-header">
        <div>
          <span className="md-eyebrow">OBSERVATION / TRADE</span>
          <h3>{symbol}</h3>
        </div>

        <span className="md-surface-state md-state-live">
          <Radio size={12} />
          OBSERVATION
        </span>
      </header>

      <div className="md-trade-grid">
        <div className="md-trade-primary">
          <span className="md-field-label">LAST OBSERVED PRICE</span>
          <strong>{formatPrice(instrument.price)}</strong>
          <span className="md-field-subtext">
            Current market observation
          </span>
        </div>

        <div className={`md-trade-metric ${changeClass}`}>
          <span className="md-field-label">OBSERVED CHANGE</span>
          <strong>{formatChange(instrument.change)}</strong>
          <span className="md-field-subtext">
            Current contract observation
          </span>
        </div>

        <div className="md-trade-unavailable">
          <span className="md-field-label">TRADE EVENT STREAM</span>
          <strong>NOT EXPOSED</strong>
          <span className="md-field-subtext">
            Awaiting governed trade-event endpoint
          </span>
        </div>

        <div className="md-trade-unavailable">
          <span className="md-field-label">TRADE ATTRIBUTES</span>
          <strong>NOT EXPOSED</strong>
          <span className="md-field-subtext">
            ID, quantity, side, venue and sequence unavailable
          </span>
        </div>
      </div>

      <footer className="md-trade-footer">
        <span>
          <Activity size={12} />
          TRADE OBSERVATION
        </span>

        <span>
          <Database size={12} />
          SOURCE: MARKET DATA API
        </span>

        <span>
          {loading ? 'REFRESHING' : 'READ ONLY'}
        </span>
      </footer>
    </section>
  );
};

export default TradeSurface;
