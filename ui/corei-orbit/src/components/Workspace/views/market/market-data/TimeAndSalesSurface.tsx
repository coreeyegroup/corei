import React from 'react';
import { Database, List, Radio } from 'lucide-react';
import { useMarketStore } from '../../../../../services/marketDataService';

interface TimeAndSalesSurfaceProps {
  symbol: string | null;
}

const TimeAndSalesSurface: React.FC<TimeAndSalesSurfaceProps> = ({ symbol }) => {
  const instruments = useMarketStore((state) => state.instruments);
  const loading = useMarketStore((state) => state.loading);
  const error = useMarketStore((state) => state.error);

  if (!symbol) {
    return (
      <section className="md-time-sales-surface md-surface">
        <header className="md-surface-header">
          <div>
            <span className="md-eyebrow">OBSERVATION / TAPE</span>
            <h3>TIME &amp; SALES</h3>
          </div>

          <span className="md-surface-state">NO SELECTION</span>
        </header>

        <div className="md-time-sales-empty">
          Select an instrument to inspect time-and-sales observations.
        </div>
      </section>
    );
  }

  const instrument = instruments[symbol];

  if (!instrument) {
    return (
      <section className="md-time-sales-surface md-surface">
        <header className="md-surface-header">
          <div>
            <span className="md-eyebrow">OBSERVATION / TAPE</span>
            <h3>TIME &amp; SALES</h3>
          </div>

          <span className="md-surface-state">UNAVAILABLE</span>
        </header>

        <div className="md-time-sales-empty">
          <strong>{symbol}</strong>
          <span>
            {loading
              ? 'Waiting for current market observation.'
              : error || 'No time-and-sales stream is currently exposed.'}
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
    <section className="md-time-sales-surface md-surface">
      <header className="md-surface-header">
        <div>
          <span className="md-eyebrow">OBSERVATION / TAPE</span>
          <h3>{symbol}</h3>
        </div>

        <span className="md-surface-state md-state-live">
          <Radio size={12} />
          OBSERVATION
        </span>
      </header>

      <div className="md-time-sales-summary">
        <div className="md-time-sales-primary">
          <span className="md-field-label">LAST OBSERVED PRICE</span>
          <strong>{formattedPrice}</strong>
          <span className="md-field-subtext">
            Current market observation
          </span>
        </div>

        <div className="md-time-sales-metric">
          <span className="md-field-label">HISTORICAL OBSERVATIONS</span>
          <strong>{historyCount.toLocaleString('en-US')}</strong>
          <span className="md-field-subtext">
            Existing history array
          </span>
        </div>

        <div className="md-time-sales-metric">
          <span className="md-field-label">TRADE STREAM</span>
          <strong>NOT EXPOSED</strong>
          <span className="md-field-subtext">
            Governed event stream unavailable
          </span>
        </div>
      </div>

      <div className="md-time-sales-table">
        <div className="md-time-sales-table-header">
          <span>TIME</span>
          <span>PRICE</span>
          <span>SIZE</span>
          <span>SIDE</span>
          <span>VENUE</span>
        </div>

        <div className="md-time-sales-unavailable">
          <List size={18} />

          <strong>TIME &amp; SALES STREAM NOT EXPOSED</strong>

          <span>
            Trade-event observations are not available through the current
            market-data contract.
          </span>

          <small>
            No synthetic rows are rendered.
          </small>
        </div>
      </div>

      <div className="md-time-sales-metadata">
        <div>
          <span className="md-field-label">TRADE ID</span>
          <strong>NOT EXPOSED</strong>
        </div>

        <div>
          <span className="md-field-label">QUANTITY</span>
          <strong>NOT EXPOSED</strong>
        </div>

        <div>
          <span className="md-field-label">SIDE</span>
          <strong>NOT EXPOSED</strong>
        </div>

        <div>
          <span className="md-field-label">VENUE</span>
          <strong>NOT EXPOSED</strong>
        </div>

        <div>
          <span className="md-field-label">SEQUENCE</span>
          <strong>NOT EXPOSED</strong>
        </div>

        <div>
          <span className="md-field-label">EVENT TIME</span>
          <strong>NOT EXPOSED</strong>
        </div>
      </div>

      <footer className="md-time-sales-footer">
        <span>
          <List size={12} />
          TIME &amp; SALES OBSERVATION
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

export default TimeAndSalesSurface;
