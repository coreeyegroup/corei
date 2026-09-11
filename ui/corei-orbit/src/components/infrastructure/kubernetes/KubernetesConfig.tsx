// src/components/infrastructure/kubernetes/KubernetesConfig.tsx
import React, { useState } from 'react';
import { TablePanel } from '../../Workspace/views/panels';
import { OperationButton } from '../../shared';
import { executeOperation } from '../../../services/infrastructureService';
import { useInfrastructureStore } from '../../../store/infrastructureStore';

interface KubernetesConfigProps {
  configmaps: any[];
  secrets: any[];
  serviceaccounts: any[];
  roles: any[];
  rolebindings: any[];
  clusterroles: any[];
  clusterrolebindings: any[];
}

const KubernetesConfig: React.FC<KubernetesConfigProps> = ({
  configmaps,
  secrets,
  serviceaccounts,
  roles,
  rolebindings,
  clusterroles,
  clusterrolebindings,
}) => {
  const [activeView, setActiveView] = useState<'configmaps' | 'secrets' | 'serviceaccounts' | 'roles' | 'rolebindings' | 'clusterroles' | 'clusterrolebindings'>('configmaps');
  const { refresh } = useInfrastructureStore();
  const [opLoading, setOpLoading] = useState<string | null>(null);

  const handleDelete = async (kind: string, name: string, namespace: string = 'default') => {
    if (!window.confirm(`Are you sure you want to delete ${kind} ${name}?`)) return;
    setOpLoading(`delete-${kind}-${name}`);
    const result = await executeOperation('kubernetes', 'delete-resource', { kind, name, namespace });
    setOpLoading(null);
    if (result.success) refresh();
    else alert(`Delete failed: ${result.message}`);
  };

  const configmapColumns = [
    { key: 'name', label: 'Name' },
    { key: 'namespace', label: 'Namespace' },
    { key: 'data', label: 'Data Keys' },
    { key: 'age', label: 'Age' },
  ];

  const secretColumns = [
    { key: 'name', label: 'Name' },
    { key: 'namespace', label: 'Namespace' },
    { key: 'type', label: 'Type' },
    { key: 'hasData', label: 'Has Data' },
    { key: 'age', label: 'Age' },
  ];

  const saColumns = [
    { key: 'name', label: 'Name' },
    { key: 'namespace', label: 'Namespace' },
    { key: 'secrets', label: 'Secrets Count' },
    { key: 'age', label: 'Age' },
  ];

  const roleColumns = [
    { key: 'name', label: 'Name' },
    { key: 'namespace', label: 'Namespace' },
    { key: 'rules', label: 'Rules' },
    { key: 'age', label: 'Age' },
  ];

  const rbColumns = [
    { key: 'name', label: 'Name' },
    { key: 'namespace', label: 'Namespace' },
    { key: 'roleRef', label: 'RoleRef' },
    { key: 'subjects', label: 'Subjects' },
    { key: 'age', label: 'Age' },
  ];

  const crColumns = [
    { key: 'name', label: 'Name' },
    { key: 'rules', label: 'Rules' },
    { key: 'age', label: 'Age' },
  ];

  const crbColumns = [
    { key: 'name', label: 'Name' },
    { key: 'roleRef', label: 'RoleRef' },
    { key: 'subjects', label: 'Subjects' },
    { key: 'age', label: 'Age' },
  ];

  // Helper to render data field (truncate if needed)
  const renderData = (row: any) => {
    if (row.data && typeof row.data === 'object') {
      return Object.keys(row.data).join(', ');
    }
    return '—';
  };

  return (
    <div className="config-tab">
      <div className="view-switcher" style={{ display: 'flex', gap: '8px', marginBottom: '12px', flexWrap: 'wrap' }}>
        {['configmaps', 'secrets', 'serviceaccounts', 'roles', 'rolebindings', 'clusterroles', 'clusterrolebindings'].map((type) => (
          <button
            key={type}
            className={`btn ${activeView === type ? 'active' : ''}`}
            onClick={() => setActiveView(type as any)}
          >
            {type === 'configmaps' ? 'ConfigMaps' :
             type === 'secrets' ? 'Secrets' :
             type === 'serviceaccounts' ? 'ServiceAccounts' :
             type === 'rolebindings' ? 'RoleBindings' :
             type === 'clusterroles' ? 'ClusterRoles' :
             type === 'clusterrolebindings' ? 'ClusterRoleBindings' :
             type.charAt(0).toUpperCase() + type.slice(1)}
          </button>
        ))}
      </div>

      {activeView === 'configmaps' && (
        <TablePanel
          title="ConfigMaps"
          columns={configmapColumns}
          data={configmaps.map(cm => ({ ...cm, data: renderData(cm) }))}
          renderRow={(row, idx) => (
            <React.Fragment key={idx}>
              <tr>
                {configmapColumns.map(col => <td key={col.key}>{row[col.key]}</td>)}
              </tr>
              <tr>
                <td colSpan={configmapColumns.length} style={{ padding: '4px 8px', background: 'var(--bg-subtle, #1a1a1a)' }}>
                  <OperationButton
                    label="Delete"
                    icon="🗑️"
                    onClick={() => handleDelete('configmap', row.name, row.namespace)}
                    confirm
                    loading={opLoading === `delete-configmap-${row.name}`}
                  />
                </td>
              </tr>
            </React.Fragment>
          )}
        />
      )}

      {activeView === 'secrets' && (
        <TablePanel
          title="Secrets"
          columns={secretColumns}
          data={secrets}
          renderRow={(row, idx) => (
            <React.Fragment key={idx}>
              <tr>
                {secretColumns.map(col => <td key={col.key}>{row[col.key]}</td>)}
              </tr>
              <tr>
                <td colSpan={secretColumns.length} style={{ padding: '4px 8px', background: 'var(--bg-subtle, #1a1a1a)' }}>
                  <OperationButton
                    label="Delete"
                    icon="🗑️"
                    onClick={() => handleDelete('secret', row.name, row.namespace)}
                    confirm
                    loading={opLoading === `delete-secret-${row.name}`}
                  />
                </td>
              </tr>
            </React.Fragment>
          )}
        />
      )}

      {activeView === 'serviceaccounts' && (
        <TablePanel title="ServiceAccounts" columns={saColumns} data={serviceaccounts} />
      )}

      {activeView === 'roles' && (
        <TablePanel title="Roles" columns={roleColumns} data={roles} />
      )}

      {activeView === 'rolebindings' && (
        <TablePanel title="RoleBindings" columns={rbColumns} data={rolebindings} />
      )}

      {activeView === 'clusterroles' && (
        <TablePanel title="ClusterRoles" columns={crColumns} data={clusterroles} />
      )}

      {activeView === 'clusterrolebindings' && (
        <TablePanel title="ClusterRoleBindings" columns={crbColumns} data={clusterrolebindings} />
      )}
    </div>
  );
};

export default KubernetesConfig;
