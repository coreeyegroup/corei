// src/components/Workspace/views/trading/StrategyIntelligence.tsx
import React from 'react';
import { StatusGridPanel } from '../panels';
import type { HealthStatus } from '../../../../store/infrastructureStore';

const StrategyIntelligence: React.FC = () => {
  return (
    <div className="panel-container">
      <h2>Strategy Intelligence</h2>
      <div className="strategy-grid">
        <div className="strategy-section">
          <h3>Engine</h3>
          <StatusGridPanel
            title="Strategy Status"
            services={[
              { name: 'Strategy Engine', status: 'HEALTHY' as HealthStatus },
              { name: 'Registry', status: 'HEALTHY' as HealthStatus },
              { name: 'Runtime', status: 'HEALTHY' as HealthStatus },
            ]}
          />
        </div>
        <div className="strategy-section">
          <h3>Performance</h3>
          <StatusGridPanel
            title="Signal & Allocation"
            services={[
              { name: 'Signals', status: 'HEALTHY' as HealthStatus },
              { name: 'Allocations', status: 'HEALTHY' as HealthStatus },
              { name: 'Performance', status: 'HEALTHY' as HealthStatus },
            ]}
          />
        </div>
      </div>
    </div>
  );
};

export default StrategyIntelligence;
