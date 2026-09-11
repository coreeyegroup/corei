// src/components/LeftSidebar/PrimaryContent.tsx
import React from 'react';
import { usePreferencesStore } from '../../store/preferencesStore';
import { useAppStore } from '../../store/appStore';
import { useFileStore } from '../../store/fileStore';
import { useInfrastructureStore } from '../../store/infrastructureStore';
import { getFileIcon, Folder, FolderOpen } from './fileIcons';
import { ChevronRight, ChevronDown, X } from 'lucide-react';
import type { View } from '../../store/appStore';
import { useTradeStore } from '../../services/tradeService';

// ─── Helper: Sort items (folders first, then files) ──────────────────
const sortFileItems = (items: any[]): any[] => {
  return [...items].sort((a, b) => {
    if (a.isDirectory && !b.isDirectory) return -1;
    if (!a.isDirectory && b.isDirectory) return 1;
    return a.name.localeCompare(b.name);
  });
};

// ─── Tree Node Component ──────────────────────────────────────────────
interface TreeNodeProps {
  item: any;
  level: number;
  expandedPaths: Set<string>;
  toggleExpand: (path: string) => void;
  openFile: (path: string) => Promise<void>;
  activeFilePath: string | null;
  onFileClick: (path: string) => void;
}

const TreeNode: React.FC<TreeNodeProps> = ({
  item,
  level,
  expandedPaths,
  toggleExpand,
  openFile,
  activeFilePath,
  onFileClick,
}) => {
  const isExpanded = expandedPaths.has(item.path);
  const isActive = activeFilePath === item.path;

  if (item.isDirectory) {
    const IconComponent = isExpanded ? FolderOpen : Folder;
    return (
      <div className="tree-node" style={{ paddingLeft: level * 16 + 4 }}>
        <div
          className={`tree-item ${isExpanded ? 'expanded' : ''}`}
          onClick={() => toggleExpand(item.path)}
        >
          <span className="tree-chevron">
            {isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
          </span>
          <IconComponent size={14} className="tree-icon folder-icon" />
          <span className="tree-label">{item.name}</span>
        </div>
        {isExpanded && item.children && (
          <div className="tree-children">
            {sortFileItems(item.children).map((child) => (
              <TreeNode
                key={child.path}
                item={child}
                level={level + 1}
                expandedPaths={expandedPaths}
                toggleExpand={toggleExpand}
                openFile={openFile}
                activeFilePath={activeFilePath}
                onFileClick={onFileClick}
              />
            ))}
          </div>
        )}
      </div>
    );
  }

  const IconComponent = getFileIcon(item.name);

  return (
    <div
      className={`tree-node ${isActive ? 'active' : ''}`}
      style={{ paddingLeft: level * 16 + 4 }}
      onClick={() => {
        onFileClick(item.path);
        openFile(item.path);
      }}
    >
      <div className="tree-item file-item">
        <span className="tree-spacer" style={{ width: 20 }} />
        <IconComponent size={14} className="tree-icon file-icon" />
        <span className="tree-label">{item.name}</span>
      </div>
    </div>
  );
};

// ─── Content Components ──────────────────────────────────────────────

/** Workspace Domain — File Explorer + Open Editors */
const WorkspaceContent: React.FC = () => {
  const { activeTabId, openTab } = useAppStore();
  const {
    tree,
    expandedPaths,
    toggleExpand,
    openFile,
    activeFilePath,
    openFiles,
    setActiveFile,
    closeFile,
  } = useFileStore();
  const {
    explorerCollapsed,
    openEditorsCollapsed,
    setExplorerCollapsed,
    setOpenEditorsCollapsed,
  } = usePreferencesStore();

  const menuItems: { id: View; label: string; icon: string }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: '◆' },
    { id: 'workflows', label: 'Workflows', icon: '◈' },
    { id: 'scanner', label: 'Market Scanner', icon: '◉' },
    { id: 'positions', label: 'Positions', icon: '◘' },
    { id: 'logs', label: 'Execution Logs', icon: '⎚' },
    { id: 'depth', label: 'Depth Chart', icon: '📚' },
    { id: 'request', label: 'Request Builder', icon: '📨' },
    { id: 'files', label: 'Documents', icon: '📁' },
  ];

  const handleFileClick = (path: string) => setActiveFile(path);

  const handleCloseFile = (e: React.MouseEvent, path: string) => {
    e.stopPropagation();
    closeFile(path, true);
  };

  const renderOpenEditors = () => {
    if (openFiles.length === 0) {
      return <div className="empty-state">No editors open</div>;
    }
    return openFiles.map((file) => {
      const isActive = activeFilePath === file.path;
      const IconComponent = getFileIcon(file.path);
      const fileName = file.path.split('/').pop() || file.path;

      return (
        <div
          key={file.path}
          className={`open-editor-item ${isActive ? 'active' : ''}`}
          onClick={() => handleFileClick(file.path)}
        >
          <IconComponent size={14} className="tree-icon file-icon" />
          <span className="open-editor-label">
            {fileName}
            {file.isDirty && <span className="dirty-dot">●</span>}
          </span>
          <button
            className="close-editor-btn"
            onClick={(e) => handleCloseFile(e, file.path)}
            title="Close editor"
          >
            <X size={12} />
          </button>
        </div>
      );
    });
  };

  const renderExplorer = () => {
    if (tree.length === 0) {
      return <div className="empty-state">No files found</div>;
    }
    const sortedTree = sortFileItems(tree);
    return sortedTree.map((item) => (
      <TreeNode
        key={item.path}
        item={item}
        level={0}
        expandedPaths={expandedPaths}
        toggleExpand={toggleExpand}
        openFile={openFile}
        activeFilePath={activeFilePath}
        onFileClick={handleFileClick}
      />
    ));
  };

  return (
    <div className="primary-content workspace-content">
      {/* View Switcher */}
      <div className="view-switcher">
        {menuItems.map((item) => (
          <div
            key={item.id}
            className={`view-item ${activeTabId === item.id ? 'active' : ''}`}
            onClick={() => openTab(item.id)}
          >
            <span className="view-icon">{item.icon}</span>
            <span className="view-label">{item.label}</span>
          </div>
        ))}
      </div>

      <div className="sidebar-divider" />

      {/* Open Editors */}
      <div
        className="section-header"
        onClick={() => setOpenEditorsCollapsed(!openEditorsCollapsed)}
      >
        <span className="section-chevron">
          {openEditorsCollapsed ? <ChevronRight size={14} /> : <ChevronDown size={14} />}
        </span>
        <span className="section-label">OPEN EDITORS</span>
        {!openEditorsCollapsed && openFiles.length > 0 && (
          <span className="section-badge">{openFiles.length}</span>
        )}
      </div>
      {!openEditorsCollapsed && (
        <div className="section-content open-editors-section">
          {renderOpenEditors()}
        </div>
      )}

      <div className="sidebar-divider" />

      {/* Explorer */}
      <div
        className="section-header"
        onClick={() => setExplorerCollapsed(!explorerCollapsed)}
      >
        <span className="section-chevron">
          {explorerCollapsed ? <ChevronRight size={14} /> : <ChevronDown size={14} />}
        </span>
        <span className="section-label">EXPLORER</span>
      </div>
      {!explorerCollapsed && (
        <div className="section-content explorer-section">{renderExplorer()}</div>
      )}
    </div>
  );
};

