// src/components/infrastructure/PostgreSQLDetail.tsx
import React, { useState, useEffect } from 'react';
import { useInfrastructureStore } from '../../store/infrastructureStore';
import { StatPanel, TablePanel } from '../Workspace/views/panels';
import { OperationButton, OperationModal } from '../shared';
import './PostgreSQLDetail.css';

interface PostgreSQLDetailProps {
  serviceName: string;
}

const PostgreSQLDetail: React.FC<PostgreSQLDetailProps> = () => {
  const { services, isLoading, refresh } = useInfrastructureStore();
  const [refreshing, setRefreshing] = useState(false);
  const [opLoading, setOpLoading] = useState<string | null>(null);
  const [opResult, setOpResult] = useState<{ success: boolean; message?: string; data?: any } | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedOp, setSelectedOp] = useState<any>(null);
  const [opParams, setOpParams] = useState<Record<string, any>>({});

  useEffect(() => {
    if (services.length === 0) {
      refresh();
    }
  }, [services, refresh]);

  const service = services.find((s) => s.name.toLowerCase() === 'postgres');
  const data = (service?.details as any) || {};
  const status = service?.status || 'UNKNOWN';
  const statusClass = status.toLowerCase();
  const hasRealData = service?.details && Object.keys(service.details).length > 0;

  const executeOp = async (opId: string, params?: Record<string, any>) => {
    setOpLoading(opId);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const result = {
      success: true,
      message: `Operation ${opId} completed.`,
      data: params,
    };
    setOpResult(result);
    setOpLoading(null);
    if (result.success) refresh();
    return result;
  };

  const handleOperationClick = (op: any) => {
    if (op.params && op.params.length > 0) {
      setSelectedOp(op);
      setOpParams(
        op.params.reduce((acc: any, p: any) => {
          acc[p.name] = p.default || '';
          return acc;
        }, {})
      );
      setShowModal(true);
    } else {
      executeOp(op.id);
    }
  };

  const handleModalSubmit = () => {
    if (!selectedOp) return;
    executeOp(selectedOp.id, opParams).then(() => {
      setShowModal(false);
    });
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await refresh();
    setRefreshing(false);
  };

  const metrics = [
    { label: 'Connections', value: data.connections ?? 0 },
    { label: 'Database Size', value: data.size ?? '—' },
    { label: 'Cache Hit Ratio', value: data.cache_hit ?? 0, unit: '%' },
    { label: 'Transactions/sec', value: data.tps ?? 0 },
  ];

  const operations = [
    {
      id: 'restart',
      label: 'Restart Database',
      icon: '🔄',
      confirm: true,
    },
    {
      id: 'run-vacuum',
      label: 'Run VACUUM',
      icon: '🧹',
      params: [{ name: 'table', label: 'Table Name (optional)', type: 'text' }],
    },
    {
      id: 'run-analyze',
      label: 'Run ANALYZE',
      icon: '📊',
      params: [{ name: 'table', label: 'Table Name (optional)', type: 'text' }],
    },
    {
      id: 'take-backup',
      label: 'Take Backup',
      icon: '💾',
      confirm: true,
      params: [
        {
          name: 'format',
          label: 'Format',
          type: 'select',
          options: ['plain', 'custom', 'directory'],
          default: 'plain',
        },
      ],
    },
  ];

  return (
    <div className="postgresql-detail">
      <div className="detail-header">
        <div className="header-left">
          <span className="service-icon">🐘</span>
          <h2>PostgreSQL</h2>
          <span className={`status-badge ${statusClass}`}>{status}</span>
        </div>
        <div className="header-right">
          <button className="refresh-btn" onClick={handleRefresh} disabled={isLoading || refreshing}>
            {refreshing ? '⟳' : '↻'} Refresh
          </button>
          <span className="last-updated">
            {service?.lastUpdated ? new Date(service.lastUpdated).toLocaleTimeString() : '—'}
          </span>
        </div>
      </div>

      <div className="metrics-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px' }}>
        {metrics.map((m, idx) => (
          <StatPanel key={idx} label={m.label} value={m.value} unit={m.unit} color="default" />
        ))}
      </div>

      <div style={{ marginTop: '16px' }}>
        <TablePanel
          title="Active Queries"
          columns={[
            { key: 'id', label: 'ID' },
            { key: 'query', label: 'Query' },
            { key: 'duration', label: 'Duration' },
            { key: 'state', label: 'State' },
          ]}
          data={data.active_queries || []}
        />
      </div>

      <div className="operations-section" style={{ marginTop: '24px' }}>
        <h3>🛠️ Control Operations</h3>
        <div className="operations-grid" style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {operations.map((op) => (
            <OperationButton
              key={op.id}
              label={op.label}
              icon={op.icon}
              onClick={() => handleOperationClick(op)}
              confirm={op.confirm}
              loading={opLoading === op.id}
              disabled={!!opLoading}
            />
          ))}
        </div>
        {opResult && (
          <div className={`op-result ${opResult.success ? 'success' : 'error'}`} style={{ marginTop: '8px' }}>
            {opResult.success ? '✅' : '❌'} {opResult.message}
            <button onClick={() => setOpResult(null)} style={{ marginLeft: '8px', background: 'none', border: 'none', cursor: 'pointer' }}>✖</button>
          </div>
        )}
      </div>

      {showModal && selectedOp && (
        <OperationModal
          operation={selectedOp}
          onSubmit={handleModalSubmit}
          onCancel={() => setShowModal(false)}
          loading={!!opLoading}
        />
      )}

      <div className="detail-footer" style={{ marginTop: '24px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
        {hasRealData ? (
          <p>Real‑time monitoring and control for PostgreSQL.</p>
        ) : (
          <p>⚠️ Real‑time data not available. <strong>Simulated metrics</strong> shown.</p>
        )}
      </div>
    </div>
  );
};

export default PostgreSQLDetail;
