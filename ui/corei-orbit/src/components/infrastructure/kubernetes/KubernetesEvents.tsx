// src/components/infrastructure/kubernetes/KubernetesEvents.tsx
import React from 'react';
import { TablePanel } from '../../Workspace/views/panels';

interface KubernetesEventsProps {
  events: any[];
}

const KubernetesEvents: React.FC<KubernetesEventsProps> = ({ events }) => {
  const columns = [
    { key: 'namespace', label: 'Namespace' },
    { key: 'reason', label: 'Reason' },
    { key: 'message', label: 'Message' },
    { key: 'type', label: 'Type' },
    { key: 'age', label: 'Age' },
  ];

  return <TablePanel title="Cluster Events" columns={columns} data={events} />;
};

export default KubernetesEvents;
