import React from 'react';
import { BrainCircuit, ShieldAlert } from 'lucide-react';
import { useMarketStore } from '../../../../../services/marketDataService';

interface MarketDataIntelligenceLensProps {
  symbol: string | null;
}

const MarketDataIntelligenceLens: React.FC<
  MarketDataIntelligenceLensProps
> = ({ symbol }) => {
  const instruments = useMarketStore((state) => state.instruments);
  const loading = useMarketStore((state) => state.loading);
  const error = useMarketStore((state) => state.error);

  const instrument = symbol ? instruments[symbol] : undefined;
  const observationAvailable = Boolean(instrument);

  const intelligenceState = loading
    ? 'REFRESHING'
    : error
      ? 'ERROR'
      : observationAvailable
        ? 'OBSERVATION AVAILABLE'
        : 'NO INTELLIGENCE SOURCE';

  return (
    <section className="md-intelligence-lens">
      <header className="md-intelligence-lens-header">
        <div className="md-intelligence-lens-title">
          <BrainCircuit size={14} />
          <span>COREI INTELLIGENCE LENS</span>
        </div>

        <span className="md-intelligence-lens-mode">
          READ ONLY
        </span>
      </header>

      <div className="md-intelligence-grid">
        <div className="md-intelligence-field">
          <span className="md-field-label">INSTRUMENT</span>
          <strong>{symbol || 'NONE'}</strong>
        </div>

        <div className="md-intelligence-field">
          <span className="md-field-label">WHAT CHANGED?</span>
          <strong>NOT EXPOSED</strong>
        </div>

        <div className="md-intelligence-field">
          <span className="md-field-label">WHAT IS UNUSUAL?</span>
          <strong>NOT EXPOSED</strong>
        </div>

        <div className="md-intelligence-field">
          <span className="md-field-label">WHAT IS EMERGING?</span>
          <strong>NOT EXPOSED</strong>
        </div>

        <div className="md-intelligence-field">
          <span className="md-field-label">RELATIONSHIPS</span>
          <strong>NOT EXPOSED</strong>
        </div>

        <div className="md-intelligence-field">
          <span className="md-field-label">STRUCTURE</span>
          <strong>NOT EXPOSED</strong>
        </div>

        <div className="md-intelligence-field">
          <span className="md-field-label">OPPORTUNITY</span>
          <strong>NOT EXPOSED</strong>
        </div>

        <div className="md-intelligence-field">
          <span className="md-field-label">INTELLIGENCE STATE</span>
          <strong
            className={
              observationAvailable && !error
                ? 'md-intelligence-value-active'
                : undefined
            }
          >
            {intelligenceState}
          </strong>
        </div>
      </div>

      <div className="md-intelligence-trace">
        <div className="md-intelligence-trace-field">
          <span className="md-field-label">EVIDENCE</span>
          <strong>NOT EXPOSED</strong>
        </div>

        <div className="md-intelligence-trace-field">
          <span className="md-field-label">CONFIDENCE</span>
          <strong>NOT EXPOSED</strong>
        </div>

        <div className="md-intelligence-trace-field">
          <span className="md-field-label">PROVENANCE</span>
          <strong>NOT EXPOSED</strong>
        </div>

        <div className="md-intelligence-trace-field">
          <span className="md-field-label">LINEAGE</span>
          <strong>NOT EXPOSED</strong>
        </div>

        <div className="md-intelligence-trace-field">
          <span className="md-field-label">TRACE</span>
          <strong>NOT EXPOSED</strong>
        </div>
      </div>

      <footer className="md-intelligence-lens-footer">
        <span>
          <ShieldAlert size={11} />
          INTELLIGENCE REQUIRES AUTHORITATIVE BACKEND EXPOSURE
        </span>

        <span>
          {symbol ? `INSTRUMENT: ${symbol}` : 'INSTRUMENT: NONE'}
        </span>

        <span>
          NO INTELLIGENCE OR CONFIDENCE SYNTHESIZED
        </span>
      </footer>
    </section>
  );
};

export default MarketDataIntelligenceLens;
