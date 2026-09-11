import React from 'react';
import { BarChart3, Database, Radio } from 'lucide-react';
import { useMarketStore } from '../../../../../services/marketDataService';

interface OHLCVSurfaceProps {
  symbol: string | null;
}

const OHLCVSurface: React.FC<OHLCVSurfaceProps> = ({ symbol }) => {
  const instruments = useMarketStore((state) => state.instruments);
  const loading = useMarketStore((state) => state.loading);
  const error = useMarketStore((state) => state.error);

  if (!symbol) {
    return (
      <section className="md-ohlcv-surface md-surface">
        <header className="md-surface-header">
          <div>
            <span className="md-eyebrow">OBSERVATION / BARS</span>
            <h3>OHLCV</h3>
          </div>

          <span className="md-surface-state">NO SELECTION</span>
        </header>

        <div className="md-ohlcv-empty">
          Select an instrument to inspect bar observations.
        </div>
      </section>
    );
  }

  const instrument = instruments[symbol];

  if (!instrument) {
    return (
      <section className="md-ohlcv-surface md-surface">
        <header className="md-surface-header">
          <div>
            <span className="md-eyebrow">OBSERVATION / BARS</span>
            <h3>OHLCV</h3>
          </div>

          <span className="md-surface-state">UNAVAILABLE</span>
        </header>

        <div className="md-ohlcv-empty">
          <strong>{symbol}</strong>
          <span>
            {loading
              ? 'Waiting for current market observation.'
              : error || 'No bar observation is currently exposed.'}
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
    <section className="md-ohlcv-surface md-surface">
      <header className="md-surface-header">
        <div>
          <span className="md-eyebrow">OBSERVATION / BARS</span>
          <h3>{symbol}</h3>
        </div>

        <span className="md-surface-state md-state-live">
          <Radio size={12} />
          OBSERVATION
        </span>
      </header>

      <div className="md-ohlcv-summary">
        <div className="md-ohlcv-primary">
          <span className="md-field-label">LAST OBSERVED PRICE</span>
          <strong>{formattedPrice}</strong>
          <span className="md-field-subtext">
            Current market observation
          </span>
        </div>

        <div className="md-ohlcv-metric">
          <span className="md-field-label">HISTORICAL OBSERVATIONS</span>
          <strong>{historyCount.toLocaleString('en-US')}</strong>
          <span className="md-field-subtext">
            Existing history array
          </span>
        </div>

        <div className="md-ohlcv-metric">
          <span className="md-field-label">BAR INTERVAL</span>
          <strong>NOT EXPOSED</strong>
          <span className="md-field-subtext">
            Governed interval metadata unavailable
          </span>
        </div>
      </div>

      <div className="md-ohlcv-grid">
        <div className="md-ohlcv-column">
          <div className="md-ohlcv-column-header">
            <span>PRICE STRUCTURE</span>
            <span>NOT EXPOSED</span>
          </div>

          <div className="md-ohlcv-unavailable">
            <BarChart3 size={17} />
            <strong>OHLC NOT EXPOSED</strong>
            <span>
              Open, high, low and close fields are not available in the
              current market-data contract.
            </span>
          </div>
        </div>

        <div className="md-ohlcv-column">
          <div className="md-ohlcv-column-header">
            <span>VOLUME</span>
            <span>NOT EXPOSED</span>
          </div>

          <div className="md-ohlcv-unavailable">
            <BarChart3 size={17} />
            <strong>VOLUME NOT EXPOSED</strong>
            <span>
              Volume and notional observations require a governed bar or
              trade-derived data source.
            </span>
          </div>
        </div>
      </div>

      <div className="md-ohlcv-metadata">
        <div>
          <span className="md-field-label">OPEN</span>
          <strong>NOT EXPOSED</strong>
        </div>

        <div>
          <span className="md-field-label">HIGH</span>
          <strong>NOT EXPOSED</strong>
        </div>

        <div>
          <span className="md-field-label">LOW</span>
          <strong>NOT EXPOSED</strong>
        </div>

        <div>
          <span className="md-field-label">CLOSE</span>
          <strong>NOT EXPOSED</strong>
        </div>

        <div>
          <span className="md-field-label">VOLUME</span>
          <strong>NOT EXPOSED</strong>
        </div>

        <div>
          <span className="md-field-label">EVENT TIME</span>
          <strong>NOT EXPOSED</strong>
        </div>
      </div>

      <footer className="md-ohlcv-footer">
        <span>
          <BarChart3 size={12} />
          OHLCV OBSERVATION
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

export default OHLCVSurface;
