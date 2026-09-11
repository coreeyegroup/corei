// src/components/LeftSidebar/LeftSidebar.tsx
import React, { useEffect, useState, useRef } from 'react';
import {
  ChartCandlestick,
  Server,
  Shield,
  BarChart3,
  FolderTree,
  BriefcaseBusiness,
  MonitorCog,
  Gavel,
  Bot,
  Search,
  X,
} from 'lucide-react';
import { useAppStore } from '../../store/appStore';
import { useFileStore } from '../../store/fileStore';
import { usePreferencesStore, type DomainId } from '../../store/preferencesStore';
import type { View } from '../../store/appStore';
import { getFileIcon, Folder, FolderOpen } from './fileIcons';
import { ChevronRight, ChevronDown } from 'lucide-react';
import { useInfrastructureStore } from '../../store/infrastructureStore';
import './LeftSidebar.css';

// ─── Types ──────────────────────────────────────────────────────────────
interface FileItem {
  name: string;
  path: string;
  isDirectory: boolean;
  children?: FileItem[];
}

// ─── Helper: Sort items (folders first, then files) ──────────────────
const sortFileItems = (items: FileItem[]): FileItem[] => {
  return [...items].sort((a, b) => {
    if (a.isDirectory && !b.isDirectory) return -1;
    if (!a.isDirectory && b.isDirectory) return 1;
    return a.name.localeCompare(b.name);
  });
};

// ─── Tree Node Component ──────────────────────────────────────────────
interface TreeNodeProps {
  item: FileItem;
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

// ─── WorkspaceContent (File Explorer + Open Editors) ──────────────────
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

  const handleFileClick = (path: string) => {
    setActiveFile(path);
  };

  const handleCloseFile = (e: React.MouseEvent, path: string) => {
    e.stopPropagation();
    const result = closeFile(path, true);
    if (result.cancelled) {
      // File is dirty — we would show a prompt here in future
    }
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
      <div className="sidebar-header">Explorer</div>
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

      <div className="explorer-scroll-container">
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
          <div className="section-content explorer-section">
            {renderExplorer()}
          </div>
        )}
      </div>
    </div>
  );
};

// ─── Domain Explorer Configuration ──────────────────────────────────────
interface ExplorerItem {
  label: string;
  viewId?: View;
  action?: () => void;
}

interface ExplorerSection {
  label: string;
  items: ExplorerItem[];
}

interface DomainExplorerConfig {
  id: string;
  title: string;
  sections: ExplorerSection[];
  dashboardLayout?: Array<{
    type: 'stat' | 'status-grid' | 'ticker' | 'table';
    source: string;
    title?: string;
  }>;
}

