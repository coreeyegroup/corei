import React from 'react';
import { BookOpen, Database, Radio } from 'lucide-react';
import { useMarketStore } from '../../../../../services/marketDataService';

interface OrderBookSurfaceProps {
  symbol: string | null;
}

const OrderBookSurface: React.FC<OrderBookSurfaceProps> = ({ symbol }) => {
  const instruments = useMarketStore((state) => state.instruments);
  const loading = useMarketStore((state) => state.loading);
  const error = useMarketStore((state) => state.error);

  if (!symbol) {
    return (
      <section className="md-order-book-surface md-surface">
        <header className="md-surface-header">
          <div>
            <span className="md-eyebrow">OBSERVATION / BOOK</span>
            <h3>Order Book</h3>
          </div>

          <span className="md-surface-state">NO SELECTION</span>
        </header>

        <div className="md-order-book-empty">
          Select an instrument to inspect order-book observations.
        </div>
      </section>
    );
  }

  const instrument = instruments[symbol];

  if (!instrument) {
    return (
      <section className="md-order-book-surface md-surface">
        <header className="md-surface-header">
          <div>
            <span className="md-eyebrow">OBSERVATION / BOOK</span>
            <h3>Order Book</h3>
          </div>

          <span className="md-surface-state">UNAVAILABLE</span>
        </header>

        <div className="md-order-book-empty">
          <strong>{symbol}</strong>
          <span>
            {loading
              ? 'Waiting for current market observation.'
              : error || 'No order-book observation is currently exposed.'}
          </span>
        </div>
      </section>
    );
  }

  return (
    <section className="md-order-book-surface md-surface">
      <header className="md-surface-header">
        <div>
          <span className="md-eyebrow">OBSERVATION / ORDER BOOK</span>
          <h3>{symbol}</h3>
        </div>

        <span className="md-surface-state md-state-live">
          <Radio size={12} />
          OBSERVATION
        </span>
      </header>

      <div className="md-order-book-summary">
        <div className="md-order-book-primary">
          <span className="md-field-label">LAST OBSERVED PRICE</span>
          <strong>
            {Number.isFinite(instrument.price)
              ? new Intl.NumberFormat('en-US', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 8,
                }).format(instrument.price)
              : '—'}
          </strong>
          <span className="md-field-subtext">
            Current market observation
          </span>
        </div>

        <div className="md-order-book-state">
          <span className="md-field-label">BOOK DEPTH</span>
          <strong>NOT EXPOSED</strong>
          <span className="md-field-subtext">
            Governed L2/L3 stream unavailable
          </span>
        </div>

        <div className="md-order-book-state">
          <span className="md-field-label">BOOK VIEW</span>
          <strong>L1 / L2 / L3</strong>
          <span className="md-field-subtext">
            Capability defined; runtime feed not exposed
          </span>
        </div>
      </div>

      <div className="md-order-book-grid">
        <div className="md-order-book-side">
          <div className="md-order-book-side-header">
            <span>BID SIDE</span>
            <span>NOT EXPOSED</span>
          </div>

          <div className="md-order-book-unavailable">
            <BookOpen size={16} />
            <strong>NO GOVERNED BID LEVELS</strong>
            <span>
              Price, size and order-count observations are unavailable.
            </span>
          </div>
        </div>

        <div className="md-order-book-center">
          <span className="md-field-label">BOOK STATE</span>
          <strong>UNAVAILABLE</strong>
          <span className="md-field-subtext">
            No authoritative order-book event stream is exposed to Orbit.
          </span>
        </div>

        <div className="md-order-book-side">
          <div className="md-order-book-side-header">
            <span>ASK SIDE</span>
            <span>NOT EXPOSED</span>
          </div>

          <div className="md-order-book-unavailable">
            <BookOpen size={16} />
            <strong>NO GOVERNED ASK LEVELS</strong>
            <span>
              Price, size and order-count observations are unavailable.
            </span>
          </div>
        </div>
      </div>

      <div className="md-order-book-metadata">
        <div>
          <span className="md-field-label">SEQUENCE</span>
          <strong>NOT EXPOSED</strong>
        </div>

        <div>
          <span className="md-field-label">VENUE</span>
          <strong>NOT EXPOSED</strong>
        </div>

        <div>
          <span className="md-field-label">DEPTH IMBALANCE</span>
          <strong>NOT COMPUTED</strong>
        </div>

        <div>
          <span className="md-field-label">SPREAD</span>
          <strong>NOT EXPOSED</strong>
        </div>
      </div>

      <footer className="md-order-book-footer">
        <span>
          <BookOpen size={12} />
          ORDER BOOK OBSERVATION
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

export default OrderBookSurface;
