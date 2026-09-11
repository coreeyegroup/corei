// src/components/Workspace/views/trading/RiskPanel.tsx
import React from 'react';
import { useTradeStore } from '../../../../services/tradeService';
import { StatPanel, StatusGridPanel } from '../panels';
import type { HealthStatus } from '../../../../store/infrastructureStore';

interface RiskPanelProps {
  compact?: boolean;
}

const RiskPanel: React.FC<RiskPanelProps> = ({ compact = false }) => {
  const { portfolio } = useTradeStore();

  // ─── Placeholder risk metrics (will be replaced by real risk engine data) ──
  const riskPlaceholders = {
    var95: 2450,
    drawdown: 2.4,
    riskLimit: 45,
    concentration: 18.5,
    dailyLoss: 1200,
    dailyLossLimit: 5000,
    exposure: portfolio?.utilisation ?? 0,
    exposureLimit: 60,
    correlation: 0.65,
    correlationLimit: 0.80,
  };

  // Use real P&L, exposure from portfolio
  const pnl = portfolio?.pnl ?? 0;
  const exposure = portfolio?.utilisation ?? 0;

  if (compact) {
    return (
      <div className="risk-compact">
        <h4>Risk</h4>
        <StatPanel label="VaR" value={`-$${riskPlaceholders.var95}`} color="red" />
        <StatPanel label="Drawdown" value={`${riskPlaceholders.drawdown}%`} color="amber" />
        <StatPanel label="Exposure" value={`${exposure.toFixed(1)}%`} />
        <StatPanel label="P&L" value={`$${pnl.toFixed(2)}`} color={pnl >= 0 ? 'green' : 'red'} />
      </div>
    );
  }

  return (
    <div className="panel-container">
      <h2>Risk Control Centre</h2>
      <div className="risk-grid">
        <div className="risk-section">
          <h3>Portfolio Risk</h3>
          <StatPanel label="VaR (95%)" value={`-$${riskPlaceholders.var95}`} color="red" />
          <StatPanel label="Drawdown" value={`${riskPlaceholders.drawdown}%`} color="amber" />
          <StatPanel label="Exposure" value={`${exposure.toFixed(1)}%`} />
          <StatPanel label="Concentration" value={`${riskPlaceholders.concentration}%`} />
          <StatPanel label="Correlation" value={riskPlaceholders.correlation} />
          <StatPanel label="Daily Loss" value={`$${riskPlaceholders.dailyLoss}`} color="amber" />
        </div>
        <div className="risk-section">
          <h3>Limits</h3>
          <StatPanel label="Risk Limit" value={`${riskPlaceholders.riskLimit}%`} />
          <StatPanel label="Exposure Limit" value={`${riskPlaceholders.exposureLimit}%`} />
          <StatPanel label="Daily Loss Limit" value={`$${riskPlaceholders.dailyLossLimit}`} />
          <StatPanel label="Correlation Limit" value={riskPlaceholders.correlationLimit} />
        </div>
        <div className="risk-section">
          <h3>Controls</h3>
          <StatusGridPanel
            title="Risk State"
            services={[
              { name: 'Trading State', status: 'HEALTHY' as HealthStatus },
              { name: 'Risk Gate', status: 'HEALTHY' as HealthStatus },
              { name: 'Kill Switch', status: 'HEALTHY' as HealthStatus },
              { name: 'Order Restrictions', status: 'HEALTHY' as HealthStatus },
            ]}
          />
        </div>
      </div>
    </div>
  );
};

export default RiskPanel;
