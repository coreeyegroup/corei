// src/components/Workspace/views/trading/DiagnosticsPanel.tsx
import React from 'react';
import { StatusGridPanel } from '../panels';
import type { HealthStatus } from '../../../../store/infrastructureStore';

const DiagnosticsPanel: React.FC = () => {
  return (
    <div className="panel-container">
      <h2>Diagnostics</h2>
      <div className="diagnostics-grid">
        <StatusGridPanel
          title="Trading Health"
          services={[
            { name: 'Trading Health', status: 'HEALTHY' as HealthStatus },
            { name: 'Data Feed', status: 'HEALTHY' as HealthStatus },
            { name: 'Execution Health', status: 'HEALTHY' as HealthStatus },
            { name: 'Broker Health', status: 'HEALTHY' as HealthStatus },
            { name: 'Event Logs', status: 'HEALTHY' as HealthStatus },
          ]}
        />
      </div>
    </div>
  );
};

export default DiagnosticsPanel;
