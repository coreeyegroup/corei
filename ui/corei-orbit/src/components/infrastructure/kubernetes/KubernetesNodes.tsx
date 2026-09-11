// src/components/infrastructure/kubernetes/KubernetesNodes.tsx
import React, { useState } from 'react';
import { TablePanel, StatusGridPanel } from '../../Workspace/views/panels';
import { OperationButton } from '../../shared';
import { executeOperation } from '../../../services/infrastructureService';
import { useInfrastructureStore } from '../../../store/infrastructureStore';

interface KubernetesNodesProps {
  nodes: any[];
}

const KubernetesNodes: React.FC<KubernetesNodesProps> = ({ nodes }) => {
  const { refresh } = useInfrastructureStore();
  const [expandedNode, setExpandedNode] = useState<string | null>(null);
  const [opLoading, setOpLoading] = useState<string | null>(null);

  const handleNodeOp = async (node: string, op: string) => {
    setOpLoading(`${node}-${op}`);
    const result = await executeOperation('kubernetes', op, { node });
    setOpLoading(null);
    if (result.success) refresh();
    else alert(`Operation failed: ${result.message}`);
  };

  const nodeColumns = [
    { key: 'name', label: 'Name' },
    { key: 'role', label: 'Role' },
    { key: 'status', label: 'Status' },
    { key: 'internal_ip', label: 'Internal IP' },
    { key: 'version', label: 'Version' },
    { key: 'cpu_usage', label: 'CPU Usage' },
    { key: 'memory_usage', label: 'Memory Usage' },
    { key: 'age', label: 'Age' },
  ];

  // Convert nodes to table data with expandable rows
  const nodeData = nodes.map(n => ({
    ...n,
    _expanded: expandedNode === n.name,
    _onExpand: () => setExpandedNode(expandedNode === n.name ? null : n.name),
    _actions: (
      <div style={{ display: 'flex', gap: '4px' }}>
        <OperationButton
          label="Cordon"
          icon="⛔"
          onClick={() => handleNodeOp(n.name, 'cordon')}
          confirm
          loading={opLoading === `${n.name}-cordon`}
        />
        <OperationButton
          label="Uncordon"
          icon="✅"
          onClick={() => handleNodeOp(n.name, 'uncordon')}
          loading={opLoading === `${n.name}-uncordon`}
        />
        <OperationButton
          label="Drain"
          icon="💧"
          onClick={() => handleNodeOp(n.name, 'drain')}
          confirm
          loading={opLoading === `${n.name}-drain`}
        />
      </div>
    ),
    _expandedContent: (
      <div style={{ padding: '12px', background: 'var(--bg-subtle, #1a1a1a)', borderRadius: '4px' }}>
        <div><strong>Capacity:</strong> CPU {n.capacity?.cpu || '—'}, Memory {n.capacity?.memory || '—'}</div>
        <div><strong>Allocatable:</strong> CPU {n.allocatable?.cpu || '—'}, Memory {n.allocatable?.memory || '—'}</div>
        <div><strong>Conditions:</strong> {n.conditions?.map((c: any) => `${c.type}: ${c.status}`).join(', ') || '—'}</div>
        <div><strong>Taints:</strong> {n.taints?.map((t: any) => `${t.key}=${t.value}:${t.effect}`).join(', ') || 'None'}</div>
        <div><strong>OS Image:</strong> {n.os_image || '—'}</div>
        <div><strong>Kernel:</strong> {n.kernel_version || '—'}</div>
        <div><strong>Container Runtime:</strong> {n.container_runtime || '—'}</div>
      </div>
    ),
  }));

  return (
    <div className="nodes-tab">
      <div style={{ marginBottom: '16px' }}>
        <StatusGridPanel title="Node Status Overview" services={nodes.map(n => ({ name: n.name, status: n.status }))} />
      </div>
      <TablePanel
        title="Node Inventory"
        columns={[...nodeColumns, { key: '_actions', label: 'Operations' }]}
        data={nodeData}
        // We'll handle expandable rows by adding a custom render for the name column
        renderRow={(row: any) => (
          <React.Fragment key={row.name}>
            <tr>
              {nodeColumns.map(col => (
                <td key={col.key}>{row[col.key]}</td>
              ))}
              <td>{row._actions}</td>
            </tr>
            {row._expanded && (
              <tr>
                <td colSpan={nodeColumns.length + 1}>
                  {row._expandedContent}
                </td>
              </tr>
            )}
          </React.Fragment>
        )}
      />
      <div style={{ marginTop: '8px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
        Click on a node name to expand details.
      </div>
    </div>
  );
};

export default KubernetesNodes;
