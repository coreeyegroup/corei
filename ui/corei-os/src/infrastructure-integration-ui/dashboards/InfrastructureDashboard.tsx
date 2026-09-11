/**
 * COREI – Infrastructure Dashboard
 * Stage-25 / Phase-26
 * Enhanced with live status indicators and dynamic health visualization.
 */
import React, { useState, useEffect } from 'react';
import { useInfrastructureContext } from '../hooks/useInfrastructureContext';
import { useInfrastructureHealth } from '../hooks/useInfrastructureHealth';

const getStatusColor = (status: string): string => {
  switch (status) {
    case 'healthy': return '#52A36B';
    case 'degraded': return '#D1A64A';
    case 'critical': return '#B95A5A';
    case 'warning': return '#D1A64A';
    case 'offline': return '#6E7883';
    default: return '#6E7883';
  }
};

const getStatusDotClass = (status: string): string => {
  switch (status) {
    case 'healthy': return 'status-dot healthy';
    case 'degraded': return 'status-dot warning';
    case 'critical': return 'status-dot critical';
    case 'warning': return 'status-dot warning';
    default: return 'status-dot';
  }
};

export const InfrastructureDashboard: React.FC = () => {
  const context = useInfrastructureContext();
  const health = useInfrastructureHealth();
  const [currentTime, setCurrentTime] = useState(Date.now());

  // Update time every second for "last updated" display
  useEffect(() => {
    const interval = setInterval(() => setCurrentTime(Date.now()), 1000);
    return () => clearInterval(interval);
  }, []);

  const activeConnectors = context.connectors.filter(c => c.status === 'connected').length;

  return (
    <div className="infrastructure-dashboard" style={{ padding: '16px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <h3 style={{ color: '#E3E7EC', fontSize: '16px', fontWeight: 600, margin: 0 }}>Infrastructure Health</h3>
        <span style={{ fontSize: '11px', color: '#6E7883' }}>
          Updated {new Date(currentTime).toLocaleTimeString()}
        </span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px', marginBottom: '16px' }}>
        <div style={{ background: '#121821', borderRadius: '6px', padding: '12px', border: '1px solid #28303C' }}>
          <div style={{ fontSize: '10px', color: '#6E7883', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Overall Status</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px' }}>
            <span className={getStatusDotClass(health.overall)} style={{ display: 'inline-block' }} />
            <span style={{ fontSize: '20px', fontWeight: 600, color: getStatusColor(health.overall) }}>
              {health.overall.toUpperCase()}
            </span>
          </div>
        </div>
        <div style={{ background: '#121821', borderRadius: '6px', padding: '12px', border: '1px solid #28303C' }}>
          <div style={{ fontSize: '10px', color: '#6E7883', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Connections</div>
          <div style={{ fontSize: '20px', fontWeight: 600, color: '#E3E7EC', marginTop: '4px' }}>
            {activeConnectors} / {context.connectors.length}
          </div>
        </div>
        <div style={{ background: '#121821', borderRadius: '6px', padding: '12px', border: '1px solid #28303C' }}>
          <div style={{ fontSize: '10px', color: '#6E7883', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Integrations</div>
          <div style={{ fontSize: '20px', fontWeight: 600, color: '#E3E7EC', marginTop: '4px' }}>
            {context.integrations.length}
          </div>
        </div>
      </div>

      <div>
        <h4 style={{ color: '#9AA5B1', fontSize: '12px', marginBottom: '8px', fontWeight: 500 }}>
          Connectors
        </h4>
        {context.connectors.length === 0 ? (
          <div style={{ color: '#6E7883', fontSize: '13px' }}>No connectors registered.</div>
        ) : (
          context.connectors.map((connector) => (
            <div
              key={connector.id}
              className="connector-item"
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                background: '#0E1219',
                padding: '8px 12px',
                borderRadius: '4px',
                marginBottom: '4px',
                border: '1px solid #1E2834',
                transition: 'background 0.2s ease',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span className={getStatusDotClass(connector.health)} style={{ display: 'inline-block' }} />
                <span style={{ color: '#E3E7EC', fontSize: '13px' }}>{connector.name}</span>
                <span style={{ color: '#6E7883', fontSize: '11px' }}>{connector.type}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ color: '#9AA5B1', fontSize: '11px' }}>{connector.health}</span>
                <span style={{ color: '#6E7883', fontSize: '10px' }}>
                  {new Date(connector.lastCheck).toLocaleTimeString()}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
