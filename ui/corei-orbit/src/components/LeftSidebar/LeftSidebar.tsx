// src/components/LeftSidebar/LeftSidebar.tsx
import React from 'react';
import { useAppStore } from '../../store/appStore';
import type { View } from '../../store/appStore';
import './LeftSidebar.css';

const LeftSidebar: React.FC = () => {
  const { activeTabId, openTab, expandedFolders, toggleFolder } = useAppStore();

  const menuItems: { id: View; label: string; icon: string }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: '◆' },
    { id: 'workflows', label: 'Workflows', icon: '◈' },
    { id: 'scanner', label: 'Market Scanner', icon: '◉' },
    { id: 'positions', label: 'Positions', icon: '◘' },
    { id: 'logs', label: 'Execution Logs', icon: '⎚' },
    { id: 'depth', label: 'Depth Chart', icon: '📚' },
    { id: 'request', label: 'Request Builder', icon: '📨' },
  ];

  return (
    <aside className="left-sidebar">
      <div className="sidebar-header">Explorer</div>
      <div className="sidebar-content">
        {menuItems.map((item) => (
          <div
            key={item.id}
            className={`sidebar-item ${activeTabId === item.id ? 'active' : ''}`}
            onClick={() => openTab(item.id)}
          >
            <span className="icon">{item.icon}</span>
            <span className="label">{item.label}</span>
          </div>
        ))}

        <div className="sidebar-divider"></div>

        {/* Strategies folder */}
        <div
          className="sidebar-item"
          onClick={() => toggleFolder('strategies')}
        >
          <span className="icon">{expandedFolders.strategies ? '📂' : '📁'}</span>
          <span className="label">Strategies</span>
        </div>
        {expandedFolders.strategies && (
          <>
            <div className="sidebar-item sub-item">
              <span className="icon">📄</span>
              <span className="label">mean_reversion.json</span>
            </div>
            <div className="sidebar-item sub-item">
              <span className="icon">📄</span>
              <span className="label">scalping_v2.json</span>
            </div>
          </>
        )}

        {/* Market Data folder */}
        <div
          className="sidebar-item"
          onClick={() => toggleFolder('marketData')}
        >
          <span className="icon">{expandedFolders.marketData ? '📂' : '📁'}</span>
          <span className="label">Market Data</span>
        </div>
        {expandedFolders.marketData && (
          <div className="sidebar-item sub-item">
            <span className="icon">📄</span>
            <span className="label">instruments.csv</span>
          </div>
        )}
      </div>
    </aside>
  );
};

export default LeftSidebar;
