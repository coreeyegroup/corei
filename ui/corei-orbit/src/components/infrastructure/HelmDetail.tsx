// src/components/infrastructure/HelmDetail.tsx
import React, { useState, useEffect } from 'react';
import { useInfrastructureStore } from '../../store/infrastructureStore';
import { TablePanel } from '../Workspace/views/panels';
import { OperationButton, OperationModal } from '../shared';
import { executeOperation } from '../../services/infrastructureService';
import './HelmDetail.css';

// ─── Inline Tabs (same as KubernetesDetail) ──────────────────────────
interface TabsProps {
  activeTab: string;
  onChange: (tab: string) => void;
  children: React.ReactNode;
}

const Tabs: React.FC<TabsProps> = ({ activeTab, onChange, children }) => {
  return (
    <div className="tabs">
      {React.Children.map(children, (child) => {
        if (React.isValidElement<TabProps>(child) && child.type === Tab) {
          const tabValue = child.props.value || child.props.label;
          return React.cloneElement(child, {
            active: activeTab === tabValue,
            onClick: () => onChange(tabValue),
          });
        }
        return child;
      })}
    </div>
  );
};

interface TabProps {
  label: string;
  value?: string;
  active?: boolean;
  onClick?: () => void;
}

const Tab: React.FC<TabProps> = ({ label, active, onClick }) => {
  return (
    <button className={`tab ${active ? 'active' : ''}`} onClick={onClick}>
      {label}
    </button>
  );
};
// ──────────────────────────────────────────────────────────────────────

interface HelmDetailProps {
  serviceName: string;
}

