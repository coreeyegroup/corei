import React from 'react';

const StatusBar: React.FC = () => {
  return (
    <footer className="corei-status">
      <div style={{ display: 'flex', gap: '16px' }}>
        <span style={{ color: 'var(--accent)', fontWeight: 'bold' }}>COREI</span>
        <span>DOCUMENTS: 0</span>
        <span>READY</span>
      </div>
      <div>
        <span>v3.0.0</span>
      </div>
    </footer>
  );
};

export default StatusBar;
