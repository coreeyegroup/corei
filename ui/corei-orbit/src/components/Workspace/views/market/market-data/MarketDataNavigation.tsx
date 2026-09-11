import React from 'react';
import {
  Activity,
  Archive,
  BarChart3,
  BrainCircuit,
  Database,
  FileCheck2,
  History,
  Layers3,
  Network,
  Play,
  Search,
  Settings2,
  ShieldCheck,
} from 'lucide-react';
import type { MarketDataCapability } from './MarketDataTypes';

interface MarketDataNavigationProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

interface NavigationGroup {
  id: string;
  label: string;
  items: {
    id: string;
    label: string;
    capability: MarketDataCapability;
  }[];
}

const navigationGroups: NavigationGroup[] = [
  {
    id: 'observation',
    label: 'OBSERVATION',
    items: [
      {
        id: 'overview',
        label: 'Overview',
        capability: 'OVERVIEW',
      },
      {
        id: 'instruments',
        label: 'Instruments',
        capability: 'INSTRUMENTS',
      },
      {
        id: 'quotes',
        label: 'Quotes',
        capability: 'QUOTES',
      },
      {
        id: 'trades',
        label: 'Trades',
        capability: 'TRADES',
      },
      {
        id: 'order-book',
        label: 'Order Book',
        capability: 'ORDER_BOOK',
      },
      {
        id: 'depth',
        label: 'Depth',
        capability: 'DEPTH',
      },
      {
        id: 'bars',
        label: 'Bars',
        capability: 'BARS',
      },
      {
        id: 'time-sales',
        label: 'Time & Sales',
        capability: 'TIME_AND_SALES',
      },
    ],
  },
  {
    id: 'context',
    label: 'CONTEXT',
    items: [
      {
        id: 'markets',
        label: 'Markets',
        capability: 'MARKETS',
      },
      {
        id: 'sessions',
        label: 'Sessions',
        capability: 'SESSIONS',
      },
      {
        id: 'venues',
        label: 'Venues',
        capability: 'VENUES',
      },
      {
        id: 'exchanges',
        label: 'Exchanges',
        capability: 'EXCHANGES',
      },
      {
        id: 'asset-classes',
        label: 'Asset Classes',
        capability: 'ASSET_CLASSES',
      },
    ],
  },
  {
    id: 'data-state',
    label: 'DATA STATE',
    items: [
      {
        id: 'availability',
        label: 'Availability',
        capability: 'AVAILABILITY',
      },
      {
        id: 'freshness',
        label: 'Freshness',
        capability: 'FRESHNESS',
      },
      {
        id: 'quality',
        label: 'Quality',
        capability: 'QUALITY',
      },
      {
        id: 'integrity',
        label: 'Integrity',
        capability: 'INTEGRITY',
      },
      {
        id: 'completeness',
        label: 'Completeness',
        capability: 'COMPLETENESS',
      },
      {
        id: 'trust',
        label: 'Trust',
        capability: 'TRUST',
      },
    ],
  },
  {
    id: 'governance',
    label: 'GOVERNANCE',
    items: [
      {
        id: 'schema',
        label: 'Schema',
        capability: 'SCHEMA',
      },
      {
        id: 'normalization',
        label: 'Normalization',
        capability: 'NORMALIZATION',
      },
      {
        id: 'validation',
        label: 'Validation',
        capability: 'VALIDATION',
      },
      {
        id: 'reconciliation',
        label: 'Reconciliation',
        capability: 'RECONCILIATION',
      },
      {
        id: 'precision',
        label: 'Precision',
        capability: 'PRECISION',
      },
    ],
  },
  {
    id: 'origin',
    label: 'ORIGIN',
    items: [
      {
        id: 'sources',
        label: 'Sources',
        capability: 'SOURCES',
      },
      {
        id: 'vendors',
        label: 'Vendors',
        capability: 'VENDORS',
      },
      {
        id: 'feeds',
        label: 'Feeds',
        capability: 'FEEDS',
      },
      {
        id: 'provenance',
        label: 'Provenance',
        capability: 'PROVENANCE',
      },
      {
        id: 'lineage',
        label: 'Lineage',
        capability: 'LINEAGE',
      },
    ],
  },
  {
    id: 'historical',
    label: 'HISTORICAL',
    items: [
      {
        id: 'search',
        label: 'Search',
        capability: 'HISTORICAL_SEARCH',
      },
      {
        id: 'datasets',
        label: 'Datasets',
        capability: 'DATASETS',
      },
      {
        id: 'snapshots',
        label: 'Snapshots',
        capability: 'SNAPSHOTS',
      },
      {
        id: 'comparison',
        label: 'Comparison',
        capability: 'COMPARISON',
      },
    ],
  },
  {
    id: 'replay',
    label: 'REPLAY',
    items: [
      {
        id: 'replay',
        label: 'Replay',
        capability: 'REPLAY',
      },
      {
        id: 'reconstruction',
        label: 'Reconstruction',
        capability: 'RECONSTRUCTION',
      },
      {
        id: 'checkpoints',
        label: 'Checkpoints',
        capability: 'CHECKPOINTS',
      },
      {
        id: 'replay-validation',
        label: 'Validation',
        capability: 'REPLAY_VALIDATION',
      },
    ],
  },
  {
    id: 'derived',
    label: 'DERIVED',
    items: [
      {
        id: 'statistics',
        label: 'Statistics',
        capability: 'STATISTICS',
      },
      {
        id: 'features',
        label: 'Features',
        capability: 'FEATURES',
      },
      {
        id: 'liquidity',
        label: 'Liquidity',
        capability: 'LIQUIDITY',
      },
      {
        id: 'flow',
        label: 'Flow',
        capability: 'FLOW',
      },
      {
        id: 'volatility',
        label: 'Volatility',
        capability: 'VOLATILITY',
      },
      {
        id: 'relationships',
        label: 'Relationships',
        capability: 'RELATIONSHIPS',
      },
    ],
  },
  {
    id: 'intelligence',
    label: 'INTELLIGENCE',
    items: [
      {
        id: 'what-changed',
        label: 'What Changed?',
        capability: 'WHAT_CHANGED',
      },
      {
        id: 'unusual',
        label: 'Unusual',
        capability: 'UNUSUAL',
      },
      {
        id: 'emerging',
        label: 'Emerging',
        capability: 'EMERGING',
      },
      {
        id: 'intelligence-relationships',
        label: 'Relationships',
        capability: 'INTELLIGENCE_RELATIONSHIPS',
      },
      {
        id: 'evidence',
        label: 'Evidence',
        capability: 'EVIDENCE',
      },
      {
        id: 'trace',
        label: 'Trace',
        capability: 'TRACE',
      },
    ],
  },
  {
    id: 'operations',
    label: 'OPERATIONS',
    items: [
      {
        id: 'feed-monitoring',
        label: 'Feed Monitoring',
        capability: 'FEED_MONITORING',
      },
      {
        id: 'data-monitoring',
        label: 'Data Monitoring',
        capability: 'DATA_MONITORING',
      },
      {
        id: 'alerts',
        label: 'Alerts',
        capability: 'ALERTS',
      },
      {
        id: 'recovery',
        label: 'Recovery',
        capability: 'RECOVERY',
      },
      {
        id: 'audit',
        label: 'Audit',
        capability: 'AUDIT',
      },
      {
        id: 'controls',
        label: 'Controls',
        capability: 'CONTROLS',
      },
    ],
  },
];

