// src/components/infrastructure/kubernetes/KubernetesServices.tsx
import React from 'react';
import { TablePanel } from '../../Workspace/views/panels';

interface KubernetesServicesProps {
  services: any[];
}

const KubernetesServices: React.FC<KubernetesServicesProps> = ({ services }) => {
  const columns = [
    { key: 'name', label: 'Name' },
    { key: 'namespace', label: 'Namespace' },
    { key: 'type', label: 'Type' },
    { key: 'cluster_ip', label: 'Cluster IP' },
    { key: 'ports', label: 'Ports' },
    { key: 'age', label: 'Age' },
  ];

  return <TablePanel title="Services" columns={columns} data={services} />;
};

export default KubernetesServices;
