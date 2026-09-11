// src/components/infrastructure/kubernetes/KubernetesAudit.tsx
import React, { useState, useEffect } from 'react';
import { TablePanel } from '../../Workspace/views/panels';

const API_BASE = import.meta.env.VITE_API_BASE_URL || '/api/v1';

const KubernetesAudit: React.FC = () => {
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAudit = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE}/audit`);
      if (!response.ok) throw new Error('Failed to fetch audit log');
      const data = await response.json();
      setLogs(data);
      setError(null);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAudit();
    const interval = setInterval(fetchAudit, 10000);
    return () => clearInterval(interval);
  }, []);

  const columns = [
    { key: 'timestamp', label: 'Time' },
    { key: 'operator', label: 'Operator' },
    { key: 'resource', label: 'Resource' },
    { key: 'action', label: 'Action' },
    { key: 'params', label: 'Parameters' },
    { key: 'result', label: 'Result' },
    { key: 'error', label: 'Error' },
  ];

  const data = logs.map(log => ({
    ...log,
    params: JSON.stringify(log.params || {}),
    error: log.error || '—',
  }));

  return (
    <div className="audit-tab">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
        <h3>Audit Log</h3>
        <button onClick={fetchAudit} disabled={loading}>⟳ Refresh</button>
      </div>
      {error && <div style={{ color: 'var(--red, #ef4444)' }}>Error: {error}</div>}
      {loading && <p>Loading audit log...</p>}
      {!loading && !error && <TablePanel title="" columns={columns} data={data} />}
    </div>
  );
};

export default KubernetesAudit;
