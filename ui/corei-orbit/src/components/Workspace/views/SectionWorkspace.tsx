// src/components/Workspace/views/SectionWorkspace.tsx
import React from 'react';
import { useAppStore } from '../../../store/appStore';
import { DOMAIN_CONFIGS } from '../../../components/LeftSidebar/LeftSidebar';
import { useInfrastructureStore } from '../../../store/infrastructureStore';

interface SectionWorkspaceProps {
  domainId: string;
  sectionLabel: string;
}

const SectionWorkspace: React.FC<SectionWorkspaceProps> = ({ domainId, sectionLabel }) => {
  const { openTab } = useAppStore();
  const { services } = useInfrastructureStore();
  const config = DOMAIN_CONFIGS[domainId];

  if (!config) return <div className="view-placeholder">Section not found</div>;

  const section = config.sections.find((s) => s.label === sectionLabel);
  if (!section) return <div className="view-placeholder">Section not found</div>;

  const getStatusDot = (label: string) => {
    const map: Record<string, string> = {
      'postgresql': 'postgres',
      'timescaledb': 'timescaledb',
      'redis cluster': 'redis',
      'apache kafka': 'kafka',
      'kubernetes': 'kubernetes',
    };
    const serviceName = map[label.toLowerCase()];
    if (!serviceName) return null;
    const service = services.find((s) => s.name === serviceName.toUpperCase());
    if (!service) return null;
    const cls = service.status === 'HEALTHY' ? 'healthy'
      : service.status === 'DEGRADED' ? 'degraded'
      : service.status === 'OFFLINE' ? 'offline'
      : 'unknown';
    return <span className={`status-dot ${cls}`} />;
  };

  const handleItemClick = (item: { label: string }) => {
    if (domainId === 'infrastructure') {
      const sanitized = item.label.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      const tabId = `infra-${sanitized}`;
      openTab(tabId, `${item.label} Dashboard`, '🖥️');
    } else {
      console.log('Open item:', item.label);
    }
  };

  return (
    <div className="section-workspace">
      <div className="workspace-header">
        <h2>{sectionLabel}</h2>
        <span className="workspace-subtitle">{config.title} — Capability Overview</span>
      </div>
      <div className="item-grid">
        {section.items.map((item) => (
          <div
            key={item.label}
            className="item-card"
            onClick={() => handleItemClick(item)}
          >
            <span className="item-card-label">{item.label}</span>
            {getStatusDot(item.label)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SectionWorkspace;