const DOMAIN_CONFIGS: Record<string, DomainExplorerConfig> = {
  // ─── TRADING ──────────────────────────────────────────────────────────
  trading: {
    id: 'trading',
    title: 'TRADING',
    dashboardLayout: [
      { type: 'stat', source: 'pnl' },
      { type: 'stat', source: 'winRate' },
      { type: 'stat', source: 'trades' },
      { type: 'stat', source: 'exposure' },
      { type: 'ticker', source: 'instruments' },
      { type: 'table', source: 'positions', title: 'Open Positions' },
    ],
    sections: [
      {
        label: 'Market Intelligence',
        items: [
          { label: 'Market Data', action: () => console.log('Open Market Data') },
          { label: 'Market Health', action: () => console.log('Open Market Health') },
          { label: 'Technical Indicators', action: () => console.log('Open Technical Indicators') },
          { label: 'Market Structure', action: () => console.log('Open Market Structure') },
          { label: 'Trend Analysis', action: () => console.log('Open Trend Analysis') },
          { label: 'Volatility Analysis', action: () => console.log('Open Volatility Analysis') },
          { label: 'Momentum Analysis', action: () => console.log('Open Momentum Analysis') },
          { label: 'Market Regime', action: () => console.log('Open Market Regime') },
          { label: '[Future Market Engines]', action: () => console.log('Open Future Market Engines') },
        ],
      },
      {
        label: 'Signal Intelligence',
        items: [
          { label: 'Signal Generation', action: () => console.log('Open Signal Generation') },
          { label: 'Signal Processing', action: () => console.log('Open Signal Processing') },
          { label: 'Signal Validation', action: () => console.log('Open Signal Validation') },
          { label: 'Signal Quality', action: () => console.log('Open Signal Quality') },
          { label: '[Future Signal Engines]', action: () => console.log('Open Future Signal Engines') },
        ],
      },
      {
        label: 'Decision Intelligence',
        items: [
          { label: 'Decision Engine', action: () => console.log('Open Decision Engine') },
          { label: 'Decision Processing', action: () => console.log('Open Decision Processing') },
          { label: 'Trade Intent', action: () => console.log('Open Trade Intent') },
          { label: 'Decision Validation', action: () => console.log('Open Decision Validation') },
          { label: '[Future Decision Engines]', action: () => console.log('Open Future Decision Engines') },
        ],
      },
      {
        label: 'Risk Intelligence',
        items: [
          { label: 'Risk Engine', action: () => console.log('Open Risk Engine') },
          { label: 'Exposure', action: () => console.log('Open Exposure') },
          { label: 'Risk Limits', action: () => console.log('Open Risk Limits') },
          { label: 'Drawdown', action: () => console.log('Open Drawdown') },
          { label: 'Concentration', action: () => console.log('Open Concentration') },
          { label: '[Future Risk Engines]', action: () => console.log('Open Future Risk Engines') },
        ],
      },
      {
        label: 'Portfolio Intelligence',
        items: [
          { label: 'Portfolio', action: () => console.log('Open Portfolio') },
          { label: 'Allocation', action: () => console.log('Open Allocation') },
          { label: 'Exposure', action: () => console.log('Open Exposure') },
          { label: 'Capital', action: () => console.log('Open Capital') },
          { label: '[Future Portfolio Engines]', action: () => console.log('Open Future Portfolio Engines') },
        ],
      },
      {
        label: 'Execution Intelligence',
        items: [
          { label: 'Execution', action: () => console.log('Open Execution') },
          { label: 'Order Management', action: () => console.log('Open Order Management') },
          { label: 'Order Routing', action: () => console.log('Open Order Routing') },
          { label: 'Fill Management', action: () => console.log('Open Fill Management') },
          { label: 'Execution Quality', action: () => console.log('Open Execution Quality') },
          { label: '[Future Execution Engines]', action: () => console.log('Open Future Execution Engines') },
        ],
      },
      {
        label: 'Position Intelligence',
        items: [
          { label: 'Positions', viewId: 'positions' },
          { label: 'Position Lifecycle', action: () => console.log('Open Position Lifecycle') },
          { label: 'Position State', action: () => console.log('Open Position State') },
          { label: '[Future Position Engines]', action: () => console.log('Open Future Position Engines') },
        ],
      },
      {
        label: 'Performance Intelligence',
        items: [
          { label: 'Performance', action: () => console.log('Open Performance') },
          { label: 'P&L', action: () => console.log('Open P&L') },
          { label: 'Returns', action: () => console.log('Open Returns') },
          { label: 'Attribution', action: () => console.log('Open Attribution') },
          { label: '[Future Performance Engines]', action: () => console.log('Open Future Performance Engines') },
        ],
      },
      {
        label: 'System Intelligence',
        items: [
          { label: 'Trading Runtime', action: () => console.log('Open Trading Runtime') },
          { label: 'Workflow State', action: () => console.log('Open Workflow State') },
          { label: 'Engine State', action: () => console.log('Open Engine State') },
          { label: 'Automation State', action: () => console.log('Open Automation State') },
          { label: '[Future System Engines]', action: () => console.log('Open Future System Engines') },
        ],
      },
      {
        label: 'Capital Intelligence',
        items: [
          { label: 'Capital Management', action: () => console.log('Open Capital Management') },
          { label: 'Capital Allocation', action: () => console.log('Open Capital Allocation') },
          { label: 'Capital Reservation', action: () => console.log('Open Capital Reservation') },
          { label: '[Future Capital Engines]', action: () => console.log('Open Future Capital Engines') },
        ],
      },
      {
        label: 'Broker Intelligence',
        items: [
          { label: 'Broker Connectivity', action: () => console.log('Open Broker Connectivity') },
          { label: 'Broker Accounts', action: () => console.log('Open Broker Accounts') },
          { label: 'Broker State', action: () => console.log('Open Broker State') },
          { label: 'Market Access', action: () => console.log('Open Market Access') },
          { label: '[Future Broker Adapters]', action: () => console.log('Open Future Broker Adapters') },
        ],
      },
      {
        label: 'Strategy Intelligence',
        items: [
          { label: 'Strategy Engine', action: () => console.log('Open Strategy Engine') },
          { label: 'Strategy Registry', action: () => console.log('Open Strategy Registry') },
          { label: 'Strategy Runtime', action: () => console.log('Open Strategy Runtime') },
          { label: 'Strategy Configuration', action: () => console.log('Open Strategy Configuration') },
          { label: '[Future Strategy Engines]', action: () => console.log('Open Future Strategy Engines') },
        ],
      },
      {
        label: 'Governance',
        items: [
          { label: 'Trading Policies', action: () => console.log('Open Trading Policies') },
          { label: 'Approvals', action: () => console.log('Open Approvals') },
          { label: 'Overrides', action: () => console.log('Open Overrides') },
          { label: 'Exceptions', action: () => console.log('Open Exceptions') },
          { label: 'Audit', action: () => console.log('Open Audit') },
        ],
      },
    ],
  },

  // ─── INFRASTRUCTURE ────────────────────────────────────────────────────
  infrastructure: {
    id: 'infrastructure',
    title: 'INFRASTRUCTURE',
    dashboardLayout: [
      { type: 'status-grid', source: 'all', title: 'Service Status' },
      { type: 'stat', source: 'KAFKA' },
      { type: 'stat', source: 'POSTGRES' },
      { type: 'stat', source: 'REDIS' },
      { type: 'stat', source: 'KUBERNETES' },
    ],
    sections: [
      {
        label: 'Compute & Host',
        items: [
          { label: 'Ubuntu Server', action: () => {} },
          { label: 'Container Runtime (containerd)', action: () => {} },
          { label: 'Nodes / Hosts', action: () => {} },
        ],
      },
      {
        label: 'Container & Orchestration',
        items: [
          { label: 'Docker Engine', action: () => {} },
          { label: 'Kubernetes (k3s)', action: () => {} },
          { label: 'Kubernetes (kubeadm)', action: () => {} },
          { label: 'Helm', action: () => {} },
        ],
      },
      {
        label: 'Network & Traffic',
        items: [
          { label: 'Calico (CNI)', action: () => {} },
          { label: 'MetalLB', action: () => {} },
          { label: 'NGINX Ingress', action: () => {} },
          { label: 'cert-manager', action: () => {} },
          { label: 'Istio (Service Mesh)', action: () => {} },
          { label: 'Kong API Gateway', action: () => {} },
          { label: 'WireGuard (VPN)', action: () => {} },
        ],
      },
      {
        label: 'Storage & Backup',
        items: [
          { label: 'Longhorn', action: () => {} },
          { label: 'Ceph', action: () => {} },
          { label: 'Velero (Backups)', action: () => {} },
          { label: 'Backup / Restore', action: () => {} },
        ],
      },
      {
        label: 'Event & Message Platform',
        items: [
          { label: 'Apache Kafka', action: () => {} },
          { label: 'KRaft (Kafka Controller)', action: () => {} },
          { label: 'Schema Registry', action: () => {} },
          { label: 'Kafka Connect', action: () => {} },
          { label: 'Kafka UI', action: () => {} },
        ],
      },
      {
        label: 'Database Platform',
        items: [
          { label: 'PostgreSQL', action: () => {} },
          { label: 'TimescaleDB', action: () => {} },
          { label: 'PgBouncer', action: () => {} },
          { label: 'Redis Cluster', action: () => {} },
          { label: 'ClickHouse', action: () => {} },
        ],
      },
      {
        label: 'Observability',
        items: [
          { label: 'Prometheus (Metrics)', action: () => {} },
          { label: 'Grafana (Dashboards)', action: () => {} },
          { label: 'Loki (Logs)', action: () => {} },
          { label: 'Promtail (Log Shipping)', action: () => {} },
          { label: 'Jaeger (Tracing)', action: () => {} },
          { label: 'OpenTelemetry', action: () => {} },
          { label: 'Alertmanager (Alerts)', action: () => {} },
          { label: 'Infrastructure Monitoring', action: () => {} },
        ],
      },
      {
        label: 'Identity & Security',
        items: [
          { label: 'Keycloak (Identity)', action: () => {} },
          { label: 'Vault (Secrets)', action: () => {} },
          { label: 'Secrets Management', action: () => {} },
          { label: 'RBAC / Identity', action: () => {} },
          { label: 'Trivy (Container Security)', action: () => {} },
        ],
      },
      {
        label: 'Registry & Delivery',
        items: [
          { label: 'Harbor (Container Registry)', action: () => {} },
          { label: 'GitHub Actions (CI/CD)', action: () => {} },
          { label: 'ArgoCD (GitOps)', action: () => {} },
          { label: 'Kaniko (Image Build)', action: () => {} },
          { label: 'Buildah (Image Build)', action: () => {} },
        ],
      },
      {
        label: 'Infrastructure as Code',
        items: [
          { label: 'Terraform', action: () => {} },
        ],
      },
      {
        label: 'Automation & Workflow',
        items: [
          { label: 'n8n (Workflow Automation)', action: () => {} },
        ],
      },
      {
        label: 'Platform Operations',
        items: [
          { label: 'Cluster Operations', action: () => {} },
          { label: 'Node Operations', action: () => {} },
          { label: 'Service Operations', action: () => {} },
          { label: 'Deployment Operations', action: () => {} },
          { label: 'Runtime Health', action: () => {} },
          { label: 'Diagnostics', action: () => {} },
          { label: 'Operational Workflows', action: () => {} },
        ],
      },
      {
        label: 'Disaster Recovery',
        items: [
          { label: 'High Availability', action: () => {} },
          { label: 'Cross-DC Replication', action: () => {} },
          { label: 'Failover', action: () => {} },
          { label: 'Recovery', action: () => {} },
          { label: 'RPO / RTO', action: () => {} },
          { label: 'Site Recovery', action: () => {} },
        ],
      },
      {
        label: 'Integration Platform',
        items: [
          { label: 'Integrations', action: () => {} },
          { label: 'Connectors', action: () => {} },
          { label: 'Adapters', action: () => {} },
          { label: 'Integration Health', action: () => {} },
          { label: 'Integration Diagnostics', action: () => {} },
          { label: 'Integration Runtime', action: () => {} },
        ],
      },
    ],
  },

  // ─── RISK ──────────────────────────────────────────────────────────────
  risk: {
    id: 'risk',
    title: 'RISK',
    sections: [
      {
        label: 'Risk',
        items: [
          { label: 'Risk', action: () => console.log('Open Risk') },
          { label: 'Positions', viewId: 'positions' },
          { label: 'Portfolio', action: () => console.log('Open Portfolio') },
        ],
      },
      {
        label: 'Monitoring',
        items: [
          { label: 'Diagnostics', action: () => console.log('Open Diagnostics') },
          { label: 'Timeline', action: () => console.log('Open Timeline') },
          { label: 'Logs', viewId: 'logs' },
        ],
      },
      {
        label: 'Analysis',
        items: [{ label: 'Search', action: () => console.log('Open Search') }],
      },
    ],
  },

  // ─── MARKET ────────────────────────────────────────────────────────────
  market: {
    id: 'market',
    title: 'MARKET',
    sections: [
      {
        label: 'Market',
        items: [
          { label: 'Dashboard', viewId: 'dashboard' },
          { label: 'Charts', viewId: 'depth' },
          { label: 'Scanner', viewId: 'scanner' },
          { label: 'Watchlist', action: () => console.log('Open Watchlist') },
          { label: 'News', action: () => console.log('Open News') },
          { label: 'Calendar', action: () => console.log('Open Calendar') },
        ],
      },
      {
        label: 'Data',
        items: [
          { label: 'Historical Data', action: () => console.log('Open Historical Data') },
          { label: 'Tick Data', action: () => console.log('Open Tick Data') },
        ],
      },
    ],
  },

  // ─── RESEARCH ──────────────────────────────────────────────────────────
  research: {
    id: 'research',
    title: 'RESEARCH',
    sections: [
      {
        label: 'Research',
        items: [
          { label: 'Notes', action: () => console.log('Open Notes') },
          { label: 'Journals', action: () => console.log('Open Journals') },
          { label: 'Strategies', action: () => console.log('Open Strategies') },
        ],
      },
      {
        label: 'Analysis',
        items: [
          { label: 'Charts', viewId: 'depth' },
          { label: 'Scanner', viewId: 'scanner' },
          { label: 'Search', action: () => console.log('Open Search') },
        ],
      },
      {
        label: 'Tools',
        items: [
          { label: 'Monaco', action: () => console.log('Open Monaco') },
          { label: 'Terminal', action: () => console.log('Open Terminal') },
        ],
      },
    ],
  },

  // ─── PORTFOLIO ─────────────────────────────────────────────────────────
  portfolio: {
    id: 'portfolio',
    title: 'PORTFOLIO',
    sections: [
      {
        label: 'Portfolio',
        items: [
          { label: 'Overview', action: () => console.log('Open Portfolio Overview') },
          { label: 'Positions', viewId: 'positions' },
          { label: 'Performance', action: () => console.log('Open Performance') },
          { label: 'Allocation', action: () => console.log('Open Allocation') },
        ],
      },
    ],
  },

  // ─── COREI OS ──────────────────────────────────────────────────────────
  'corei-os': {
    id: 'corei-os',
    title: 'COREI OS',
    sections: [
      {
        label: 'Workspace',
        items: [
          { label: 'Dashboard', viewId: 'dashboard' },
          { label: 'Workflows', viewId: 'workflows' },
          { label: 'Documents', viewId: 'files' },
          { label: 'Request Builder', viewId: 'request' },
        ],
      },
    ],
  },

  // ─── EXECUTIVE ─────────────────────────────────────────────────────────
  executive: {
    id: 'executive',
    title: 'EXECUTIVE',
    sections: [
      {
        label: 'Overview',
        items: [
          { label: 'Executive Dashboard', viewId: 'dashboard' },
          { label: 'Operational Summary', action: () => console.log('Open Operational Summary') },
          { label: 'Business Summary', action: () => console.log('Open Business Summary') },
        ],
      },
      {
        label: 'Performance',
        items: [
          { label: 'Portfolio Performance', action: () => console.log('Open Portfolio Performance') },
          { label: 'Trading Performance', action: () => console.log('Open Trading Performance') },
          { label: 'Risk Performance', action: () => console.log('Open Risk Performance') },
        ],
      },
    ],
  },

  // ─── COMPLIANCE ────────────────────────────────────────────────────────
  compliance: {
    id: 'compliance',
    title: 'COMPLIANCE',
    sections: [
      {
        label: 'Overview',
        items: [
          { label: 'Compliance Dashboard', action: () => console.log('Open Compliance Dashboard') },
          { label: 'Compliance Status', action: () => console.log('Open Compliance Status') },
          { label: 'Open Issues', action: () => console.log('Open Issues') },
        ],
      },
      {
        label: 'Controls',
        items: [
          { label: 'Trading Controls', action: () => console.log('Open Trading Controls') },
          { label: 'Risk Controls', action: () => console.log('Open Risk Controls') },
          { label: 'Access Controls', action: () => console.log('Open Access Controls') },
        ],
      },
      {
        label: 'Audit',
        items: [
          { label: 'Audit Trail', action: () => console.log('Open Audit Trail') },
          { label: 'Event History', action: () => console.log('Open Event History') },
          { label: 'User Activity', action: () => console.log('Open User Activity') },
        ],
      },
    ],
  },

  // ─── AI ────────────────────────────────────────────────────────────────
  ai: {
    id: 'ai',
    title: 'AI',
    sections: [
      {
        label: 'Intelligence',
        items: [
          { label: 'Market Intelligence', action: () => console.log('Open Market Intelligence') },
          { label: 'Signal Intelligence', action: () => console.log('Open Signal Intelligence') },
          { label: 'Decision Intelligence', action: () => console.log('Open Decision Intelligence') },
        ],
      },
      {
        label: 'Models',
        items: [
          { label: 'Model Registry', action: () => console.log('Open Model Registry') },
          { label: 'Model Versions', action: () => console.log('Open Model Versions') },
          { label: 'Model Status', action: () => console.log('Open Model Status') },
        ],
      },
      {
        label: 'Agents',
        items: [
          { label: 'Active Agents', action: () => console.log('Open Active Agents') },
          { label: 'Agent History', action: () => console.log('Open Agent History') },
        ],
      },
      {
        label: 'Prompts',
        items: [
          { label: 'Prompt Library', action: () => console.log('Open Prompt Library') },
          { label: 'Prompt Testing', action: () => console.log('Open Prompt Testing') },
        ],
      },
    ],
  },
};

