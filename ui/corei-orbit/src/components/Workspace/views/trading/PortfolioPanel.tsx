// src/components/Workspace/views/trading/PortfolioPanel.tsx

import React from 'react';
import { useTradeStore } from '../../../../services/tradeService';
import { StatPanel } from '../panels';

interface PortfolioPanelProps {
  compact?: boolean;
}

const PortfolioPanel: React.FC<PortfolioPanelProps> = ({
  compact = false,
}) => {
  const portfolio = useTradeStore(
    (state) => state.portfolio,
  );

  const totalCapital = portfolio?.totalCapital ?? 0;
  const allocated = portfolio?.allocated ?? 0;
  const freeCapital = portfolio?.freeCapital ?? 0;
  const utilisation = portfolio?.utilisation ?? 0;
  const pnl = portfolio?.pnl ?? 0;
  const winRate = portfolio?.winRate ?? 0;
  const totalTrades = portfolio?.totalTrades ?? 0;
  const wins = portfolio?.wins ?? 0;
  const losses = portfolio?.losses ?? 0;

  if (compact) {
    return (
      <div className="portfolio-compact">
        <h4>Portfolio</h4>

        <StatPanel
          label="Capital"
          value={`$${totalCapital.toFixed(0)}`}
        />

        <StatPanel
          label="P&L"
          value={`$${pnl.toFixed(2)}`}
          color={pnl >= 0 ? 'green' : 'red'}
        />

        <StatPanel
          label="Win Rate"
          value={`${winRate.toFixed(1)}%`}
        />
      </div>
    );
  }

  return (
    <div className="panel-container">
      <h2>Portfolio</h2>

      <div className="portfolio-grid">
        <StatPanel
          label="Total Capital"
          value={`$${totalCapital.toFixed(0)}`}
        />

        <StatPanel
          label="Allocated"
          value={`$${allocated.toFixed(0)}`}
        />

        <StatPanel
          label="Free Capital"
          value={`$${freeCapital.toFixed(0)}`}
        />

        <StatPanel
          label="Utilisation"
          value={`${utilisation.toFixed(1)}%`}
        />

        <StatPanel
          label="Realized P&L"
          value={`$${pnl.toFixed(2)}`}
          color={pnl >= 0 ? 'green' : 'red'}
        />

        <StatPanel
          label="Trades"
          value={totalTrades}
        />

        <StatPanel
          label="Wins"
          value={wins}
        />

        <StatPanel
          label="Losses"
          value={losses}
        />
      </div>
    </div>
  );
};

export default PortfolioPanel;
