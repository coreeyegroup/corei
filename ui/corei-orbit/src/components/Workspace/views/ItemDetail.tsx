// src/components/Workspace/views/ItemDetail.tsx
import React from 'react';
import MarketIntelligence from './market/MarketIntelligence';
import { useTradeStore } from '../../../services/tradeService';
import { useMarketStore } from '../../../services/marketDataService';
import {
  useInfrastructureStore,
  type HealthStatus,
} from '../../../store/infrastructureStore';
import {
  StatPanel,
  StatusGridPanel,
  TablePanel,
} from './panels';

interface ItemDetailProps {
  domainId: string;
  itemLabel: string;
}

type RenderFn = () => React.ReactNode;

/*
 * IMPORTANT:
 * Hooks must not be executed inside functions stored in this renderer map.
 *
 * MarketDataDetail is therefore a real React component and owns
 * useMarketStore() legitimately.
 */
const itemRenderers: Record<string, Record<string, RenderFn>> = {};

// ─────────────────────────────────────────────────────────────────────
// Trading domain renderers
// ─────────────────────────────────────────────────────────────────────

itemRenderers.trading = {
  'Market Intelligence': () => (
    <MarketIntelligence section="overview" />
  ),

  'Market Data': () => (
    <MarketIntelligence section="market-data" />
  ),

  'Market Health': () => (
    <MarketIntelligence section="market-health" />
  ),

  'Technical Indicators': () => (
    <MarketIntelligence section="technical" />
  ),

  'Market Structure': () => (
    <MarketIntelligence section="structure" />
  ),

  'Trend Analysis': () => (
    <MarketIntelligence section="trend" />
  ),

  'Volatility Analysis': () => (
    <MarketIntelligence section="volatility" />
  ),

  'Momentum Analysis': () => (
    <MarketIntelligence section="momentum" />
  ),

  'Market Regime': () => (
    <MarketIntelligence section="regime" />
  ),

  'Risk Engine': () => {
    const var95 = 2450;
    const drawdown = 2.4;
    const riskLimit = 45;
    const concentration = 18.5;

    return (
      <div className="item-detail view-container">
        <div className="workspace-header">
          <h2>Risk Engine</h2>
          <span className="workspace-subtitle">
            Real-time risk analytics
          </span>
        </div>

        <div
          className="stats-grid"
          style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}
        >
          <StatPanel
            label="VaR (95%)"
            value={`-$${var95.toFixed(0)}`}
            color="red"
          />

          <StatPanel
            label="Drawdown"
            value={drawdown.toFixed(2)}
            unit="%"
            color="amber"
          />

          <StatPanel
            label="Risk Limit"
            value={riskLimit.toFixed(0)}
            unit="%"
            color="green"
          />

          <StatPanel
            label="Concentration"
            value={concentration.toFixed(1)}
            unit="%"
            color="blue"
          />
        </div>

        <div
          className="detail-content"
          style={{ marginTop: '16px' }}
        >
          <TablePanel
            title="Risk Limits Overview"
            columns={[
              { key: 'type', label: 'Limit Type' },
              { key: 'current', label: 'Current' },
              { key: 'max', label: 'Max' },
              { key: 'status', label: 'Status' },
            ]}
            data={[
              {
                type: 'Position Size',
                current: '12 lots',
                max: '25 lots',
                status: 'OK',
              },
              {
                type: 'Daily Loss',
                current: '$1,200',
                max: '$5,000',
                status: 'OK',
              },
              {
                type: 'Exposure',
                current: '42%',
                max: '60%',
                status: 'OK',
              },
              {
                type: 'Correlation',
                current: '0.65',
                max: '0.80',
                status: 'WARNING',
              },
            ]}
          />
        </div>
      </div>
    );
  },



  Execution: () => {
    return (
      <div className="item-detail view-container">
        <div className="workspace-header">
          <h2>Execution Intelligence</h2>
          <span className="workspace-subtitle">
            Order flow and execution quality
          </span>
        </div>

        <div
          className="stats-grid"
          style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}
        >
          <StatPanel
            label="Fill Rate"
            value="98.7"
            unit="%"
            color="green"
          />

          <StatPanel
            label="Avg Slippage"
            value="0.02"
            unit="bps"
            color="blue"
          />

          <StatPanel
            label="Order Volume"
            value="345.2"
            unit="lots"
          />

          <StatPanel
            label="Latency"
            value="12"
            unit="ms"
            color="green"
          />
        </div>

        <div
          className="detail-content"
          style={{ marginTop: '16px' }}
        >
          <TablePanel
            title="Recent Orders"
            columns={[
              { key: 'time', label: 'Time' },
              { key: 'symbol', label: 'Symbol' },
              { key: 'side', label: 'Side' },
              { key: 'qty', label: 'Qty' },
              { key: 'price', label: 'Price' },
              { key: 'status', label: 'Status' },
            ]}
            data={[
              {
                time: '15:58:40',
                symbol: 'BTC/USD',
                side: 'BUY',
                qty: 0.5,
                price: 67420,
                status: 'Filled',
              },
              {
                time: '15:55:10',
                symbol: 'ETH/USD',
                side: 'SELL',
                qty: 2.0,
                price: 3455,
                status: 'Filled',
              },
              {
                time: '15:52:30',
                symbol: 'BTC/USD',
                side: 'BUY',
                qty: 0.3,
                price: 67380,
                status: 'Pending',
              },
            ]}
          />
        </div>
      </div>
    );
  },

  Portfolio: () => {
    return (
      <div className="item-detail view-container">
        <div className="workspace-header">
          <h2>Portfolio Intelligence</h2>
          <span className="workspace-subtitle">
            Capital and allocation overview
          </span>
        </div>

        <div
          className="stats-grid"
          style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}
        >
          <StatPanel
            label="Total Capital"
            value="$125,400"
            color="blue"
          />

          <StatPanel
            label="Allocated"
            value="$54,200"
            color="green"
          />

          <StatPanel
            label="Free Capital"
            value="$71,200"
          />

          <StatPanel
            label="Utilisation"
            value="43.2"
            unit="%"
            color="amber"
          />
        </div>

        <div
          className="detail-content"
          style={{ marginTop: '16px' }}
        >
          <TablePanel
            title="Allocation by Asset"
            columns={[
              { key: 'asset', label: 'Asset' },
              { key: 'allocation', label: 'Allocation' },
              { key: 'value', label: 'Value' },
              { key: 'change', label: 'Change' },
            ]}
            data={[
              {
                asset: 'BTC/USD',
                allocation: '42%',
                value: '$22,800',
                change: '+3.2%',
              },
              {
                asset: 'ETH/USD',
                allocation: '28%',
                value: '$15,200',
                change: '-1.1%',
              },
              {
                asset: 'Gold',
                allocation: '20%',
                value: '$10,800',
                change: '+0.8%',
              },
              {
                asset: 'USDC',
                allocation: '10%',
                value: '$5,400',
                change: '0.0%',
              },
            ]}
          />
        </div>
      </div>
    );
  },

};