// ─── Domain Explorer Component ──────────────────────────────────────────
interface DomainExplorerProps {
  activeDomain: string;
  getBadge?: (item: ExplorerItem) => React.ReactNode;
  onInfrastructureItemClick?: (serviceName: string) => void;
  onDomainTitleClick?: (domainId: string) => void;
  onSectionTitleClick?: (domainId: string, sectionLabel: string) => void;
  onItemClick?: (domainId: string, itemLabel: string) => void; // NEW
}

const DomainExplorer: React.FC<DomainExplorerProps> = ({
  activeDomain,
  getBadge,
  onInfrastructureItemClick,
  onDomainTitleClick,
  onSectionTitleClick,
  onItemClick,
}) => {
  const { openTab } = useAppStore();
  const config = DOMAIN_CONFIGS[activeDomain];

  const [searchQuery, setSearchQuery] = useState('');
  const [collapsedSections, setCollapsedSections] = useState<Record<string, boolean>>(() => {
    const stored = localStorage.getItem('domainExplorerCollapsed');
    return stored ? JSON.parse(stored) : {};
  });

  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.key === '/' &&
        !(e.target instanceof HTMLInputElement) &&
        !(e.target instanceof HTMLTextAreaElement)
      ) {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const toggleSection = (sectionLabel: string) => {
    setCollapsedSections((prev) => {
      const next = { ...prev, [sectionLabel]: !prev[sectionLabel] };
      localStorage.setItem('domainExplorerCollapsed', JSON.stringify(next));
      return next;
    });
  };

  const handleItemClick = (item: ExplorerItem) => {
    if (item.viewId) {
      openTab(item.viewId);
      return;
    }

    if (activeDomain === 'infrastructure' && onInfrastructureItemClick) {
      onInfrastructureItemClick(item.label);
      return;
    }

    // NEW: For all other items, open a generic item tab
    if (onItemClick) {
      onItemClick(activeDomain, item.label);
      return;
    }

    // Fallback (should not happen)
    if (item.action) {
      item.action();
    }
  };

  const handleDomainTitleClick = () => {
    if (onDomainTitleClick) {
      onDomainTitleClick(activeDomain);
    }
  };

  const handleSectionTitleClick = (sectionLabel: string) => {
    if (onSectionTitleClick) {
      onSectionTitleClick(activeDomain, sectionLabel);
    }
  };

  if (!config) {
    return (
      <div className="primary-content workspace-content">
        <div className="sidebar-header">Explorer</div>
        <div className="empty-state">No domain selected</div>
      </div>
    );
  }

  const query = searchQuery.trim().toLowerCase();
  const filteredSections = config.sections
    .map((section) => ({
      ...section,
      items: section.items.filter((item) =>
        item.label.toLowerCase().includes(query)
      ),
    }))
    .filter((section) => section.items.length > 0);

  const hasResults = filteredSections.length > 0;

  return (
    <div className="primary-content workspace-content">
      <div
        className="sidebar-header"
        onClick={handleDomainTitleClick}
        style={{ cursor: 'pointer' }}
      >
        {config.title}
      </div>
      <div className="explorer-search-container">
        <Search size={14} className="explorer-search-icon" />
        <input
          ref={searchInputRef}
          type="text"
          className="explorer-search-input"
          placeholder="Filter items..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          aria-label="Filter explorer items"
        />
        {searchQuery && (
          <button
            className="explorer-search-clear"
            onClick={() => setSearchQuery('')}
            aria-label="Clear search"
          >
            <X size={14} />
          </button>
        )}
        <span className="explorer-search-hint">/</span>
      </div>

      <div className="explorer-scroll-container">
        {!hasResults && searchQuery && (
          <div className="empty-state">No matching items</div>
        )}
        {hasResults &&
          filteredSections.map((section) => {
            const isCollapsed = collapsedSections[section.label] || false;
            return (
              <React.Fragment key={section.label}>
                <div
                  className="section-header"
                >
                  <span
                    className="section-chevron"
                    onClick={() => toggleSection(section.label)}
                    style={{ cursor: 'pointer' }}
                  >
                    {isCollapsed ? <ChevronRight size={14} /> : <ChevronDown size={14} />}
                  </span>
                  <span
                    className="section-label"
                    onClick={() => toggleSection(section.label)}
                    style={{ cursor: 'pointer' }}
                  >
                    {section.label}
                  </span>
                  <span className="section-badge">{section.items.length}</span>
                  <span
                    className="section-open-btn"
                    onClick={() => handleSectionTitleClick(section.label)}
                    style={{ cursor: 'pointer', marginLeft: '4px' }}
                    title="Open workspace"
                  >
                    🖥️
                  </span>
                </div>
                {!isCollapsed && (
                  <div className="section-content">
                    {section.items.map((item) => (
                      <div
                        key={item.label}
                        className="view-item"
                        onClick={() => handleItemClick(item)}
                      >
                        <span className="view-icon">•</span>
                        <span className="view-label">{item.label}</span>
                        {getBadge?.(item)}
                      </div>
                    ))}
                  </div>
                )}
              </React.Fragment>
            );
          })}
      </div>
    </div>
  );
};

