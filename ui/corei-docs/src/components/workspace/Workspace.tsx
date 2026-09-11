import React from 'react';
import { FileText, X } from 'lucide-react';
import { useAppStore } from '../../core/state/app-state';

const Workspace: React.FC = () => {
  const { openTabs, activeTabId, setActiveTab, closeTab } = useAppStore();
  const activeDoc = openTabs.find(tab => tab.id === activeTabId);

  return (
    <main className="corei-center">
      {/* TABS - Now renders real tabs */}
      <div className="tab-bar">
        {openTabs.map(tab => (
          <div
            key={tab.id}
            className={`tab ${activeTabId === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            <FileText size={14} style={{ color: 'var(--accent)' }} />
            {tab.title}
            <X
              size={14}
              style={{ marginLeft: 'auto', cursor: 'pointer', color: 'var(--text-muted)' }}
              onClick={(e) => { e.stopPropagation(); closeTab(tab.id); }}
            />
          </div>
        ))}
      </div>

      {/* TOOLBAR / BREADCRUMBS */}
      <div className="toolbar">
        <div>
          COREI <span style={{ color: 'var(--text-muted)' }}>›</span> {activeDoc ? activeDoc.title : 'NO DOCUMENT'}
        </div>
        <div style={{ color: 'var(--accent)' }}>{activeDoc ? `ID: ${activeDoc.id}` : 'ID: N/A'}</div>
      </div>

      {/* CENTER BODY */}
      <div className="workspace-body">
        {activeDoc ? (
          <div style={{ maxWidth: '900px', margin: '0 auto', padding: '40px', width: '100%' }}>
            <h1 style={{ fontSize: '28px', marginBottom: '20px' }}>{activeDoc.title}</h1>
            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7' }}>
              {/* In the next step, this will render the actual Markdown content */}
              This is a real tab. It was opened from the Explorer.
            </p>
          </div>
        ) : (
          <span>Select a document from the Explorer to begin.</span>
        )}
      </div>
    </main>
  );
};

export default Workspace;
