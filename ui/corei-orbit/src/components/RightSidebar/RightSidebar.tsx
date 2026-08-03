// src/components/RightSidebar/RightSidebar.tsx
import React from 'react';
import StrategyParams from './StrategyParams';
import './RightSidebar.css';

const RightSidebar: React.FC = () => {
  return (
    <aside className="right-sidebar">
      <div className="sidebar-header">Properties</div>
      <div className="sidebar-content">
        <div className="prop-section">
          <div className="prop-label">Selected Item</div>
          <div className="prop-value">No selection</div>
        </div>
        <div className="prop-divider"></div>
        <StrategyParams />
        <div className="prop-divider"></div>
        <div className="prop-section">
          <div className="prop-label">Quick Stats</div>
          <div className="stat-row"><span>Active Strategies</span><span className="stat-value green">4</span></div>
          <div className="stat-row"><span>Open Positions</span><span className="stat-value">12</span></div>
          <div className="stat-row"><span>Drawdown</span><span className="stat-value amber">-2.4%</span></div>
        </div>
      </div>
    </aside>
  );
};

export default RightSidebar;
