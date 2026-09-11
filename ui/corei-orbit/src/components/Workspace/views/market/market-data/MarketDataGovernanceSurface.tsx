import React from 'react';
import { FileCheck2, ShieldAlert } from 'lucide-react';
import { useMarketStore } from '../../../../../services/marketDataService';

interface MarketDataGovernanceSurfaceProps {
  symbol: string | null;
}

const MarketDataGovernanceSurface: React.FC<MarketDataGovernanceSurfaceProps> = ({
  symbol,
}) => {
  const instruments = useMarketStore((state) => state.instruments);
  const loading = useMarketStore((state) => state.loading);
  const error = useMarketStore((state) => state.error);

  const instrument = symbol ? instruments[symbol] : undefined;
  const observationAvailable = Boolean(instrument);

  const contractState = loading
    ? 'REFRESHING'
    : error
      ? 'ERROR'
      : observationAvailable
        ? 'OBSERVATION CONTRACT ACTIVE'
        : 'NO CONTRACT';

  return (
    <section className="md-governance-surface">
      <header className="md-governance-surface-header">
        <div className="md-governance-surface-title">
          <FileCheck2 size={14} />
          <span>MARKET DATA GOVERNANCE</span>
        </div>

        <span className="md-governance-surface-mode">
          READ ONLY
        </span>
      </header>

      <div className="md-governance-grid">
        <div className="md-governance-field">
          <span className="md-field-label">CONTRACT</span>
          <strong
            className={
              observationAvailable && !error
                ? 'md-governance-value-active'
                : undefined
            }
          >
            {contractState}
          </strong>
        </div>

        <div className="md-governance-field">
          <span className="md-field-label">SCHEMA</span>
          <strong>NOT EXPOSED</strong>
        </div>

        <div className="md-governance-field">
          <span className="md-field-label">NORMALIZATION</span>
          <strong>NOT EXPOSED</strong>
        </div>

        <div className="md-governance-field">
          <span className="md-field-label">VALIDATION</span>
          <strong>NOT EXPOSED</strong>
        </div>

        <div className="md-governance-field">
          <span className="md-field-label">RECONCILIATION</span>
          <strong>NOT EXPOSED</strong>
        </div>

        <div className="md-governance-field">
          <span className="md-field-label">PRECISION</span>
          <strong>NOT EXPOSED</strong>
        </div>

        <div className="md-governance-field">
          <span className="md-field-label">VERSION</span>
          <strong>NOT EXPOSED</strong>
        </div>

        <div className="md-governance-field">
          <span className="md-field-label">GOVERNANCE STATE</span>
          <strong>NOT EXPOSED</strong>
        </div>
      </div>

      <footer className="md-governance-surface-footer">
        <span>
          <ShieldAlert size={11} />
          GOVERNANCE METADATA REQUIRES GOVERNED BACKEND EXPOSURE
        </span>

        <span>
          {symbol ? `INSTRUMENT: ${symbol}` : 'INSTRUMENT: NONE'}
        </span>

        <span>
          NO GOVERNANCE STATUS SYNTHESIZED
        </span>
      </footer>
    </section>
  );
};

export default MarketDataGovernanceSurface;
