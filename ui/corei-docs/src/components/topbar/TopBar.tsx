import React from 'react';

const TopBar: React.FC = () => {
  return (
    <header className="corei-top">
      <div style={{ display: 'flex', flexDirection: 'column', minWidth: '200px' }}>
        <div className="brand-mark">COREI</div>
        <div className="brand-sub">Institutional Knowledge System</div>
      </div>

      <div style={{ flex: 1, display: 'flex', justifyContent: 'center', gap: '12px' }}>
        <div className="top-search">⚡ Quick Command (Ctrl+K)</div>
        <div className="top-search">🔍 Search Knowledge...</div>
      </div>

      <div className="top-status">
        <div className="status-dot" />
        SYSTEM STATUS: <span style={{ color: 'var(--accent)' }}>OPERATIONAL</span>
      </div>
    </header>
  );
};

export default TopBar;