// ─────────────────────────────────────────────────────────────────────
// Infrastructure domain renderers
// ─────────────────────────────────────────────────────────────────────

itemRenderers.infrastructure = {
  'Cluster Operations': () => {
    const nodes: Array<{
      name: string;
      status: HealthStatus;
    }> = [
      {
        name: 'node-01',
        status: 'HEALTHY',
      },
      {
        name: 'node-02',
        status: 'HEALTHY',
      },
      {
        name: 'node-03',
        status: 'DEGRADED',
      },
    ];

    return (
      <div className="item-detail view-container">
        <div className="workspace-header">
          <h2>Cluster Operations</h2>
          <span className="workspace-subtitle">
            Node and cluster health
          </span>
        </div>

        <div
          className="stats-grid"
          style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}
        >
          <StatPanel
            label="Total Nodes"
            value="3"
          />

          <StatPanel
            label="Healthy"
            value="2"
            color="green"
          />

          <StatPanel
            label="Degraded"
            value="1"
            color="amber"
          />
        </div>

        <div
          className="detail-content"
          style={{ marginTop: '16px' }}
        >
          <StatusGridPanel
            title="Node Status"
            services={nodes}
          />
        </div>
      </div>
    );
  },
};

// ─────────────────────────────────────────────────────────────────────
// Main component
// ─────────────────────────────────────────────────────────────────────

