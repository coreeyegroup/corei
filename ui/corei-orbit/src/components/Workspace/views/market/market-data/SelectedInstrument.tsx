import React from 'react';
import { Activity, Database, Radio } from 'lucide-react';
import { useMarketStore } from '../../../../../services/marketDataService';

interface SelectedInstrumentProps {
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

const SelectedInstrument: React.FC<SelectedInstrumentProps> = ({ symbol }) => {
  const instruments = useMarketStore((state) => state.instruments);
  const loading = useMarketStore((state) => state.loading);
  const error = useMarketStore((state) => state.error);

  if (!symbol) {
    return (
      <section className="md-selected-instrument md-surface">
        <header className="md-surface-header">
          <div>
            <span className="md-eyebrow">MARKET DATA</span>
            <h3>Selected Instrument</h3>
          </div>
          <span className="md-surface-state">NO SELECTION</span>
        </header>

        <div className="md-selected-empty">
          Select an instrument from the universe to inspect its current observation.
        </div>
      </section>
    );
  }

  const instrument = instruments[symbol];

  if (!instrument) {
    return (
      <section className="md-selected-instrument md-surface">
        <header className="md-surface-header">
          <div>
            <span className="md-eyebrow">MARKET DATA</span>
            <h3>Selected Instrument</h3>
          </div>
          <span className="md-surface-state">UNAVAILABLE</span>
        </header>

        <div className="md-selected-empty">
          <strong>{symbol}</strong>
          <span>
            {loading
              ? 'Waiting for current market observation.'
              : error || 'No current observation is available.'}
          </span>
        </div>
      </section>
    );
  }

  const historyCount = Array.isArray(instrument.history)
    ? instrument.history.length
    : 0;

  const changeClass =
    instrument.change > 0
      ? 'positive'
      : instrument.change < 0
        ? 'negative'
        : 'neutral';

  return (
    <section className="md-selected-instrument md-surface">
      <header className="md-surface-header">
        <div>
          <span className="md-eyebrow">MARKET DATA / OBSERVATION</span>
          <h3>{symbol}</h3>
        </div>

        <span className="md-surface-state md-state-live">
          <Radio size={12} />
          OBSERVATION AVAILABLE
        </span>
      </header>

      <div className="md-selected-grid">
        <div className="md-selected-identity">
          <span className="md-field-label">INSTRUMENT</span>
          <strong>{symbol}</strong>
          <span className="md-field-subtext">Current market observation</span>
        </div>

        <div className="md-selected-metric">
          <span className="md-field-label">LAST OBSERVED PRICE</span>
          <strong>{formatPrice(instrument.price)}</strong>
          <span className="md-field-subtext">REST market-data source</span>
        </div>

        <div className={`md-selected-metric ${changeClass}`}>
          <span className="md-field-label">CHANGE</span>
          <strong>{formatChange(instrument.change)}</strong>
          <span className="md-field-subtext">Provided by market-data contract</span>
        </div>

        <div className="md-selected-metric">
          <span className="md-field-label">HISTORY</span>
          <strong>{historyCount.toLocaleString()}</strong>
          <span className="md-field-subtext">Available observation points</span>
        </div>
      </div>

      <footer className="md-selected-footer">
        <span>
          <Activity size={12} />
          OBSERVATION
        </span>

        <span>
          <Database size={12} />
          SOURCE: MARKET DATA API
        </span>

        <span>
          STATE: {loading ? 'REFRESHING' : 'AVAILABLE'}
        </span>
      </footer>
    </section>
  );
};

export default SelectedInstrument;
