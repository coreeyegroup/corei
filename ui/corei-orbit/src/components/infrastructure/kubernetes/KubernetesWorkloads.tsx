// src/components/infrastructure/kubernetes/KubernetesWorkloads.tsx
import React, { useState } from 'react';
import { TablePanel } from '../../Workspace/views/panels';
import { OperationButton } from '../../shared';
import { executeOperation } from '../../../services/infrastructureService';
import { useInfrastructureStore } from '../../../store/infrastructureStore';

interface KubernetesWorkloadsProps {
  pods: any[];
  deployments: any[];
  statefulsets?: any[];
  daemonsets?: any[];
  jobs?: any[];
  cronjobs?: any[];
  onExecPod?: (pod: string, namespace: string, container?: string) => void;
}

const KubernetesWorkloads: React.FC<KubernetesWorkloadsProps> = ({
  pods,
  deployments,
  statefulsets = [],
  daemonsets = [],
  jobs = [],
  cronjobs = [],
  onExecPod,
}) => {
  const [activeView, setActiveView] = useState<'pods' | 'deployments' | 'statefulsets' | 'daemonsets' | 'jobs' | 'cronjobs'>('pods');
  const { refresh } = useInfrastructureStore();
  const [opLoading, setOpLoading] = useState<string | null>(null);

  const handleOperation = async (op: string, params: any) => {
    setOpLoading(op);
    const result = await executeOperation('kubernetes', op, params);
    setOpLoading(null);
    if (result.success) refresh();
    else alert(`Operation failed: ${result.message}`);
  };

  const podColumns = [
    { key: 'name', label: 'Name' },
    { key: 'namespace', label: 'Namespace' },
    { key: 'status', label: 'Status' },
    { key: 'ready', label: 'Ready' },
    { key: 'restarts', label: 'Restarts' },
    { key: 'age', label: 'Age' },
    { key: 'node', label: 'Node' },
    { key: 'ip', label: 'IP' },
    { key: 'cpu_usage', label: 'CPU' },
    { key: 'memory_usage', label: 'Memory' },
  ];

  const deploymentColumns = [
    { key: 'name', label: 'Name' },
    { key: 'namespace', label: 'Namespace' },
    { key: 'replicas', label: 'Replicas' },
    { key: 'ready', label: 'Ready' },
    { key: 'available', label: 'Available' },
    { key: 'updated', label: 'Updated' },
    { key: 'strategy', label: 'Strategy' },
    { key: 'revision', label: 'Revision' },
    { key: 'age', label: 'Age' },
  ];

  const statefulsetColumns = [
    { key: 'name', label: 'Name' },
    { key: 'namespace', label: 'Namespace' },
    { key: 'replicas', label: 'Replicas' },
    { key: 'ready', label: 'Ready' },
    { key: 'currentRevision', label: 'Current Revision' },
    { key: 'updateRevision', label: 'Update Revision' },
    { key: 'age', label: 'Age' },
  ];

  const daemonsetColumns = [
    { key: 'name', label: 'Name' },
    { key: 'namespace', label: 'Namespace' },
    { key: 'desired', label: 'Desired' },
    { key: 'current', label: 'Current' },
    { key: 'ready', label: 'Ready' },
    { key: 'available', label: 'Available' },
    { key: 'updated', label: 'Updated' },
    { key: 'age', label: 'Age' },
  ];

  const jobColumns = [
    { key: 'name', label: 'Name' },
    { key: 'namespace', label: 'Namespace' },
    { key: 'completions', label: 'Completions' },
    { key: 'succeeded', label: 'Succeeded' },
    { key: 'failed', label: 'Failed' },
    { key: 'active', label: 'Active' },
    { key: 'age', label: 'Age' },
  ];

  const cronjobColumns = [
    { key: 'name', label: 'Name' },
    { key: 'namespace', label: 'Namespace' },
    { key: 'schedule', label: 'Schedule' },
    { key: 'suspend', label: 'Suspend' },
    { key: 'lastScheduleTime', label: 'Last Schedule' },
    { key: 'lastSuccessfulTime', label: 'Last Success' },
    { key: 'age', label: 'Age' },
  ];

  // ─── Deployment rollout controls ──────────────────────────────────────
  const DeploymentActions = ({ deployment, namespace }: { deployment: string; namespace: string }) => (
    <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
      <OperationButton
        label="Restart"
        icon="🔄"
        onClick={() => handleOperation('rollout-restart', { deployment, namespace })}
        loading={opLoading === 'rollout-restart'}
      />
      <OperationButton
        label="Pause"
        icon="⏸️"
        onClick={() => handleOperation('rollout-pause', { deployment, namespace })}
        loading={opLoading === 'rollout-pause'}
      />
      <OperationButton
        label="Resume"
        icon="▶️"
        onClick={() => handleOperation('rollout-resume', { deployment, namespace })}
        loading={opLoading === 'rollout-resume'}
      />
      <OperationButton
        label="History"
        icon="📜"
        onClick={async () => {
          const result = await executeOperation('kubernetes', 'rollout-history', { deployment, namespace });
          if (result.success) alert(result.data?.history || 'No history found');
          else alert(`Error: ${result.message}`);
        }}
      />
      <OperationButton
        label="Rollback"
        icon="⏪"
        confirm
        onClick={async () => {
          const revision = prompt('Enter revision number to rollback to:');
          if (revision !== null) {
            handleOperation('rollout-undo', { deployment, namespace, revision: parseInt(revision, 10) });
          }
        }}
        loading={opLoading === 'rollout-undo'}
      />
    </div>
  );

  // ─── Pod actions (Exec) ──────────────────────────────────────────────
  const PodActions = ({ pod, namespace }: { pod: string; namespace: string }) => (
    <div style={{ display: 'flex', gap: '4px' }}>
      <button onClick={() => onExecPod?.(pod, namespace)}>Exec</button>
    </div>
  );

  return (
    <div className="workloads-tab">
      <div className="view-switcher" style={{ display: 'flex', gap: '8px', marginBottom: '12px', flexWrap: 'wrap' }}>
        {['pods', 'deployments', 'statefulsets', 'daemonsets', 'jobs', 'cronjobs'].map((type) => (
          <button
            key={type}
            className={`btn ${activeView === type ? 'active' : ''}`}
            onClick={() => setActiveView(type as any)}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </button>
        ))}
      </div>

      {activeView === 'pods' && (
        <TablePanel
          title="Pods"
          columns={[...podColumns, { key: '_actions', label: 'Actions' }]}
          data={pods}
          renderRow={(row, idx) => (
            <React.Fragment key={idx}>
              <tr>
                {podColumns.map(col => <td key={col.key}>{row[col.key]}</td>)}
                <td><PodActions pod={row.name} namespace={row.namespace} /></td>
              </tr>
            </React.Fragment>
          )}
        />
      )}

      {activeView === 'deployments' && (
        <TablePanel
          title="Deployments"
          columns={deploymentColumns}
          data={deployments}
          renderRow={(row, idx) => (
            <React.Fragment key={idx}>
              <tr>
                {deploymentColumns.map(col => <td key={col.key}>{row[col.key]}</td>)}
              </tr>
              <tr>
                <td colSpan={deploymentColumns.length} style={{ padding: '4px 8px', background: 'var(--bg-subtle, #1a1a1a)' }}>
                  <DeploymentActions deployment={row.name} namespace={row.namespace} />
                </td>
              </tr>
            </React.Fragment>
          )}
        />
      )}

      {activeView === 'statefulsets' && (
        <TablePanel title="StatefulSets" columns={statefulsetColumns} data={statefulsets} />
      )}

      {activeView === 'daemonsets' && (
        <TablePanel title="DaemonSets" columns={daemonsetColumns} data={daemonsets} />
      )}

      {activeView === 'jobs' && (
        <TablePanel title="Jobs" columns={jobColumns} data={jobs} />
      )}

      {activeView === 'cronjobs' && (
        <TablePanel title="CronJobs" columns={cronjobColumns} data={cronjobs} />
      )}
    </div>
  );
};

export default KubernetesWorkloads;
