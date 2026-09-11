// src/components/Workspace/views/panels/StatusGridPanel.tsx
import React from 'react';

interface ServiceStatus {
  name: string;
  status: 'HEALTHY' | 'DEGRADED' | 'OFFLINE' | 'UNKNOWN';
}

interface StatusGridPanelProps {
  title?: string;
  services: ServiceStatus[];
}

const StatusGridPanel: React.FC<StatusGridPanelProps> = ({ title, services }) => {
  const getStatusDot = (status: string) => {
    const cls = status.toLowerCase();
    return <span className={`status-dot ${cls}`} />;
  };

  return (
    <div className="panel status-grid-panel">
      {title && <span className="panel-title">{title}</span>}
      <div className="status-grid">
        {services.map((svc) => (
          <div key={svc.name} className="status-item">
            {getStatusDot(svc.status)}
            <span className="status-name">{svc.name}</span>
            <span className="status-value">{svc.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatusGridPanel;
