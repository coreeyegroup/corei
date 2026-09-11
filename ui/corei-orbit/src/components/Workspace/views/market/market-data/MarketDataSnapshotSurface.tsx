/**
 * COREI — MARKET DATA SNAPSHOT SURFACE
 *
 * PURPOSE
 * -------
 * Presents the point-in-time snapshot boundary for Market Data.
 *
 * RESPONSIBILITIES
 * ---------------
 * - Identify the selected instrument.
 * - Show whether a current observation exists.
 * - Define the governed snapshot metadata boundary.
 * - Provide a stable surface for future authoritative snapshot exposure.
 *
 * MUST NEVER
 * ----------
 * - Invent snapshot IDs.
 * - Invent snapshot timestamps.
 * - Construct synthetic snapshots from UI state.
 * - Claim historical reconstruction capability without backend exposure.
 * - Compute market state in the UI.
 * - Synthesize intelligence.
 * - Cross into execution.
 *
 * CURRENT DATA BOUNDARY
 * ---------------------
 * The existing Orbit market-data contract exposes instrument observations
 * and history arrays. It does not expose governed snapshot objects or
 * snapshot metadata.
 */

import React from 'react';
import {
  Camera,
  ShieldAlert,
} from 'lucide-react';
import { useMarketStore } from '../../../../../services/marketDataService';

interface MarketDataSnapshotSurfaceProps {
  symbol: string | null;
}

const MarketDataSnapshotSurface: React.FC<
  MarketDataSnapshotSurfaceProps
> = ({ symbol }) => {
  const instruments = useMarketStore((state) => state.instruments);
  const loading = useMarketStore((state) => state.loading);
  const error = useMarketStore((state) => state.error);

  const instrument = symbol ? instruments[symbol] : undefined;
  const observationAvailable = Boolean(instrument);

  const snapshotState = loading
    ? 'REFRESHING'
    : error
      ? 'ERROR'
      : observationAvailable
        ? 'OBSERVATION AVAILABLE'
        : 'NO SNAPSHOT SOURCE';

  return (
    <section className="md-snapshot-surface">
      <header className="md-snapshot-surface-header">
        <div className="md-snapshot-surface-title">
          <Camera size={14} />
          <div>
            <span>MARKET DATA SNAPSHOT</span>
            <small>
              Point-in-time market observation boundary
            </small>
          </div>
        </div>

        <div className="md-snapshot-surface-summary">
          <span>{snapshotState}</span>

          <span className="md-snapshot-surface-mode">
            READ ONLY
          </span>
        </div>
      </header>

      <div className="md-snapshot-identity">
        <div className="md-snapshot-field">
          <span className="md-field-label">INSTRUMENT</span>
          <strong>{symbol || 'NONE'}</strong>
        </div>

        <div className="md-snapshot-field">
          <span className="md-field-label">OBSERVATION</span>
          <strong>
            {observationAvailable ? 'AVAILABLE' : 'NOT AVAILABLE'}
          </strong>
        </div>

        <div className="md-snapshot-field">
          <span className="md-field-label">SNAPSHOT STATE</span>
          <strong
            className={
              observationAvailable && !error
                ? 'md-snapshot-value-active'
                : undefined
            }
          >
            {snapshotState}
          </strong>
        </div>

        <div className="md-snapshot-field">
          <span className="md-field-label">SNAPSHOT ID</span>
          <strong>NOT EXPOSED</strong>
        </div>
      </div>

      <div className="md-snapshot-grid">
        <div className="md-snapshot-field">
          <span className="md-field-label">SNAPSHOT TIME</span>
          <strong>NOT EXPOSED</strong>
        </div>

        <div className="md-snapshot-field">
          <span className="md-field-label">EVENT TIME</span>
          <strong>NOT EXPOSED</strong>
        </div>

        <div className="md-snapshot-field">
          <span className="md-field-label">SEQUENCE</span>
          <strong>NOT EXPOSED</strong>
        </div>

        <div className="md-snapshot-field">
          <span className="md-field-label">SOURCE</span>
          <strong>NOT EXPOSED</strong>
        </div>

        <div className="md-snapshot-field">
          <span className="md-field-label">VENUE</span>
          <strong>NOT EXPOSED</strong>
        </div>

        <div className="md-snapshot-field">
          <span className="md-field-label">SCHEMA</span>
          <strong>NOT EXPOSED</strong>
        </div>

        <div className="md-snapshot-field">
          <span className="md-field-label">DATA STATE</span>
          <strong>NOT EXPOSED</strong>
        </div>

        <div className="md-snapshot-field">
          <span className="md-field-label">LINEAGE</span>
          <strong>NOT EXPOSED</strong>
        </div>
      </div>

      <div className="md-snapshot-content">
        <div className="md-snapshot-content-header">
          <span>SNAPSHOT CONTENT</span>
          <span>
            {instrument
              ? `${instrument.history.length} OBSERVATIONS AVAILABLE`
              : 'NO OBSERVATIONS AVAILABLE'}
          </span>
        </div>

        <div className="md-snapshot-content-grid">
          <div>
            <span className="md-field-label">PRICE OBSERVATION</span>
            <strong>
              {instrument
                ? String(instrument.price)
                : 'NOT AVAILABLE'}
            </strong>
          </div>

          <div>
            <span className="md-field-label">CHANGE OBSERVATION</span>
            <strong>
              {instrument
                ? String(instrument.change)
                : 'NOT AVAILABLE'}
            </strong>
          </div>

          <div>
            <span className="md-field-label">HISTORY</span>
            <strong>
              {instrument
                ? `${instrument.history.length} POINTS`
                : 'NOT AVAILABLE'}
            </strong>
          </div>

          <div>
            <span className="md-field-label">FULL SNAPSHOT</span>
            <strong>NOT EXPOSED</strong>
          </div>
        </div>
      </div>

      <div className="md-snapshot-boundary">
        <div>
          <span className="md-field-label">POINT-IN-TIME CAPTURE</span>
          <strong>NOT EXPOSED</strong>
        </div>

        <div>
          <span className="md-field-label">HISTORICAL RECONSTRUCTION</span>
          <strong>NOT EXPOSED</strong>
        </div>

        <div>
          <span className="md-field-label">SNAPSHOT COMPARISON</span>
          <strong>NOT EXPOSED</strong>
        </div>

        <div>
          <span className="md-field-label">SNAPSHOT VALIDATION</span>
          <strong>NOT EXPOSED</strong>
        </div>
      </div>

      <footer className="md-snapshot-surface-footer">
        <span>
          <ShieldAlert size={11} />
          SNAPSHOT STATE REQUIRES AUTHORITATIVE BACKEND EXPOSURE
        </span>

        <span>
          {symbol ? `INSTRUMENT: ${symbol}` : 'INSTRUMENT: NONE'}
        </span>

        <span>
          NO SNAPSHOT OR HISTORICAL STATE SYNTHESIZED
        </span>
      </footer>
    </section>
  );
};

export default MarketDataSnapshotSurface;