// ─── Combined Explorer ──────────────────────────────────────────────────
interface LeftExplorerProps {
  activeDomain: string;
  onInfrastructureItemClick?: (serviceName: string) => void;
  onDomainTitleClick?: (domainId: string) => void;
  onSectionTitleClick?: (domainId: string, sectionLabel: string) => void;
  onItemClick?: (domainId: string, itemLabel: string) => void; // NEW
}

const LeftExplorer: React.FC<LeftExplorerProps> = ({
  activeDomain,
  onInfrastructureItemClick,
  onDomainTitleClick,
  onSectionTitleClick,
  onItemClick,
}) => {
  const { services } = useInfrastructureStore();

  const getInfrastructureBadge = (item: ExplorerItem): React.ReactNode => {
    if (activeDomain !== 'infrastructure') return null;

    const labelLower = item.label.toLowerCase();
    const map: Record<string, string> = {
      'postgresql': 'postgres',
      'timescaledb': 'timescaledb',
      'redis cluster': 'redis',
      'apache kafka': 'kafka',
      'kafka ui': 'kafka',
      'kafka connect': 'kafka',
      'schema registry': 'kafka',
      'kraft': 'kafka',
      'postgres': 'postgres',
      'timescale': 'timescaledb',
      'redis': 'redis',
      'clickhouse': 'clickhouse',
      'pgbouncer': 'pgbouncer',
      'kubernetes': 'kubernetes',
      'k3s': 'kubernetes',
      'kubeadm': 'kubernetes',
      'helm': 'helm',
      'calico': 'calico',
      'metallb': 'metallb',
      'nginx': 'nginx',
      'cert-manager': 'cert-manager',
      'istio': 'istio',
      'kong': 'kong',
      'wireguard': 'wireguard',
      'longhorn': 'longhorn',
      'ceph': 'ceph',
      'velero': 'velero',
      'prometheus': 'prometheus',
      'grafana': 'grafana',
      'loki': 'loki',
      'promtail': 'promtail',
      'jaeger': 'jaeger',
      'opentelemetry': 'opentelemetry',
      'alertmanager': 'alertmanager',
      'keycloak': 'keycloak',
      'vault': 'vault',
      'trivy': 'trivy',
      'harbor': 'harbor',
      'argocd': 'argocd',
      'terraform': 'terraform',
      'n8n': 'n8n',
      'github actions': 'githubactions',
      'kaniko': 'kaniko',
      'buildah': 'buildah',
    };
    let serviceName = map[labelLower];
    if (!serviceName) {
      const match = Object.entries(map).find(([key]) => labelLower.includes(key));
      if (match) serviceName = match[1];
    }
    if (!serviceName) return null;

    const service = services.find((s) => s.name === serviceName.toUpperCase());
    if (!service) return null;

    const statusClass =
      service.status === 'HEALTHY' ? 'healthy'
      : service.status === 'DEGRADED' ? 'degraded'
      : service.status === 'OFFLINE' ? 'offline'
      : 'unknown';

    return <span className={`status-dot ${statusClass}`} />;
  };

  if (activeDomain === 'corei-os') {
    return <WorkspaceContent />;
  }

  return (
    <DomainExplorer
      activeDomain={activeDomain}
      getBadge={getInfrastructureBadge}
      onInfrastructureItemClick={onInfrastructureItemClick}
      onDomainTitleClick={onDomainTitleClick}
      onSectionTitleClick={onSectionTitleClick}
      onItemClick={onItemClick}
    />
  );
};