const HelmDetail: React.FC<HelmDetailProps> = () => {
  const { services, isLoading, refresh } = useInfrastructureStore();
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedRelease, setSelectedRelease] = useState<string | null>(null);
  const [selectedNamespace, setSelectedNamespace] = useState<string>('default');
  const [releaseDetails, setReleaseDetails] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);
  const [modalOperation, setModalOperation] = useState<any>(null);
  const [modalParams, setModalParams] = useState<Record<string, any>>({});
  const [opLoading, setOpLoading] = useState<string | null>(null);

  useEffect(() => {
    if (services.length === 0) {
      refresh();
    }
  }, [services, refresh]);

  const service = services.find((s) => s.name.toLowerCase() === 'kubernetes');
  const helmData = (service?.details as any)?.helm || { releases: [] };
  const releases = helmData.releases || [];

  const fetchReleaseDetails = async (_name: string, _namespace: string) => {
    // For now, mock details; in production, call a new endpoint.
    const mockDetails = {
      values: 'replicaCount: 1\nimage: nginx\nservice:\n  port: 80',
      manifest: 'apiVersion: apps/v1\nkind: Deployment\n...',
      history: [
        { revision: 1, status: 'deployed', chart: 'nginx-1.2.3', app_version: '1.2.3', description: 'Install', updated: '2023-01-01T00:00:00Z' },
        { revision: 2, status: 'deployed', chart: 'nginx-1.2.4', app_version: '1.2.4', description: 'Upgrade', updated: '2023-01-02T00:00:00Z' },
      ],
    };
    setReleaseDetails(mockDetails);
  };

  const handleSelectRelease = (name: string, namespace: string) => {
    setSelectedRelease(name);
    setSelectedNamespace(namespace);
    fetchReleaseDetails(name, namespace);
    setActiveTab('details');
  };

  const handleOperationClick = (op: any) => {
    setModalOperation(op);
    setModalParams(op.params?.reduce((acc: any, p: any) => {
      acc[p.name] = p.default || '';
      return acc;
    }, {}) || {});
    setShowModal(true);
  };

  const handleModalSubmit = async () => {
    if (!modalOperation) return;
    setOpLoading(modalOperation.id);
    const result = await executeOperation('helm', modalOperation.id, modalParams);
    setOpLoading(null);
    setShowModal(false);
    if (result.success) refresh();
    else alert(`Operation failed: ${result.message}`);
  };

  const operations = [
    {
      id: 'install',
      label: 'Install Chart',
      icon: '📦',
      params: [
        { name: 'chart', label: 'Chart Name', type: 'text', required: true },
        { name: 'name', label: 'Release Name', type: 'text', required: true },
        { name: 'namespace', label: 'Namespace', type: 'text', default: 'default' },
        { name: 'values', label: 'Values (YAML)', type: 'text' },
      ],
    },
    {
      id: 'upgrade',
      label: 'Upgrade Release',
      icon: '⬆️',
      params: [
        { name: 'name', label: 'Release Name', type: 'text', required: true },
        { name: 'namespace', label: 'Namespace', type: 'text', default: 'default' },
        { name: 'values', label: 'New Values (YAML)', type: 'text' },
      ],
    },
    {
      id: 'rollback',
      label: 'Rollback Release',
      icon: '⏪',
      params: [
        { name: 'name', label: 'Release Name', type: 'text', required: true },
        { name: 'namespace', label: 'Namespace', type: 'text', default: 'default' },
        { name: 'revision', label: 'Revision Number', type: 'number', required: true },
      ],
    },
    {
      id: 'uninstall',
      label: 'Uninstall Release',
      icon: '🗑️',
      confirm: true,
      params: [
        { name: 'name', label: 'Release Name', type: 'text', required: true },
        { name: 'namespace', label: 'Namespace', type: 'text', default: 'default' },
      ],
    },
  ];

  const releaseColumns = [
    { key: 'name', label: 'Name' },
    { key: 'namespace', label: 'Namespace' },
    { key: 'chart', label: 'Chart' },
    { key: 'app_version', label: 'App Version' },
    { key: 'status', label: 'Status' },
    { key: 'revision', label: 'Revision' },
    { key: 'updated', label: 'Updated' },
  ];

  const historyColumns = [
    { key: 'revision', label: 'Revision' },
    { key: 'status', label: 'Status' },
    { key: 'chart', label: 'Chart' },
    { key: 'app_version', label: 'App Version' },
    { key: 'description', label: 'Description' },
    { key: 'updated', label: 'Updated' },
  ];

  return (
    <div className="helm-detail">
      <div className="detail-header">
        <div className="header-left">
          <span className="service-icon">⛵</span>
          <h2>Helm Control</h2>
        </div>
        <div className="header-right">
          <button className="refresh-btn" onClick={refresh} disabled={isLoading}>
            {isLoading ? '⟳' : '↻'} Refresh
          </button>
        </div>
      </div>

      <div className="tabs-container">
        <Tabs activeTab={activeTab} onChange={setActiveTab}>
          <Tab label="Releases" value="overview" />
          <Tab label="Details" value="details" />
          <Tab label="Operations" value="ops" />
        </Tabs>
      </div>

      <div className="tab-content">
        {activeTab === 'overview' && (
          <div>
            <TablePanel
              title="Helm Releases"
              columns={releaseColumns}
              data={releases}
              renderRow={(row, idx) => (
                <tr key={idx} style={{ cursor: 'pointer' }} onClick={() => handleSelectRelease(row.name, row.namespace)}>
                  {releaseColumns.map(col => <td key={col.key}>{row[col.key]}</td>)}
                </tr>
              )}
            />
            <div style={{ marginTop: '8px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Click a release to view details.
            </div>
          </div>
        )}

        {activeTab === 'details' && selectedRelease && releaseDetails && (
          <div>
            <h3>{selectedRelease} ({selectedNamespace})</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <h4>Values</h4>
                <pre style={{ background: '#1a1a1a', padding: '8px', borderRadius: '4px', maxHeight: '200px', overflow: 'auto' }}>
                  {releaseDetails.values || 'No values'}
                </pre>
              </div>
              <div>
                <h4>Manifest</h4>
                <pre style={{ background: '#1a1a1a', padding: '8px', borderRadius: '4px', maxHeight: '300px', overflow: 'auto' }}>
                  {releaseDetails.manifest || 'No manifest'}
                </pre>
              </div>
              <div>
                <h4>History</h4>
                <TablePanel title="" columns={historyColumns} data={releaseDetails.history || []} />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'details' && !selectedRelease && (
          <p>Select a release from the Releases tab.</p>
        )}

        {activeTab === 'ops' && (
          <div>
            <h3>Helm Operations</h3>
            <div className="operations-grid" style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {operations.map((op) => (
                <OperationButton
                  key={op.id}
                  label={op.label}
                  icon={op.icon}
                  onClick={() => handleOperationClick(op)}
                  confirm={op.confirm}
                  loading={opLoading === op.id}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {showModal && modalOperation && (
        <OperationModal
          operation={modalOperation}
          onSubmit={handleModalSubmit}
          onCancel={() => setShowModal(false)}
          loading={!!opLoading}
        />
      )}
    </div>
  );
};

export default HelmDetail;
