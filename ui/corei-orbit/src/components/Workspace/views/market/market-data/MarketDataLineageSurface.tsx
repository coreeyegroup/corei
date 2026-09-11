/**
 * COREI — MARKET DATA LINEAGE SURFACE
 *
 * PURPOSE
 * -------
 * Presents the lineage boundary between market observations and their
 * governed downstream representations.
 *
 * RESPONSIBILITIES
 * ---------------
 * - Identify the selected instrument.
 * - Present the canonical lineage stages.
 * - Distinguish observable source state from unavailable lineage metadata.
 * - Preserve provenance and authority boundaries.
 *
 * MUST NEVER
 * ----------
 * - Invent source IDs, feed IDs, event IDs, or sequence numbers.
 * - Invent schema versions.
 * - Claim Kafka, persistence, validation, or normalization status without
 *   authoritative backend exposure.
 * - Compute lineage in the UI.
 * - Infer provenance from the instrument symbol.
 * - Synthesize intelligence or confidence.
 * - Cross into execution.
 *
 * CURRENT DATA BOUNDARY
 * ---------------------
 * Orbit exposes the basic market-data observation contract. End-to-end
 * lineage metadata is not currently exposed through that contract.
 */

import React from 'react';
import {
  Database,
  GitBranch,
  ShieldAlert,
} from 'lucide-react';
import { useMarketStore } from '../../../../../services/marketDataService';

interface MarketDataLineageSurfaceProps {
  symbol: string | null;
}

interface LineageStage {
  id: string;
  label: string;
  description: string;
}

const LINEAGE_STAGES: LineageStage[] = [
  {
    id: 'market-source',
    label: 'MARKET SOURCE',
    description: 'Origin of the market observation',
  },
  {
    id: 'ingestion',
    label: 'INGESTION',
    description: 'Authoritative event intake boundary',
  },
  {
    id: 'raw-event',
    label: 'RAW EVENT',
    description: 'Original governed event representation',
  },
  {
    id: 'normalization',
    label: 'NORMALIZATION',
    description: 'Canonical event transformation',
  },
  {
    id: 'validation',
    label: 'VALIDATION',
    description: 'Schema and data integrity boundary',
  },
  {
    id: 'event-stream',
    label: 'EVENT STREAM',
    description: 'Authoritative event-stream boundary',
  },
  {
    id: 'persistence',
    label: 'PERSISTENCE',
    description: 'Derived analytical persistence boundary',
  },
  {
    id: 'derived',
    label: 'DERIVED DATA',
    description: 'Governed downstream data products',
  },
  {
    id: 'feature',
    label: 'FEATURE',
    description: 'Feature computation boundary',
  },
  {
    id: 'intelligence',
    label: 'INTELLIGENCE',
    description: 'Downstream intelligence representation',
  },
];

const MarketDataLineageSurface: React.FC<
  MarketDataLineageSurfaceProps
