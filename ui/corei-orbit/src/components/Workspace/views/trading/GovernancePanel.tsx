// src/components/Workspace/views/trading/GovernancePanel.tsx
import React from 'react';
import { StatusGridPanel } from '../panels';
import type { HealthStatus } from '../../../../store/infrastructureStore';

const GovernancePanel: React.FC = () => {
  return (
    <div className="panel-container">
      <h2>Governance</h2>
      <div className="governance-grid">
        <StatusGridPanel
          title="Policies & Controls"
          services={[
            { name: 'Trading Policies', status: 'HEALTHY' as HealthStatus },
            { name: 'Approvals', status: 'HEALTHY' as HealthStatus },
            { name: 'Overrides', status: 'HEALTHY' as HealthStatus },
            { name: 'Exceptions', status: 'HEALTHY' as HealthStatus },
            { name: 'Audit', status: 'HEALTHY' as HealthStatus },
          ]}
        />
      </div>
    </div>
  );
};

export default GovernancePanel;