const groupIcons: Record<string, React.ElementType> = {
  observation: Activity,
  context: Network,
  'data-state': Database,
  governance: FileCheck2,
  origin: Layers3,
  historical: History,
  replay: Play,
  derived: BarChart3,
  intelligence: BrainCircuit,
  operations: Settings2,
};

const MarketDataNavigation: React.FC<MarketDataNavigationProps> = ({
  activeSection,
  onSectionChange,
}) => {
  return (
    <nav className="md-navigation" aria-label="Market Data navigation">
      <div className="md-navigation-header">
        <div className="md-navigation-title">
          <Database size={14} />
          <span>MARKET DATA</span>
        </div>

        <span className="md-navigation-mode">
          READ ONLY
        </span>
      </div>

      <div className="md-navigation-groups">
        {navigationGroups.map((group) => {
          const GroupIcon = groupIcons[group.id] || Activity;

          return (
            <section
              key={group.id}
              className="md-navigation-group"
            >
              <div className="md-navigation-group-title">
                <GroupIcon size={11} />
                <span>{group.label}</span>
              </div>

              <div className="md-navigation-items">
                {group.items.map((item) => {
                  const isActive = activeSection === item.id;

                  return (
                    <button
                      key={item.id}
                      type="button"
                      className={`md-navigation-item ${
                        isActive ? 'active' : ''
                      }`}
                      onClick={() => onSectionChange(item.id)}
                      aria-current={isActive ? 'page' : undefined}
                    >
                      <span className="md-navigation-item-marker" />

                      <span className="md-navigation-item-label">
                        {item.label}
                      </span>

                      <span className="md-navigation-item-capability">
                        {item.capability}
                      </span>
                    </button>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>

      <footer className="md-navigation-footer">
        <span>
          <ShieldCheck size={11} />
          GOVERNED NAVIGATION MODEL
        </span>

        <span>
          <Archive size={11} />
          NO BACKEND STATE SYNTHESIZED
        </span>

        <span>
          <Search size={11} />
          CAPABILITY SELECTION ONLY
        </span>
      </footer>
    </nav>
  );
};

export default MarketDataNavigation;
