import React from 'react';
import { ChevronRight, ChevronDown, Folder, FolderOpen, FileText, Search } from 'lucide-react';
import { useAppStore } from '../../core/state/app-state';

const Explorer: React.FC = () => {
  const openDocument = useAppStore((state) => state.openDocument);
  const activeTabId = useAppStore((state) => state.activeTabId);

  // Mocking the data from the registry for now (Next step will inject 5014 docs)
  const mockDocs = [
    { id: 'COREI-AR-03.04', title: 'Knowledge Architecture' },
    { id: 'COREI-STD-01.02', title: 'Naming Standard' },
  ];

  return (
    <div className="corei-explorer">
      <div className="explorer-header">EXPLORER</div>
      <div className="explorer-search">
        <Search size={12} />
        <span>Filter in explorer...</span>
      </div>
      <div className="explorer-body">
        <div className="tree-row">
          <ChevronDown size={12} />
          <FolderOpen size={14} style={{ color: 'var(--accent)' }} />
          <span>COREI Knowledge Centre</span>
        </div>

        {/* Clickable file items */}
        {mockDocs.map((doc) => (
          <div
            key={doc.id}
            className={`tree-row ${activeTabId === doc.id ? 'active' : ''}`}
            style={{ paddingLeft: '24px' }}
            onClick={() => openDocument(doc)}
          >
            <FileText size={14} />
            <span>{doc.title}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Explorer;
