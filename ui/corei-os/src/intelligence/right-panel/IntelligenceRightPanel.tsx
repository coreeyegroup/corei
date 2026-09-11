// src/intelligence/right-panel/IntelligenceRightPanel.tsx
import React, { useState, useEffect } from 'react';
import { useIntelligence } from './provider/intelligence-provider';
import { RightPanel } from './layout/right-panel';
import { Insight } from '../state/IntelligenceState';

// Helper to format relative time
const timeAgo = (timestamp: number): string => {
  const diff = Math.floor((Date.now() - timestamp) / 1000);
  if (diff < 10) return 'Just now';
  if (diff < 60) return `${diff}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  return `${Math.floor(diff / 3600)}h ago`;
};

export const IntelligenceRightPanel: React.FC = () => {
  const runtime = useIntelligence();
  const [insights, setInsights] = useState<Insight[]>([]);
  const [, forceUpdate] = useState(0);

  // Force re-render every 10 seconds to update timestamps
  useEffect(() => {
    const interval = setInterval(() => {
      forceUpdate(prev => prev + 1);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  // Sync with runtime state
  useEffect(() => {
    const update = () => {
      setInsights(runtime.getInsights());
    };
    update();
    // We rely on the runtime's internal updates, but we need a way to listen.
    // For simplicity, we poll every 2 seconds, or we could use a custom event.
    // Since we have `simulateData` updating the state, we need to reflect it.
    const interval = setInterval(update, 2000);
    return () => clearInterval(interval);
  }, [runtime]);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return '#B95A5A';
      case 'warning': return '#D1A64A';
      case 'info': return '#4A8BB5';
      default: return '#6E7883';
    }
  };

  return (
    <div className="intelligence-right-panel" style={{ padding: '12px', height: '100%', overflowY: 'auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
        <span style={{ fontSize: '14px', fontWeight: 600, color: '#E3E7EC' }}>Intelligence</span>
        <span style={{ fontSize: '11px', color: '#52A36B' }}>● Live</span>
      </div>
      {insights.length === 0 ? (
        <div style={{ color: '#6E7883', fontSize: '13px' }}>No insights yet.</div>
      ) : (
        insights.map((insight) => (
          <div
            key={insight.id}
            style={{
              borderLeft: `3px solid ${getSeverityColor(insight.severity)}`,
              background: '#121821',
              borderRadius: '4px',
              padding: '10px 12px',
              marginBottom: '8px',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{ fontWeight: 500, color: '#E3E7EC', fontSize: '13px' }}>
                {insight.message}
              </div>
              <span style={{ fontSize: '10px', color: '#6E7883', whiteSpace: 'nowrap', marginLeft: '8px' }}>
                {timeAgo(insight.timestamp)}
              </span>
            </div>
            <div style={{ fontSize: '11px', color: '#6E7883', marginTop: '4px' }}>
              {insight.type} · {insight.severity}
            </div>
          </div>
        ))
      )}
      <div style={{ marginTop: '12px', fontSize: '10px', color: '#3D4638', textAlign: 'right' }}>
        Updated {timeAgo(Date.now())}
      </div>
    </div>
  );
};

export default IntelligenceRightPanel;