/** Operations Domain — Placeholder */
const OperationsContent: React.FC = () => {
  const positions = useTradeStore((state) => state.positions);
  const pnl = useTradeStore((state) => state.portfolio?.pnl ?? 0);
  const exposure = useTradeStore((state) => state.portfolio?.allocated ?? 0);
  return (
    <div className="primary-content domain-content-placeholder">
      <div className="domain-header">📊 Operations</div>
      <div className="domain-stats">
        <div className="stat-row"><span>Active Positions</span><span className="stat-value">{positions.length}</span></div>
        <div className="stat-row"><span>P&L</span><span className="stat-value green">${pnl.toFixed(2)}</span></div>
        <div className="stat-row"><span>Exposure</span><span className="stat-value amber">{exposure.toFixed(2)} lots</span></div>
      </div>
      <div className="domain-placeholder">Order book & execution details coming soon</div>
    </div>
  );
};

/** Infrastructure Domain — Placeholder */
const InfrastructureContent: React.FC = () => {
  const { services } = useInfrastructureStore();
  return (
    <div className="primary-content domain-content-placeholder">
      <div className="domain-header">🖥 Infrastructure</div>
      <div className="domain-stats">
        {services.map((svc) => (
          <div key={svc.name} className="stat-row">
            <span>{svc.name}</span>
            <span className={`stat-value ${svc.status === 'HEALTHY' ? 'green' : svc.status === 'DEGRADED' ? 'amber' : 'danger'}`}>
              {svc.status}
            </span>
          </div>
        ))}
      </div>
      <div className="domain-placeholder">Detailed service metrics coming soon</div>
    </div>
  );
};

/** Risk Domain — Placeholder */
const RiskContent: React.FC = () => (
  <div className="primary-content domain-content-placeholder">
    <div className="domain-header">🛡 Risk</div>
    <div className="domain-stats">
      <div className="stat-row"><span>VaR (95%)</span><span className="stat-value">-$2,450</span></div>
      <div className="stat-row"><span>Drawdown</span><span className="stat-value amber">-2.4%</span></div>
      <div className="stat-row"><span>Risk Limit</span><span className="stat-value green">45%</span></div>
    </div>
    <div className="domain-placeholder">Risk analytics coming soon</div>
  </div>
);

/** Data Domain — Placeholder */
const DataContent: React.FC = () => (
  <div className="primary-content domain-content-placeholder">
    <div className="domain-header">🗄 Data</div>
    <div className="domain-stats">
      <div className="stat-row"><span>Instruments</span><span className="stat-value">1,247</span></div>
      <div className="stat-row"><span>Data Feeds</span><span className="stat-value green">LIVE</span></div>
    </div>
    <div className="domain-placeholder">Market data browser coming soon</div>
  </div>
);

/** AI Domain — Placeholder */
const AIContent: React.FC = () => (
  <div className="primary-content domain-content-placeholder">
    <div className="domain-header">🧠 AI</div>
    <div className="domain-stats">
      <div className="stat-row"><span>Active Models</span><span className="stat-value">3</span></div>
      <div className="stat-row"><span>Signal Status</span><span className="stat-value green">BUY</span></div>
    </div>
    <div className="domain-placeholder">Model management coming soon</div>
  </div>
);

/** Settings Domain — Placeholder */
const SettingsContent: React.FC = () => (
  <div className="primary-content domain-content-placeholder">
    <div className="domain-header">⚙️ Settings</div>
    <div className="domain-placeholder">System configuration coming soon</div>
  </div>
);

// ─── Main Content Router ──────────────────────────────────────────────

const PrimaryContent: React.FC = () => {
  const { activeDomain } = usePreferencesStore();

  switch (activeDomain) {
    case 'workspace':
      return <WorkspaceContent />;
    case 'operations':
      return <OperationsContent />;
    case 'infrastructure':
      return <InfrastructureContent />;
    case 'risk':
      return <RiskContent />;
    case 'data':
      return <DataContent />;
    case 'ai':
      return <AIContent />;
    case 'settings':
      return <SettingsContent />;
    default:
      return <WorkspaceContent />;
  }
};

export default PrimaryContent;
