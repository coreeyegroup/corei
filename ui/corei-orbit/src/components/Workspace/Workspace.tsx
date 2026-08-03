// src/components/Workspace/Workspace.tsx
import React from 'react';
import { useAppStore } from '../../store/appStore';
import Dashboard from './views/Dashboard';
import Workflows from './views/Workflows';
import MarketScanner from './views/MarketScanner';
import Positions from './views/Positions';
import ExecutionLogs from './views/ExecutionLogs';
import DepthChart from './views/DepthChart';
import RequestBuilder from './views/RequestBuilder';
import './Workspace.css';

const Workspace: React.FC = () => {
  const { tabs, activeTabId, setActiveTab, closeTab } = useAppStore();

  const renderView = (viewId: string) => {
    switch (viewId) {
      case 'dashboard':
        return <Dashboard />;
      case 'workflows':
        return <Workflows />;
      case 'scanner':
        return <MarketScanner />;
      case 'positions':
        return <Positions />;
      case 'logs':
        return <ExecutionLogs />;
      case 'depth':
        return <DepthChart />;
      case 'request':
        return <RequestBuilder />;
      default:
        return <Dashboard />;
    }
  };

  const activeTab = tabs.find((tab) => tab.id === activeTabId);

  return (
    <div className="workspace-container">
      {/* Tab Bar */}
      <div className="tab-bar">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            className={`tab-item ${activeTabId === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            <span className="tab-icon">{tab.icon}</span>
            <span className="tab-label">{tab.label}</span>
            <button
              className="tab-close"
              onClick={(e) => {
                e.stopPropagation();
                closeTab(tab.id);
              }}
              title="Close tab"
            >
              ×
            </button>
          </div>
        ))}
      </div>
      {/* Workspace Content */}
      <div className="workspace-content">
        {activeTab ? renderView(activeTab.id) : <div>No tab open</div>}
      </div>
    </div>
  );
};

export default Workspace;
