/**
 * COREI — MARKET DATA EVIDENCE SURFACE
 *
 * PURPOSE
 * -------
 * Presents the evidence boundary supporting Market Data observation and
 * downstream COREI intelligence.
 *
 * RESPONSIBILITIES
 * ---------------
 * - Identify the selected instrument.
 * - Show what evidence categories are available to the UI.
 * - Distinguish observable data from unavailable evidence metadata.
 * - Preserve evidence provenance and authority boundaries.
 * - Provide a stable presentation surface for future governed evidence APIs.
 *
 * MUST NEVER
 * ----------
 * - Invent market events.
 * - Invent event timestamps or sequence numbers.
 * - Invent evidence counts.
 * - Invent confidence values.
 * - Infer causality from price history inside the UI.
 * - Synthesize intelligence.
 * - Cross into execution.
 *
 * CURRENT DATA BOUNDARY
 * ---------------------
 * Orbit currently exposes basic market instrument observations through the
 * existing market-data service. Evidence-event metadata is not exposed by
 * that contract.
 */

import React from 'react';
import {
  FileSearch,
  ShieldAlert,
} from 'lucide-react';
import { useMarketStore } from '../../../../../services/marketDataService';

interface MarketDataEvidenceSurfaceProps {
  symbol: string | null;
}

const MarketDataEvidenceSurface: React.FC<
  MarketDataEvidenceSurfaceProps
> = ({ symbol }) => {
  const instruments = useMarketStore((state) => state.instruments);
  const loading = useMarketStore((state) => state.loading);
  const error = useMarketStore((state) => state.error);

  const instrument = symbol ? instruments[symbol] : undefined;
  const observationAvailable = Boolean(instrument);

  const evidenceState = loading
    ? 'REFRESHING'
    : error
      ? 'ERROR'
      : observationAvailable
        ? 'OBSERVATION AVAILABLE'
        : 'NO EVIDENCE SOURCE';

  return (
    <section className="md-evidence-surface">
      <header className="md-evidence-surface-header">
        <div className="md-evidence-surface-title">
          <FileSearch size={14} />
          <div>
            <span>MARKET DATA EVIDENCE</span>
            <small>
              Evidence objects supporting observation and interpretation
            </small>
          </div>
        </div>

        <span className="md-evidence-surface-mode">
          READ ONLY
        </span>
      </header>

      <div className="md-evidence-grid">
        <div className="md-evidence-field">
          <span className="md-field-label">INSTRUMENT</span>
          <strong>{symbol || 'NONE'}</strong>
        </div>

        <div className="md-evidence-field">
          <span className="md-field-label">EVIDENCE STATE</span>
          <strong
            className={
              observationAvailable && !error
                ? 'md-evidence-value-active'
                : undefined
            }
          >
            {evidenceState}
          </strong>
        </div>

        <div className="md-evidence-field">
          <span className="md-field-label">EVENT EVIDENCE</span>
          <strong>NOT EXPOSED</strong>
        </div>

        <div className="md-evidence-field">
          <span className="md-field-label">OBSERVATION EVIDENCE</span>
          <strong>
            {observationAvailable ? 'AVAILABLE' : 'NOT AVAILABLE'}
          </strong>
        </div>

        <div className="md-evidence-field">
          <span className="md-field-label">STRUCTURAL EVIDENCE</span>
          <strong>NOT EXPOSED</strong>
        </div>

        <div className="md-evidence-field">
          <span className="md-field-label">RELATIONSHIP EVIDENCE</span>
          <strong>NOT EXPOSED</strong>
        </div>

        <div className="md-evidence-field">
          <span className="md-field-label">SOURCE EVIDENCE</span>
          <strong>NOT EXPOSED</strong>
        </div>

        <div className="md-evidence-field">
          <span className="md-field-label">EVIDENCE COUNT</span>
          <strong>NOT EXPOSED</strong>
        </div>
      </div>

      <div className="md-evidence-trace">
        <div className="md-evidence-trace-field">
          <span className="md-field-label">EVENT TIME</span>
          <strong>NOT EXPOSED</strong>
        </div>

        <div className="md-evidence-trace-field">
          <span className="md-field-label">SEQUENCE</span>
          <strong>NOT EXPOSED</strong>
        </div>

        <div className="md-evidence-trace-field">
          <span className="md-field-label">SOURCE</span>
          <strong>NOT EXPOSED</strong>
        </div>

        <div className="md-evidence-trace-field">
          <span className="md-field-label">PROVENANCE</span>
          <strong>NOT EXPOSED</strong>
        </div>

        <div className="md-evidence-trace-field">
          <span className="md-field-label">LINEAGE</span>
          <strong>NOT EXPOSED</strong>
        </div>

        <div className="md-evidence-trace-field">
          <span className="md-field-label">CONFIDENCE</span>
          <strong>NOT EXPOSED</strong>
        </div>
      </div>

      <div className="md-evidence-boundary">
        <div>
          <span className="md-field-label">CURRENT OBSERVATION</span>
          <strong>
            {instrument ? 'AVAILABLE' : 'NOT AVAILABLE'}
          </strong>
        </div>

        <div>
          <span className="md-field-label">EVIDENCE ENGINE</span>
          <strong>NOT EXPOSED</strong>
        </div>

        <div>
          <span className="md-field-label">CAUSAL INTERPRETATION</span>
          <strong>NOT COMPUTED IN UI</strong>
        </div>

        <div>
          <span className="md-field-label">INTELLIGENCE DERIVATION</span>
          <strong>NOT COMPUTED IN UI</strong>
        </div>
      </div>

      <footer className="md-evidence-surface-footer">
        <span>
          <ShieldAlert size={11} />
          EVIDENCE REQUIRES AUTHORITATIVE BACKEND EXPOSURE
        </span>

        <span>
          {symbol ? `INSTRUMENT: ${symbol}` : 'INSTRUMENT: NONE'}
        </span>

        <span>
          NO EVIDENCE, CAUSALITY, OR CONFIDENCE SYNTHESIZED
        </span>
      </footer>
    </section>
  );
};

export default MarketDataEvidenceSurface;