// ─── Activity Bar ──────────────────────────────────────────────────────
interface ActivityBarProps {
  activeDomain: string;
  onDomainClick: (domainId: string) => void;
}

const ActivityBar: React.FC<ActivityBarProps> = ({
  activeDomain,
  onDomainClick,
}) => {
  const domains: {
    id: string;
    label: string;
    shortLabel: string;
    icon: React.ComponentType<{ size?: number; className?: string }>;
  }[] = [
    { id: 'trading', label: 'Trading', shortLabel: 'TRD', icon: ChartCandlestick },
    { id: 'infrastructure', label: 'Infrastructure', shortLabel: 'INF', icon: Server },
    { id: 'risk', label: 'Risk', shortLabel: 'RSK', icon: Shield },
    { id: 'market', label: 'Market', shortLabel: 'MKT', icon: BarChart3 },
    { id: 'research', label: 'Research', shortLabel: 'RES', icon: FolderTree },
    { id: 'portfolio', label: 'Portfolio', shortLabel: 'PF', icon: BriefcaseBusiness },
    { id: 'corei-os', label: 'COREI OS', shortLabel: 'OS', icon: MonitorCog },
    { id: 'executive', label: 'Executive', shortLabel: 'EXE', icon: Gavel },
    { id: 'compliance', label: 'Compliance', shortLabel: 'CMP', icon: Shield },
    { id: 'ai', label: 'AI', shortLabel: 'AI', icon: Bot },
  ];

  const bottomControls: {
    id: string;
    label: string;
    shortLabel: string;
    icon: React.ComponentType<{ size?: number; className?: string }>;
  }[] = [
    { id: 'help', label: 'Help', shortLabel: 'HLP', icon: () => <span>❓</span> },
    { id: 'settings', label: 'Settings', shortLabel: 'STG', icon: () => <span>⚙️</span> },
  ];

  return (
    <div className="activity-bar">
      {domains.map((domain) => {
        const isActive = activeDomain === domain.id;
        const Icon = domain.icon;
        return (
          <button
            key={domain.id}
            className={`activity-item ${isActive ? 'active' : ''}`}
            onClick={() => onDomainClick(domain.id)}
            title={domain.label}
          >
            <Icon size={18} className="activity-icon" />
            <span className="activity-label">{domain.shortLabel}</span>
          </button>
        );
      })}

      <div className="activity-bar-spacer" />

      <div className="activity-bar-divider" />

      {bottomControls.map((control) => {
        const isActive = activeDomain === control.id;
        const Icon = control.icon;
        return (
          <button
            key={control.id}
            className={`activity-item ${isActive ? 'active' : ''}`}
            onClick={() => onDomainClick(control.id)}
            title={control.label}
          >
            <Icon size={18} className="activity-icon" />
            <span className="activity-label">{control.shortLabel}</span>
          </button>
        );
      })}
    </div>
  );
};

