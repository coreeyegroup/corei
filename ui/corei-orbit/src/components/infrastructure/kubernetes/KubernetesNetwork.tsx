// src/components/infrastructure/kubernetes/KubernetesNetwork.tsx
import React, { useState } from 'react';
import { TablePanel } from '../../Workspace/views/panels';

interface KubernetesNetworkProps {
  services: any[];
  endpoints: any[];
  ingresses: any[];
  networkpolicies: any[];
}

const KubernetesNetwork: React.FC<KubernetesNetworkProps> = ({
  services,
  endpoints,
  ingresses,
  networkpolicies,
}) => {
  const [activeView, setActiveView] = useState<'services' | 'endpoints' | 'ingress' | 'netpol'>('services');

  const serviceColumns = [
    { key: 'name', label: 'Name' },
    { key: 'namespace', label: 'Namespace' },
    { key: 'type', label: 'Type' },
    { key: 'cluster_ip', label: 'Cluster IP' },
    { key: 'ports', label: 'Ports' },
    { key: 'age', label: 'Age' },
  ];

  const endpointColumns = [
    { key: 'name', label: 'Name' },
    { key: 'namespace', label: 'Namespace' },
    { key: 'subsets', label: 'Subsets' },
    { key: 'age', label: 'Age' },
  ];

  const ingressColumns = [
    { key: 'name', label: 'Name' },
    { key: 'namespace', label: 'Namespace' },
    { key: 'hosts', label: 'Hosts' },
    { key: 'ingressClass', label: 'Ingress Class' },
    { key: 'age', label: 'Age' },
  ];

  const netpolColumns = [
    { key: 'name', label: 'Name' },
    { key: 'namespace', label: 'Namespace' },
    { key: 'podSelector', label: 'Pod Selector' },
    { key: 'policyTypes', label: 'Policy Types' },
    { key: 'age', label: 'Age' },
  ];

  return (
    <div className="network-tab">
      <div className="view-switcher" style={{ display: 'flex', gap: '8px', marginBottom: '12px', flexWrap: 'wrap' }}>
        {['services', 'endpoints', 'ingress', 'netpol'].map((type) => (
          <button
            key={type}
            className={`btn ${activeView === type ? 'active' : ''}`}
            onClick={() => setActiveView(type as any)}
          >
            {type === 'netpol' ? 'NetworkPolicies' : type.charAt(0).toUpperCase() + type.slice(1)}
          </button>
        ))}
      </div>

      {activeView === 'services' && <TablePanel title="Services" columns={serviceColumns} data={services} />}
      {activeView === 'endpoints' && <TablePanel title="Endpoints" columns={endpointColumns} data={endpoints} />}
      {activeView === 'ingress' && <TablePanel title="Ingress" columns={ingressColumns} data={ingresses} />}
      {activeView === 'netpol' && <TablePanel title="NetworkPolicies" columns={netpolColumns} data={networkpolicies} />}
    </div>
  );
};

export default KubernetesNetwork;
