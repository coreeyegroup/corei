import React from 'react';
import { ExternalLink, Link as LinkIcon } from 'lucide-react';
import { useAppStore } from '../../core/state/app-state';

const RightPanel: React.FC = () => {
  const activeTabId = useAppStore((state) => state.activeTabId);
  const isActive = activeTabId === 'COREI-AR-03.04'; // Temporary check for mock data

  return (
    <aside className="corei-right">
      <div className="panel-section">
        <div className="panel-title">DOCUMENT INFORMATION</div>
        {isActive ? (
          <>
            <div className="meta-item">
              <span className="meta-label">Document ID</span>
              <span className="meta-value" style={{ color: 'var(--accent)' }}>COREI-AR-03.04</span>
            </div>
            <div className="meta-item">
              <span className="meta-label">Domain</span>
              <span className="meta-value">ARCHITECTURE</span>
            </div>
            <div className="meta-item">
              <span className="meta-label">Status</span>
              <span className="meta-value">APPROVED</span>
            </div>
          </>
        ) : (
          <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>No active document.</div>
        )}
      </div>

      <div className="panel-section">
        <div className="panel-title">QUICK ACTIONS</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '12px', color: 'var(--text-secondary)' }}>
            <ExternalLink size={14} /> Open in New Tab
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '12px', color: 'var(--text-secondary)' }}>
            <LinkIcon size={14} /> Copy Document Link
          </div>
        </div>
      </div>
    </aside>
  );
};

export default RightPanel;
