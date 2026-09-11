import React from 'react';
import { Activity, Radio } from 'lucide-react';
import { useMarketStore } from '../../../../../services/marketDataService';

interface QuoteSurfaceProps {
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

const QuoteSurface: React.FC<QuoteSurfaceProps> = ({ symbol }) => {
  const instruments = useMarketStore((state) => state.instruments);
  const loading = useMarketStore((state) => state.loading);
  const error = useMarketStore((state) => state.error);

  if (!symbol) {
    return (
      <section className="md-quote-surface md-surface">
        <header className="md-surface-header">
          <div>
            <span className="md-eyebrow">OBSERVATION</span>
            <h3>Quote</h3>
          </div>
          <span className="md-surface-state">NO SELECTION</span>
        </header>

        <div className="md-quote-empty">
          Select an instrument to inspect its quote observation.
        </div>
      </section>
    );
  }

  const instrument = instruments[symbol];

  if (!instrument) {
    return (
      <section className="md-quote-surface md-surface">
        <header className="md-surface-header">
          <div>
            <span className="md-eyebrow">OBSERVATION</span>
            <h3>Quote</h3>
          </div>
          <span className="md-surface-state">UNAVAILABLE</span>
        </header>

        <div className="md-quote-empty">
          <strong>{symbol}</strong>
          <span>
            {loading
              ? 'Waiting for market observation.'
              : error || 'No quote observation is currently exposed.'}
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
    <section className="md-quote-surface md-surface">
      <header className="md-surface-header">
        <div>
          <span className="md-eyebrow">OBSERVATION / QUOTE</span>
          <h3>{symbol}</h3>
        </div>

        <span className="md-surface-state md-state-live">
          <Radio size={12} />
          CURRENT
        </span>
      </header>

      <div className="md-quote-grid">
        <div className="md-quote-primary">
          <span className="md-field-label">LAST OBSERVED PRICE</span>
          <strong>{formatPrice(instrument.price)}</strong>
          <span className="md-field-subtext">
            Current value exposed by Market Data API
          </span>
        </div>

        <div className={`md-quote-change ${changeClass}`}>
          <span className="md-field-label">CHANGE</span>
          <strong>{formatChange(instrument.change)}</strong>
          <span className="md-field-subtext">
            Current contract observation
          </span>
        </div>

        <div className="md-quote-unavailable">
          <span className="md-field-label">BID / ASK</span>
          <strong>NOT EXPOSED</strong>
          <span className="md-field-subtext">
            Awaiting governed quote fields
          </span>
        </div>

        <div className="md-quote-unavailable">
          <span className="md-field-label">SPREAD</span>
          <strong>NOT EXPOSED</strong>
          <span className="md-field-subtext">
            Cannot derive without authoritative bid/ask
          </span>
        </div>
      </div>

      <footer className="md-quote-footer">
        <span>
          <Activity size={12} />
          OBSERVATION SURFACE
        </span>

        <span>
          SOURCE: MARKET DATA API
        </span>

        <span>
          {loading ? 'REFRESHING' : 'READ ONLY'}
        </span>
      </footer>
    </section>
  );
};

export default QuoteSurface;
