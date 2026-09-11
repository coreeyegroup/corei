import React from 'react';

interface NavigationProps {
  activeView: string;
  onViewChange: (view: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ activeView, onViewChange }) => {
  // Group items with sub‑items
  const navGroups = [
    { id: 'terminal', label: 'Terminal', icon: '📈' },
    { id: 'market', label: 'Market Intel', icon: '📊' },
    { id: 'instruments', label: 'Instruments', icon: '🔍' },
    {
      id: 'execution',
      label: 'Execution',
      icon: '⚡',
      children: [
        { id: 'execution', label: 'Executions' },
        { id: 'orders', label: 'Orders' },
        { id: 'logs', label: 'Execution Logs' },
      ],
    },
    { id: 'positions', label: 'Positions', icon: '◘' },
    { id: 'portfolio', label: 'Portfolio', icon: '💼' },
    {
      id: 'risk',
      label: 'Risk',
      icon: '🛡️',
      children: [
        { id: 'risk', label: 'Overview' },
        { id: 'exposure', label: 'Exposure' },
        { id: 'limits', label: 'Limits' },
        { id: 'controls', label: 'Controls' },
      ],
    },
    { id: 'broker', label: 'Broker Intel', icon: '🏦' },
    { id: 'strategy', label: 'Strategy', icon: '🧠' },
    { id: 'governance', label: 'Governance', icon: '⚖️' },
    { id: 'diagnostics', label: 'Diagnostics', icon: '🔬' },
  ];

  return (
    <nav className="trading-nav">
      {navGroups.map((group) => (
        <div key={group.id}>
          <button
            className={`nav-item ${activeView === group.id ? 'active' : ''}`}
            onClick={() => onViewChange(group.id)}
          >
            <span className="nav-icon">{group.icon}</span>
            <span className="nav-label">{group.label}</span>
          </button>
          {group.children && (
            <div className="nav-children">
              {group.children.map((child) => (
                <button
                  key={child.id}
                  className={`nav-item child ${activeView === child.id ? 'active' : ''}`}
                  onClick={() => onViewChange(child.id)}
                >
                  <span className="nav-icon" style={{ width: 20 }} />
                  <span className="nav-label">{child.label}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      ))}
    </nav>
  );
};

export default Navigation;
