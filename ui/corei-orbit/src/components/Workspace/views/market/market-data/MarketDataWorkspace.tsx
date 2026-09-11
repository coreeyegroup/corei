import React, { useMemo, useState } from 'react';
import { LayoutDashboard, Lock } from 'lucide-react';

import MarketDataCommandBar from './MarketDataCommandBar';
import InstrumentUniverse from './InstrumentUniverse';
import SelectedInstrument from './SelectedInstrument';
import QuoteSurface from './QuoteSurface';
import TradeSurface from './TradeSurface';
import OrderBookSurface from './OrderBookSurface';
import DepthSurface from './DepthSurface';
import OHLCVSurface from './OHLCVSurface';
import TimeAndSalesSurface from './TimeAndSalesSurface';
import MarketDataEventStream from './MarketDataEventStream';
import MarketDataAuthorityStrip from './MarketDataAuthorityStrip';
import MarketDataStateSurface from './MarketDataStateSurface';
import MarketDataContextSurface from './MarketDataContextSurface';
import MarketDataGovernanceSurface from './MarketDataGovernanceSurface';
import MarketDataOriginSurface from './MarketDataOriginSurface';
import MarketDataHistoricalSurface from './MarketDataHistoricalSurface';
import MarketDataReplaySurface from './MarketDataReplaySurface';
import MarketDataDerivedSurface from './MarketDataDerivedSurface';
import MarketDataIntelligenceLens from './MarketDataIntelligenceLens';
import MarketDataOperationsSurface from './MarketDataOperationsSurface';
import MarketDataOverviewSurface from './MarketDataOverviewSurface';
import MarketDataNavigation from './MarketDataNavigation';
import MarketDataCapabilitySurface from './MarketDataCapabilitySurface';
import MarketDataEvidenceSurface from './MarketDataEvidenceSurface';
import MarketDataLineageSurface from './MarketDataLineageSurface';
import MarketDataSnapshotSurface from './MarketDataSnapshotSurface';
import MarketDataComparisonSurface from './MarketDataComparisonSurface';
import MarketDataReadinessSurface from './MarketDataReadinessSurface';
import {
  MARKET_DATA_CAPABILITY_GROUPS,
  getMarketDataCapability,
} from './MarketDataCapabilityRegistry';

import type { MarketDataCapabilitySurfaceGroup } from './MarketDataCapabilitySurface';

type WorkspaceView =
  | 'overview'
  | 'observation'
  | 'authority'
  | 'state'
  | 'context'
  | 'governance'
  | 'origin'
  | 'historical'
  | 'replay'
  | 'derived'
  | 'intelligence'
  | 'evidence'
  | 'lineage'
  | 'snapshot'
  | 'comparison'
  | 'readiness'
  | 'operations';

const navigationToView: Record<string, WorkspaceView> = {
  overview: 'overview',
  instruments: 'observation',
  quotes: 'observation',
  trades: 'observation',
  'order-book': 'observation',
  depth: 'observation',
  bars: 'observation',
  'time-and-sales': 'observation',
  markets: 'context',
  sessions: 'context',
  venues: 'context',
  exchanges: 'context',
  'asset-classes': 'context',
  availability: 'state',
  freshness: 'state',
  quality: 'state',
  integrity: 'state',
  completeness: 'state',
  trust: 'state',
  schema: 'governance',
  normalization: 'governance',
  validation: 'governance',
  reconciliation: 'governance',
  precision: 'governance',
  sources: 'origin',
  vendors: 'origin',
  feeds: 'origin',
  provenance: 'origin',
  lineage: 'lineage',
  search: 'historical',
  datasets: 'historical',
  snapshots: 'snapshot',
  comparison: 'comparison',
  replay: 'replay',
  reconstruction: 'replay',
  checkpoints: 'replay',
  statistics: 'derived',
  features: 'derived',
  liquidity: 'derived',
  flow: 'derived',
  volatility: 'derived',
  relationships: 'intelligence',
  'what-changed': 'intelligence',
  unusual: 'intelligence',
  emerging: 'intelligence',
  evidence: 'evidence',
  trace: 'lineage',
  'feed-monitoring': 'operations',
  'data-monitoring': 'operations',
  alerts: 'operations',
  recovery: 'operations',
  audit: 'operations',
  controls: 'operations',
};

const capabilityGroups: MarketDataCapabilitySurfaceGroup[] =
  MARKET_DATA_CAPABILITY_GROUPS.map((group) => ({
    id: group.id,
    label: group.title,
    description: `${group.capabilities.length} registered capabilities`,
    items: group.capabilities.map((capabilityId) => {
      const descriptor = getMarketDataCapability(capabilityId);

      return {
        id: descriptor.id,
        label: descriptor.title,
        description: descriptor.description,
        exposure: descriptor.exposure,
      };
    }),
  }));

