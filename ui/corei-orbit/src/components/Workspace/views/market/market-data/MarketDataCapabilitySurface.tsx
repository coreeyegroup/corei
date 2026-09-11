/**
 * COREI — MARKET DATA CAPABILITY SURFACE
 *
 * PURPOSE
 * -------
 * Presents the governed Market Data capability boundary to the operator.
 *
 * RESPONSIBILITIES
 * ---------------
 * - Display capability groups and their current exposure state.
 * - Distinguish backend-available capabilities from unavailable capabilities.
 * - Preserve the read-only boundary of Market Data.
 * - Provide a stable composition surface for the capability registry.
 *
 * MUST NEVER
 * ----------
 * - Fetch market data directly.
 * - Compute market state.
 * - Synthesize unavailable capabilities.
 * - Invent backend health, quality, lineage, replay, or intelligence state.
 * - Place, modify, cancel, or route orders.
 * - Cross the Market Data → Execution boundary.
 *
 * ARCHITECTURAL POSITION
 * ----------------------
 * Market Data UI
 *   → Capability Registry
 *   → Capability Surface
 *   → Operator visibility
 *
 * The registry remains the capability-definition authority.
 * This component is presentation-only.
 */

import React from 'react';
import {
  Activity,
  BarChart3,
  BookOpen,
  Database,
  GitBranch,
  History,
  Search,
  ShieldCheck,
  SlidersHorizontal,
} from 'lucide-react';

export type MarketDataCapabilityExposure =
  | 'AVAILABLE'
  | 'BACKEND_AVAILABLE'
  | 'NOT_EXPOSED'
  | 'NOT_COMPUTED';

export interface MarketDataCapabilitySurfaceItem {
  id: string;
  label: string;
  description: string;
  exposure: MarketDataCapabilityExposure;
}

export interface MarketDataCapabilitySurfaceGroup {
  id: string;
  label: string;
  description: string;
  items: MarketDataCapabilitySurfaceItem[];
}

interface MarketDataCapabilitySurfaceProps {
  groups: MarketDataCapabilitySurfaceGroup[];
  selectedCapabilityId?: string | null;
  onSelect?: (capabilityId: string) => void;
}

const GROUP_ICONS: Record<
  string,
  React.FC<{ size?: number; className?: string }>
> = {
  observation: Activity,
  context: Search,
  data_state: ShieldCheck,
  governance: BookOpen,
  origin: GitBranch,
  historical: History,
  replay: History,
  derived: BarChart3,
  intelligence: SlidersHorizontal,
  operations: Database,
};

function exposureLabel(exposure: MarketDataCapabilityExposure): string {
  switch (exposure) {
    case 'AVAILABLE':
      return 'AVAILABLE';

    case 'BACKEND_AVAILABLE':
      return 'BACKEND';

    case 'NOT_COMPUTED':
      return 'NOT COMPUTED';

    case 'NOT_EXPOSED':
    default:
      return 'NOT EXPOSED';
  }
}

function exposureClass(exposure: MarketDataCapabilityExposure): string {
  switch (exposure) {
    case 'AVAILABLE':
    case 'BACKEND_AVAILABLE':
      return 'md-capability-exposure md-capability-exposure-available';

    case 'NOT_COMPUTED':
      return 'md-capability-exposure md-capability-exposure-uncomputed';

    case 'NOT_EXPOSED':
    default:
      return 'md-capability-exposure md-capability-exposure-unavailable';
  }
}

const MarketDataCapabilitySurface: React.FC<
  MarketDataCapabilitySurfaceProps
> = ({
  groups,
  selectedCapabilityId = null,
  onSelect,
}) => {
  const capabilityCount = groups.reduce(
    (count, group) => count + group.items.length,
    0,
  );

  const availableCount = groups.reduce(
    (count, group) =>
      count +
      group.items.filter(
        (item) =>
          item.exposure === 'AVAILABLE' ||
          item.exposure === 'BACKEND_AVAILABLE',
      ).length,
    0,
  );

  return (
    <section className="md-capability-surface">
      <header className="md-capability-surface-header">
        <div className="md-capability-surface-title">
          <SlidersHorizontal size={14} />
          <div>
            <span>MARKET DATA CAPABILITY SURFACE</span>
            <small>
              Governed capability exposure and operator visibility
            </small>
          </div>
        </div>

        <div className="md-capability-surface-summary">
          <span>
            {availableCount} / {capabilityCount} EXPOSED
          </span>

          <span className="md-capability-surface-mode">
            READ ONLY
          </span>
        </div>
      </header>

      <div className="md-capability-groups">
        {groups.map((group) => {
          const GroupIcon =
            GROUP_ICONS[group.id] ?? SlidersHorizontal;

          return (
            <section
              className="md-capability-group"
              key={group.id}
            >
              <header className="md-capability-group-header">
                <div className="md-capability-group-title">
                  <GroupIcon size={13} />
                  <div>
                    <strong>{group.label}</strong>
                    <span>{group.description}</span>
                  </div>
                </div>

                <span className="md-capability-group-count">
                  {group.items.length}
                </span>
              </header>

              <div className="md-capability-items">
                {group.items.map((item) => {
                  const selected =
                    item.id === selectedCapabilityId;

                  const interactive = Boolean(onSelect);

                  return (
                    <button
                      type="button"
                      key={item.id}
                      className={[
                        'md-capability-item',
                        selected
                          ? 'md-capability-item-selected'
                          : '',
                        !interactive
                          ? 'md-capability-item-static'
                          : '',
                      ]
                        .filter(Boolean)
                        .join(' ')}
                      onClick={() => {
                        if (onSelect) {
                          onSelect(item.id);
                        }
                      }}
                      disabled={!interactive}
                    >
                      <span className="md-capability-item-copy">
                        <strong>{item.label}</strong>
                        <span>{item.description}</span>
                      </span>

                      <span className={exposureClass(item.exposure)}>
                        {exposureLabel(item.exposure)}
                      </span>
                    </button>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>

      <footer className="md-capability-surface-footer">
        <span>
          <ShieldCheck size={11} />
          CAPABILITY STATE IS REGISTRY-DRIVEN
        </span>

        <span>
          UNEXPOSED CAPABILITIES REMAIN VISIBILITY BOUNDARIES
        </span>

        <span>
          NO MARKET STATE OR INTELLIGENCE SYNTHESIZED
        </span>
      </footer>
    </section>
  );
};

export default MarketDataCapabilitySurface;
