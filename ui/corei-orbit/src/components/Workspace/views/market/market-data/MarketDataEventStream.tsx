import React from 'react';
import { Database, Radio, ScrollText } from 'lucide-react';
import { useMarketStore } from '../../../../../services/marketDataService';

interface MarketDataEventStreamProps {
  symbol: string | null;
}

const MarketDataEventStream: React.FC<MarketDataEventStreamProps> = ({
  symbol,
}) => {
  const instruments = useMarketStore((state) => state.instruments);
  const loading = useMarketStore((state) => state.loading);
  const error = useMarketStore((state) => state.error);

  if (!symbol) {
    return (
      <section className="md-event-stream md-surface">
        <header className="md-surface-header">
          <div>
            <span className="md-eyebrow">OBSERVATION / EVENTS</span>
            <h3>MARKET DATA EVENT STREAM</h3>
          </div>

          <span className="md-surface-state">NO SELECTION</span>
        </header>

        <div className="md-event-stream-empty">
          Select an instrument to inspect governed market-data events.
        </div>
      </section>
    );
  }

  const instrument = instruments[symbol];

  if (!instrument) {
    return (
      <section className="md-event-stream md-surface">
        <header className="md-surface-header">
          <div>
            <span className="md-eyebrow">OBSERVATION / EVENTS</span>
            <h3>MARKET DATA EVENT STREAM</h3>
          </div>

          <span className="md-surface-state">UNAVAILABLE</span>
        </header>

        <div className="md-event-stream-empty">
          <strong>{symbol}</strong>
          <span>
            {loading
              ? 'Waiting for current market observation.'
              : error ||
                'No governed event stream is currently exposed.'}
          </span>
        </div>
      </section>
    );
  }

  const historyCount = Array.isArray(instrument.history)
    ? instrument.history.length
    : 0;

  const formattedPrice = Number.isFinite(instrument.price)
    ? new Intl.NumberFormat('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 8,
      }).format(instrument.price)
    : '—';

  return (
    <section className="md-event-stream md-surface">
      <header className="md-surface-header">
        <div>
          <span className="md-eyebrow">OBSERVATION / EVENTS</span>
          <h3>{symbol}</h3>
        </div>

        <span className="md-surface-state md-state-live">
          <Radio size={12} />
          OBSERVATION
        </span>
      </header>

      <div className="md-event-stream-summary">
        <div className="md-event-stream-primary">
          <span className="md-field-label">LAST OBSERVED PRICE</span>
          <strong>{formattedPrice}</strong>
          <span className="md-field-subtext">
            Current market observation
          </span>
        </div>

        <div className="md-event-stream-metric">
          <span className="md-field-label">OBSERVATION HISTORY</span>
          <strong>{historyCount.toLocaleString('en-US')}</strong>
          <span className="md-field-subtext">
            Existing history array
          </span>
        </div>

        <div className="md-event-stream-metric">
          <span className="md-field-label">EVENT STREAM</span>
          <strong>NOT EXPOSED</strong>
          <span className="md-field-subtext">
            Governed event contract unavailable
          </span>
        </div>
      </div>

      <div className="md-event-stream-table">
        <div className="md-event-stream-table-header">
          <span>EVENT TIME</span>
          <span>EVENT TYPE</span>
          <span>SEQUENCE</span>
          <span>SOURCE</span>
          <span>STATE</span>
        </div>

        <div className="md-event-stream-unavailable">
          <ScrollText size={18} />

          <strong>EVENT STREAM NOT EXPOSED</strong>

          <span>
            Market-data events require a governed event stream containing
            authoritative event metadata.
          </span>

          <small>
            No synthetic events are rendered.
          </small>
        </div>
      </div>

      <div className="md-event-stream-contract">
        <div>
          <span className="md-field-label">EVENT ID</span>
          <strong>NOT EXPOSED</strong>
        </div>

        <div>
          <span className="md-field-label">EVENT TIME</span>
          <strong>NOT EXPOSED</strong>
        </div>

        <div>
          <span className="md-field-label">RECEIVE TIME</span>
          <strong>NOT EXPOSED</strong>
        </div>

        <div>
          <span className="md-field-label">NORMALIZED TIME</span>
          <strong>NOT EXPOSED</strong>
        </div>

        <div>
          <span className="md-field-label">SEQUENCE</span>
          <strong>NOT EXPOSED</strong>
        </div>

        <div>
          <span className="md-field-label">SOURCE</span>
          <strong>NOT EXPOSED</strong>
        </div>
      </div>

      <footer className="md-event-stream-footer">
        <span>
          <ScrollText size={12} />
          GOVERNED EVENT OBSERVATION
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

export default MarketDataEventStream;
