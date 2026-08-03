// src/components/Workspace/views/Workflows.tsx
import React from 'react';
import { useN8nStore } from '../../../services/n8nService';

const Workflows: React.FC = () => {
  const state = useN8nStore((state) => state.state);
  const nodes = [
    { id: 1, label: 'Binance Webhook', icon: '📡', status: 'success' },
    { id: 2, label: 'RSI Indicator', icon: '📊', status: 'success' },
    { id: 3, label: 'Risk Calculator', icon: '⚖️', status: state === 'running' ? 'idle' : 'error' },
    { id: 4, label: 'Broker Execution', icon: '🏦', status: state === 'running' ? 'success' : 'error' },
  ];

  const statusColor = {
    success: 'var(--accent-teal)',
    error: 'var(--danger-red)',
    idle: 'var(--text-muted)',
  };

  return (
    <div className="view-container">
      <h2 className="view-title">◈ Workflow Pipeline</h2>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', background: 'var(--bg-secondary)', padding: 12, borderRadius: 4 }}>
        {nodes.map((node, idx) => (
          <React.Fragment key={node.id}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              background: 'var(--bg-input)',
              padding: '6px 12px',
              borderRadius: 4,
              borderLeft: `3px solid ${statusColor[node.status as keyof typeof statusColor]}`,
            }}>
              <span>{node.icon}</span>
              <span style={{ fontSize: 12, fontWeight: 500 }}>{node.label}</span>
            </div>
            {idx < nodes.length - 1 && <span style={{ color: 'var(--text-muted)' }}>→</span>}
          </React.Fragment>
        ))}
      </div>
      <div style={{ marginTop: 16, fontSize: 12, color: 'var(--text-muted)' }}>
        Workflow state: <strong style={{ color: 'var(--text-primary)' }}>{state.toUpperCase()}</strong>
      </div>
    </div>
  );
};

export default Workflows;
