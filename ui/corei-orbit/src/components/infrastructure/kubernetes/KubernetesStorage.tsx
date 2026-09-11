// src/components/infrastructure/kubernetes/KubernetesStorage.tsx
import React, { useState } from 'react';
import { TablePanel } from '../../Workspace/views/panels';

interface KubernetesStorageProps {
  pvs: any[];
  pvcs: any[];
  storageclasses: any[];
}

const KubernetesStorage: React.FC<KubernetesStorageProps> = ({ pvs, pvcs, storageclasses }) => {
  const [activeView, setActiveView] = useState<'pv' | 'pvc' | 'sc'>('pv');

  const pvColumns = [
    { key: 'name', label: 'Name' },
    { key: 'capacity', label: 'Capacity' },
    { key: 'accessModes', label: 'Access Modes' },
    { key: 'reclaimPolicy', label: 'Reclaim Policy' },
    { key: 'status', label: 'Status' },
    { key: 'claim', label: 'Claim' },
    { key: 'storageClass', label: 'StorageClass' },
    { key: 'age', label: 'Age' },
  ];

  const pvcColumns = [
    { key: 'name', label: 'Name' },
    { key: 'namespace', label: 'Namespace' },
    { key: 'status', label: 'Status' },
    { key: 'volume', label: 'Volume' },
    { key: 'storageClass', label: 'StorageClass' },
    { key: 'age', label: 'Age' },
  ];

  const scColumns = [
    { key: 'name', label: 'Name' },
    { key: 'provisioner', label: 'Provisioner' },
    { key: 'reclaimPolicy', label: 'Reclaim Policy' },
    { key: 'bindingMode', label: 'Binding Mode' },
    { key: 'allowExpansion', label: 'Allow Expansion' },
    { key: 'age', label: 'Age' },
  ];

  return (
    <div className="storage-tab">
      <div className="view-switcher" style={{ display: 'flex', gap: '8px', marginBottom: '12px', flexWrap: 'wrap' }}>
        {['pv', 'pvc', 'sc'].map((type) => (
          <button
            key={type}
            className={`btn ${activeView === type ? 'active' : ''}`}
            onClick={() => setActiveView(type as any)}
          >
            {type === 'pv' ? 'PersistentVolumes' : type === 'pvc' ? 'PVCs' : 'StorageClasses'}
          </button>
        ))}
      </div>

      {activeView === 'pv' && <TablePanel title="PersistentVolumes" columns={pvColumns} data={pvs} />}
      {activeView === 'pvc' && <TablePanel title="PersistentVolumeClaims" columns={pvcColumns} data={pvcs} />}
      {activeView === 'sc' && <TablePanel title="StorageClasses" columns={scColumns} data={storageclasses} />}
    </div>
  );
};

export default KubernetesStorage;