> = ({ symbol }) => {
  const instruments = useMarketStore((state) => state.instruments);
  const loading = useMarketStore((state) => state.loading);
  const error = useMarketStore((state) => state.error);

  const instrument = symbol ? instruments[symbol] : undefined;
  const observationAvailable = Boolean(instrument);

  const lineageState = loading
    ? 'REFRESHING'
    : error
      ? 'ERROR'
      : observationAvailable
        ? 'OBSERVATION AVAILABLE'
        : 'NO LINEAGE SOURCE';

  return (
    <section className="md-lineage-surface">
      <header className="md-lineage-surface-header">
        <div className="md-lineage-surface-title">
          <GitBranch size={14} />
          <div>
            <span>MARKET DATA LINEAGE</span>
            <small>
              Provenance path from market source to downstream intelligence
            </small>
          </div>
        </div>

        <div className="md-lineage-surface-summary">
          <span>{lineageState}</span>

          <span className="md-lineage-surface-mode">
            READ ONLY
          </span>
        </div>
      </header>

      <div className="md-lineage-identity">
        <div className="md-lineage-identity-field">
          <span className="md-field-label">INSTRUMENT</span>
          <strong>{symbol || 'NONE'}</strong>
        </div>

        <div className="md-lineage-identity-field">
          <span className="md-field-label">OBSERVATION</span>
          <strong>
            {observationAvailable ? 'AVAILABLE' : 'NOT AVAILABLE'}
          </strong>
        </div>

        <div className="md-lineage-identity-field">
          <span className="md-field-label">LINEAGE STATE</span>
          <strong>{lineageState}</strong>
        </div>

        <div className="md-lineage-identity-field">
          <span className="md-field-label">LINEAGE ID</span>
          <strong>NOT EXPOSED</strong>
        </div>
      </div>

      <div className="md-lineage-flow">
        {LINEAGE_STAGES.map((stage, index) => (
          <React.Fragment key={stage.id}>
            <div className="md-lineage-stage">
              <div className="md-lineage-stage-index">
                {String(index + 1).padStart(2, '0')}
              </div>

              <div className="md-lineage-stage-copy">
                <strong>{stage.label}</strong>
                <span>{stage.description}</span>
              </div>

              <span className="md-lineage-stage-state">
                NOT EXPOSED
              </span>
            </div>

            {index < LINEAGE_STAGES.length - 1 && (
              <div
                className="md-lineage-connector"
                aria-hidden="true"
              />
            )}
          </React.Fragment>
        ))}
      </div>

      <div className="md-lineage-metadata">
        <div className="md-lineage-metadata-field">
          <span className="md-field-label">SOURCE</span>
          <strong>NOT EXPOSED</strong>
        </div>

        <div className="md-lineage-metadata-field">
          <span className="md-field-label">VENDOR</span>
          <strong>NOT EXPOSED</strong>
        </div>

        <div className="md-lineage-metadata-field">
          <span className="md-field-label">FEED</span>
          <strong>NOT EXPOSED</strong>
        </div>

        <div className="md-lineage-metadata-field">
          <span className="md-field-label">VENUE</span>
          <strong>NOT EXPOSED</strong>
        </div>

        <div className="md-lineage-metadata-field">
          <span className="md-field-label">EVENT ID</span>
          <strong>NOT EXPOSED</strong>
        </div>

        <div className="md-lineage-metadata-field">
          <span className="md-field-label">SCHEMA</span>
          <strong>NOT EXPOSED</strong>
        </div>

        <div className="md-lineage-metadata-field">
          <span className="md-field-label">SCHEMA VERSION</span>
          <strong>NOT EXPOSED</strong>
        </div>

        <div className="md-lineage-metadata-field">
          <span className="md-field-label">PROVENANCE</span>
          <strong>NOT EXPOSED</strong>
        </div>
      </div>

      <div className="md-lineage-boundary">
        <div className="md-lineage-boundary-title">
          <Database size={13} />
          <span>AUTHORITY BOUNDARY</span>
        </div>

        <div className="md-lineage-boundary-grid">
          <div>
            <span className="md-field-label">CURRENT OBSERVATION</span>
            <strong>
              {observationAvailable ? 'AVAILABLE' : 'NOT AVAILABLE'}
            </strong>
          </div>

          <div>
            <span className="md-field-label">END-TO-END LINEAGE</span>
            <strong>NOT EXPOSED</strong>
          </div>

          <div>
            <span className="md-field-label">LINEAGE COMPUTATION</span>
            <strong>NOT COMPUTED IN UI</strong>
          </div>

          <div>
            <span className="md-field-label">PROVENANCE INFERENCE</span>
            <strong>NOT COMPUTED IN UI</strong>
          </div>
        </div>
      </div>

      <footer className="md-lineage-surface-footer">
        <span>
          <ShieldAlert size={11} />
          LINEAGE REQUIRES AUTHORITATIVE BACKEND EXPOSURE
        </span>

        <span>
          {symbol ? `INSTRUMENT: ${symbol}` : 'INSTRUMENT: NONE'}
        </span>

        <span>
          NO LINEAGE OR PROVENANCE SYNTHESIZED
        </span>
      </footer>
    </section>
  );
};

export default MarketDataLineageSurface;