// ─── Main LeftSidebar ──────────────────────────────────────────────────
const LeftSidebar: React.FC = () => {
  const { activeDomain, setActiveDomain } = usePreferencesStore();
  const { openTab } = useAppStore();

  // ─── Dynamic infrastructure tab opener ──────────────────────────────
  const openInfrastructureDetail = (serviceName: string) => {
    const sanitized = serviceName
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
    const tabId = `infra-${sanitized}`;
    openTab(tabId, `${serviceName} Dashboard`, '🖥️');
  };

  // ─── Domain workspace opener ─────────────────────────────────────────
  const openDomainWorkspace = (domainId: string) => {
    const tabId = `domain-${domainId}`;
    const config = DOMAIN_CONFIGS[domainId];
    const label = config ? config.title : domainId;
    openTab(tabId, `${label} Workspace`, '🏛️');
  };

  // ─── Section workspace opener ────────────────────────────────────────
  const openSectionWorkspace = (domainId: string, sectionLabel: string) => {
    const sanitizedSection = sectionLabel.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const tabId = `section-${domainId}-${sanitizedSection}`;
    openTab(tabId, `${sectionLabel}`, '📂');
  };

  // ─── NEW: Generic item detail opener ──────────────────────────────
  const openItemDetail = (domainId: string, itemLabel: string) => {
    const sanitized = itemLabel
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
    const tabId = `item-${domainId}-${sanitized}`;
    openTab(tabId, `${itemLabel} (${domainId})`, '📄');
  };

  // ─── Panel collapse state – default to open (no localStorage read) ──
  const [isPrimaryCollapsed, setIsPrimaryCollapsed] = useState<boolean>(false);

  const handleDomainClick = (domainId: string) => {
    if (isPrimaryCollapsed) {
      setIsPrimaryCollapsed(false);
      localStorage.setItem('leftSidebarPrimaryCollapsed', 'false');
      setActiveDomain(domainId as DomainId);
    } else {
      if (activeDomain === domainId) {
        setIsPrimaryCollapsed(true);
        localStorage.setItem('leftSidebarPrimaryCollapsed', 'true');
      } else {
        setActiveDomain(domainId as DomainId);
      }
    }
  };

  const [panelWidth, setPanelWidth] = useState<number>(() => {
    const stored = localStorage.getItem('leftSidebarWidth');
    return stored ? parseInt(stored, 10) : 280;
  });
  const [isResizing, setIsResizing] = useState(false);
  const startXRef = useRef(0);
  const startWidthRef = useRef(panelWidth);

  useEffect(() => {
    localStorage.setItem('leftSidebarWidth', String(panelWidth));
  }, [panelWidth]);

  const handleResizeStart = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsResizing(true);
    startXRef.current = e.clientX;
    startWidthRef.current = panelWidth;
    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';
  };

  useEffect(() => {
    const handleResizeMove = (e: MouseEvent) => {
      if (!isResizing) return;
      const delta = e.clientX - startXRef.current;
      let newWidth = startWidthRef.current + delta;
      newWidth = Math.min(Math.max(newWidth, 160), 480);
      setPanelWidth(newWidth);
    };

    const handleResizeEnd = () => {
      if (isResizing) {
        setIsResizing(false);
        document.body.style.cursor = '';
        document.body.style.userSelect = '';
      }
    };

    if (isResizing) {
      window.addEventListener('mousemove', handleResizeMove);
      window.addEventListener('mouseup', handleResizeEnd);
    }
    return () => {
      window.removeEventListener('mousemove', handleResizeMove);
      window.removeEventListener('mouseup', handleResizeEnd);
    };
  }, [isResizing, panelWidth]);

  // ─── Keyboard shortcuts ──────────────────────────────────────────────
  useEffect(() => {
    const domainIds = [
      'trading', 'infrastructure', 'risk', 'market',
      'research', 'portfolio', 'corei-os', 'executive', 'compliance', 'ai'
    ];
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key >= '1' && e.key <= '9') {
        const idx = parseInt(e.key, 10) - 1;
        if (idx < domainIds.length) {
          e.preventDefault();
          handleDomainClick(domainIds[idx]);
        }
      }
      if ((e.metaKey || e.ctrlKey) && e.key === '0') {
        e.preventDefault();
        handleDomainClick('ai');
      }
      if ((e.metaKey || e.ctrlKey) && e.key === '?') {
        e.preventDefault();
        handleDomainClick('help');
      }
      if ((e.metaKey || e.ctrlKey) && e.key === ',') {
        e.preventDefault();
        handleDomainClick('settings');
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [activeDomain, isPrimaryCollapsed]);

  const dynamicWidth = isPrimaryCollapsed ? 40 : panelWidth;

  return (
    <aside
      className={`left-sidebar-dual ${isPrimaryCollapsed ? 'collapsed' : ''}`}
      style={{ width: dynamicWidth }}
    >
      <ActivityBar
        activeDomain={activeDomain}
        onDomainClick={handleDomainClick}
      />
      <LeftExplorer
        activeDomain={activeDomain}
        onInfrastructureItemClick={openInfrastructureDetail}
        onDomainTitleClick={openDomainWorkspace}
        onSectionTitleClick={openSectionWorkspace}
        onItemClick={openItemDetail}
      />

      {!isPrimaryCollapsed && (
        <div
          className="left-panel-resize-handle"
          onMouseDown={handleResizeStart}
          title="Drag to resize panel"
        />
      )}
    </aside>
  );
};

export default LeftSidebar;

// ─── Export DOMAIN_CONFIGS for use in workspace components ─────────────
export { DOMAIN_CONFIGS };
