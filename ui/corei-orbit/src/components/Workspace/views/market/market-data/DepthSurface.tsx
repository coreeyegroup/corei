import React from 'react';
import { BarChart3, Database, Radio } from 'lucide-react';
import { useMarketStore } from '../../../../../services/marketDataService';

interface DepthSurfaceProps {
  symbol: string | null;
}

const DepthSurface: React.FC<DepthSurfaceProps> = ({ symbol }) => {
  const instruments = useMarketStore((state) => state.instruments);
  const loading = useMarketStore((state) => state.loading);
  const error = useMarketStore((state) => state.error);

  if (!symbol) {
    return (
      <section className="md-depth-surface md-surface">
        <header className="md-surface-header">
          <div>
            <span className="md-eyebrow">OBSERVATION / DEPTH</span>
            <h3>Depth</h3>
          </div>

          <span className="md-surface-state">NO SELECTION</span>
        </header>

        <div className="md-depth-empty">
          Select an instrument to inspect depth observations.
        </div>
      </section>
    );
  }

  const instrument = instruments[symbol];

  if (!instrument) {
    return (
      <section className="md-depth-surface md-surface">
        <header className="md-surface-header">
          <div>
            <span className="md-eyebrow">OBSERVATION / DEPTH</span>
            <h3>Depth</h3>
          </div>

          <span className="md-surface-state">UNAVAILABLE</span>
        </header>

        <div className="md-depth-empty">
          <strong>{symbol}</strong>
          <span>
            {loading
              ? 'Waiting for current market observation.'
              : error || 'No depth observation is currently exposed.'}
          </span>
        </div>
      </section>
    );
  }

  const formattedPrice = Number.isFinite(instrument.price)
    ? new Intl.NumberFormat('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 8,
      }).format(instrument.price)
    : '—';

  return (
    <section className="md-depth-surface md-surface">
      <header className="md-surface-header">
        <div>
          <span className="md-eyebrow">OBSERVATION / DEPTH</span>
          <h3>{symbol}</h3>
        </div>

        <span className="md-surface-state md-state-live">
          <Radio size={12} />
          OBSERVATION
        </span>
      </header>

      <div className="md-depth-summary">
        <div className="md-depth-primary">
          <span className="md-field-label">LAST OBSERVED PRICE</span>
          <strong>{formattedPrice}</strong>
          <span className="md-field-subtext">
            Current market observation
          </span>
        </div>

        <div className="md-depth-metric">
          <span className="md-field-label">DEPTH PROFILE</span>
          <strong>NOT EXPOSED</strong>
          <span className="md-field-subtext">
            Aggregated depth stream unavailable
          </span>
        </div>

        <div className="md-depth-metric">
          <span className="md-field-label">DEPTH LEVELS</span>
          <strong>NOT EXPOSED</strong>
          <span className="md-field-subtext">
            Governed depth levels unavailable
          </span>
        </div>
      </div>

      <div className="md-depth-visual">
        <div className="md-depth-side md-depth-bid">
          <div className="md-depth-side-header">
            <span>BID DEPTH</span>
            <span>NOT EXPOSED</span>
          </div>

          <div className="md-depth-placeholder">
            <BarChart3 size={17} />
            <strong>NO GOVERNED DEPTH DATA</strong>
            <span>
              Cumulative bid quantity and price-level distribution are not
              exposed by the current market-data contract.
            </span>
          </div>
        </div>

        <div className="md-depth-center">
          <span className="md-field-label">DEPTH STATE</span>
          <strong>UNAVAILABLE</strong>
          <span className="md-field-subtext">
            Orbit will render governed depth when an authoritative stream is
            exposed.
          </span>
        </div>

        <div className="md-depth-side md-depth-ask">
          <div className="md-depth-side-header">
            <span>ASK DEPTH</span>
            <span>NOT EXPOSED</span>
          </div>

          <div className="md-depth-placeholder">
            <BarChart3 size={17} />
            <strong>NO GOVERNED DEPTH DATA</strong>
            <span>
              Cumulative ask quantity and price-level distribution are not
              exposed by the current market-data contract.
            </span>
          </div>
        </div>
      </div>

      <div className="md-depth-metadata">
        <div>
          <span className="md-field-label">CUMULATIVE BID</span>
          <strong>NOT EXPOSED</strong>
        </div>

        <div>
          <span className="md-field-label">CUMULATIVE ASK</span>
          <strong>NOT EXPOSED</strong>
        </div>

        <div>
          <span className="md-field-label">DEPTH IMBALANCE</span>
          <strong>NOT COMPUTED</strong>
        </div>

        <div>
          <span className="md-field-label">LIQUIDITY PROFILE</span>
          <strong>NOT COMPUTED</strong>
        </div>
      </div>

      <footer className="md-depth-footer">
        <span>
          <BarChart3 size={12} />
          DEPTH OBSERVATION
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

export default DepthSurface;