const MarketDataWorkspace: React.FC = () => {
  const [selectedSymbol, setSelectedSymbol] = useState<string | null>(null);
  const [activeView, setActiveView] = useState<WorkspaceView>('overview');
  const [searchQuery, setSearchQuery] = useState('');

  const selectedCapabilityId = useMemo(() => {
    const viewToCapability: Partial<
      Record<WorkspaceView, Parameters<typeof getMarketDataCapability>[0]>
    > = {
      overview: 'OVERVIEW',
      observation: 'INSTRUMENTS',
      authority: 'SOURCE',
      state: 'DATA_STATE',
      context: 'SESSION',
      governance: 'GOVERNANCE',
      origin: 'SOURCE',
      historical: 'HISTORICAL',
      replay: 'REPLAY',
      derived: 'DERIVED',
      intelligence: 'WHAT_CHANGED',
      evidence: 'EVIDENCE',
      lineage: 'LINEAGE',
      snapshot: 'SNAPSHOT',
      comparison: 'COMPARISON',
      operations: 'FEED_MONITORING',
    };

    return viewToCapability[activeView] ?? 'OVERVIEW';
  }, [activeView]);

  const selectedCapability = useMemo(
    () => getMarketDataCapability(selectedCapabilityId),
    [selectedCapabilityId],
  );

  const handleNavigation = (capabilityId: string) => {
    const nextView = navigationToView[capabilityId];

    if (nextView) {
      setActiveView(nextView);
    }
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  const renderActiveView = () => {
    switch (activeView) {
      case 'overview':
        return <MarketDataOverviewSurface symbol={selectedSymbol} />;

      case 'observation':
        return (
          <div className="market-data-workspace-observation-grid">
            <SelectedInstrument symbol={selectedSymbol} />
            <QuoteSurface symbol={selectedSymbol} />
            <TradeSurface symbol={selectedSymbol} />
            <OrderBookSurface symbol={selectedSymbol} />
            <DepthSurface symbol={selectedSymbol} />
            <OHLCVSurface symbol={selectedSymbol} />
            <TimeAndSalesSurface symbol={selectedSymbol} />
            <MarketDataEventStream symbol={selectedSymbol} />
          </div>
        );

      case 'authority':
        return <MarketDataAuthorityStrip symbol={selectedSymbol} />;

      case 'state':
        return <MarketDataStateSurface symbol={selectedSymbol} />;

      case 'context':
        return <MarketDataContextSurface symbol={selectedSymbol} />;

      case 'governance':
        return <MarketDataGovernanceSurface symbol={selectedSymbol} />;

      case 'origin':
        return <MarketDataOriginSurface symbol={selectedSymbol} />;

      case 'historical':
        return <MarketDataHistoricalSurface symbol={selectedSymbol} />;

      case 'replay':
        return <MarketDataReplaySurface symbol={selectedSymbol} />;

      case 'derived':
        return <MarketDataDerivedSurface symbol={selectedSymbol} />;

      case 'intelligence':
        return <MarketDataIntelligenceLens symbol={selectedSymbol} />;

      case 'evidence':
        return <MarketDataEvidenceSurface symbol={selectedSymbol} />;

      case 'lineage':
        return <MarketDataLineageSurface symbol={selectedSymbol} />;

      case 'snapshot':
        return <MarketDataSnapshotSurface symbol={selectedSymbol} />;

      case 'comparison':
        return <MarketDataComparisonSurface symbol={selectedSymbol} />;

      case 'readiness':
        return <MarketDataReadinessSurface symbol={selectedSymbol} />;

      case 'operations':
        return <MarketDataOperationsSurface symbol={selectedSymbol} />;

      default:
        return <MarketDataOverviewSurface symbol={selectedSymbol} />;
    }
  };

  return (
    <section className="market-data-workspace">
      <header className="market-data-workspace-header">
        <div className="market-data-workspace-title">
          <LayoutDashboard size={17} />
          <div>
            <div className="market-data-surface-eyebrow">COREI / MARKET INTELLIGENCE</div>
            <h2>Market Data</h2>
          </div>
        </div>

        <div className="market-data-surface-badge">
          <Lock size={12} />
          READ ONLY
        </div>
      </header>

      <MarketDataCommandBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onRefresh={handleRefresh}
      />

      <div className="market-data-workspace-layout">
        <aside className="market-data-workspace-sidebar">
          <MarketDataNavigation
            activeSection={selectedCapability?.id || 'OVERVIEW'}
            onSectionChange={handleNavigation}
          />

          <InstrumentUniverse
            selectedSymbol={selectedSymbol ?? ''}
            onSelect={setSelectedSymbol}
          />
        </aside>

        <main className="market-data-workspace-main">
          <div className="market-data-workspace-capability">
            <MarketDataCapabilitySurface
              groups={capabilityGroups}
              selectedCapabilityId={selectedCapability?.id || selectedCapabilityId}
              onSelect={handleNavigation}
            />
          </div>

          {renderActiveView()}
        </main>
      </div>
    </section>
  );
};

export default MarketDataWorkspace;