const ItemDetail: React.FC<ItemDetailProps> = ({
  domainId,
  itemLabel,
}) => {
  /*
   * These hooks remain unconditional.
   *
   * Do not move them below conditional returns.
   */
  const tradeStore = useTradeStore();
  const marketStore = useMarketStore();
  const infraStore = useInfrastructureStore();

  /*
   * Custom renderer lookup.
   */
  const domainRenderers = itemRenderers[domainId];
  const renderer = domainRenderers?.[itemLabel];

  if (renderer) {
    return <>{renderer()}</>;
  }

  /*
   * Generic fallback.
   *
   * The hooks above have already been called unconditionally.
   */
  const getContext = () => {
    switch (domainId) {
      case 'trading': {
        const portfolio = tradeStore.portfolio;

        const pnl = portfolio?.pnl ?? 0;
        const totalTrades = portfolio?.totalTrades ?? 0;
        const wins = portfolio?.wins ?? 0;

        /*
         * Exposure is not currently part of TradeState.
         *
         * Use the existing portfolio utilisation as the available
         * portfolio-level exposure representation until the trading
         * contract is reconciled.
         */
        const exposure = portfolio?.utilisation ?? 0;

        const winRate =
          totalTrades > 0
            ? (wins / totalTrades) * 100
            : 0;

        return {
          title: `Trading – ${itemLabel}`,
          stats: [
            {
              label: 'Daily P&L',
              value: pnl.toFixed(2),
            },
            {
              label: 'Win Rate',
              value: `${winRate.toFixed(1)}%`,
            },
            {
              label: 'Trades Today',
              value: totalTrades,
            },
            {
              label: 'Exposure',
              value: `${exposure.toFixed(2)}%`,
            },
          ],
          extra: 'Trading operational data',
        };
      }

      case 'infrastructure': {
        const service = infraStore.services.find(
          (s) => s.name === itemLabel.toUpperCase()
        );

        return {
          title: `Infrastructure – ${itemLabel}`,
          stats: [
            {
              label: 'Status',
              value: service?.status || 'UNKNOWN',
            },
            {
              label: 'Uptime',
              value: '99.99%',
            },
            {
              label: 'Response Time',
              value: '12ms',
            },
            {
              label: 'Availability',
              value: '100%',
            },
          ],
          extra: 'Infrastructure service details',
        };
      }

      case 'market': {
        const instruments = marketStore.instruments;

        return {
          title: `Market – ${itemLabel}`,
          stats: [
            {
              label: 'Instruments',
              value: Object.keys(instruments).length,
            },
            {
              label: 'Status',
              value: 'LIVE',
            },
            {
              label: 'Data Source',
              value: 'Market Data Service',
            },
            {
              label: 'Mode',
              value: 'REAL',
            },
          ],
          extra: 'Market data details',
        };
      }

      default:
        return {
          title: itemLabel,
          stats: [],
          extra: 'Workspace item details',
        };
    }
  };

  const context = getContext();

  return (
    <div className="item-detail view-container">
      <div className="workspace-header">
        <h2>{context.title}</h2>
        <span className="workspace-subtitle">
          {context.extra}
        </span>
      </div>

      {context.stats.length > 0 && (
        <div
          className="stats-grid"
          style={{
            gridTemplateColumns:
              'repeat(4, minmax(0, 1fr))',
          }}
        >
          {context.stats.map((stat) => (
            <StatPanel
              key={stat.label}
              label={stat.label}
              value={String(stat.value)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ItemDetail;
