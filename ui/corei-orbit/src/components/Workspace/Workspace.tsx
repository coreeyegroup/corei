// src/components/Workspace/Workspace.tsx
import React, { useRef, useEffect, useState, useCallback } from 'react';
import { useAppStore } from '../../store/appStore';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, horizontalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import Dashboard from './views/Dashboard';
import Workflows from './views/Workflows';
import MarketScanner from './views/MarketScanner';
import Positions from './views/Positions';
import ExecutionLogs from './views/ExecutionLogs';
import DepthChart from './views/DepthChart';
import RequestBuilder from './views/RequestBuilder';
import FileExplorer from './views/FileExplorer';
import InfrastructureDetail from './views/InfrastructureDetail';
import DomainWorkspace from './views/DomainWorkspace';
import SectionWorkspace from './views/SectionWorkspace';
import ItemDetail from './views/ItemDetail';
import KubernetesDetail from '../infrastructure/KubernetesDetail';
import PostgreSQLDetail from '../infrastructure/PostgreSQLDetail';
import HelmDetail from '../infrastructure/HelmDetail';
import { BrokerIntelligence } from './views/trading/BrokerIntelligence';
import { BrokerConnectivity } from './views/trading/BrokerConnectivity';
import { BrokerAccounts } from './views/trading/BrokerAccounts';
import './Workspace.css';

interface SortableTabProps { tab: { id: string; label: string; icon: string }; isActive: boolean; onActivate: () => void; onClose: (e: React.MouseEvent) => void; canClose: boolean; }
const SortableTab: React.FC<SortableTabProps> = ({ tab, isActive, onActivate, onClose, canClose }) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: tab.id });
  const style = { transform: CSS.Transform.toString(transform), transition, opacity: isDragging ? 0.4 : 1 };
  return (
    <div ref={setNodeRef} style={style} className={`tab-item ${isActive ? 'active' : ''}`} onClick={onActivate} {...attributes} {...listeners}>
      <span className="tab-icon">{tab.icon}</span>
      <span className="tab-label">{tab.label}</span>
      {canClose && <button className="tab-close" onClick={onClose} title="Close tab">×</button>}
    </div>
  );
};

const WorkspaceToolbar: React.FC<{
  activeTabId: string | null;
  autoRefresh: boolean;
  setAutoRefresh: (val: boolean) => void;
  refreshInterval: number;
  setRefreshInterval: (val: number) => void;
  handleRefresh: () => void;
  refreshing: boolean;
}> = ({ activeTabId, autoRefresh, setAutoRefresh, refreshInterval, setRefreshInterval, handleRefresh, refreshing }) => {
  if (!activeTabId) return null;

  const getUrl = () => window.location.origin + window.location.pathname + '?tab=' + encodeURIComponent(activeTabId) + '&standalone=true';

  // Generate a clean, professional path/breadcrumb from the tab ID
  const getPath = () => {
    if (!activeTabId) return '';
    return activeTabId.split('-').map(part => part.toUpperCase()).join(' / ');
  };

  return (
    <div className="workspace-toolbar">
      {/* LEFT: Important Path / Breadcrumb */}
      <div className="toolbar-path">
        {getPath()}
      </div>

      {/* CENTER: Global Search */}
      <div className="global-search">
        <input type="text" placeholder="Search workspace..." aria-label="Global Search" />
      </div>

      {/* RIGHT: Actions */}
      <div className="toolbar-actions">
        <div className="refresh-controls" title="Auto Refresh Settings">
          <input type="checkbox" checked={autoRefresh} onChange={(e) => setAutoRefresh(e.target.checked)} title="Enable Auto Refresh" />
          <input type="number" min="1" max="3600" value={refreshInterval} onChange={(e) => setRefreshInterval(Number(e.target.value))} title="Set interval in seconds" />
          <span>s</span>
        </div>

        <button type="button" className={`refresh-icon ${refreshing ? 'spinning' : ''}`} onClick={handleRefresh} disabled={refreshing} title="Refresh workspace">⟳</button>

        <div className="icon-actions">
          <button onClick={() => window.open(getUrl(), '_blank')} title="Open in New Tab">⧉</button>
          <button onClick={() => window.open(getUrl(), '_blank', 'width=1400,height=900')} title="Open in New Window">▣</button>
          <button onClick={() => navigator.clipboard.writeText(getUrl())} title="Copy Link">🔗</button>
        </div>
      </div>
    </div>
  );
};

// ─── Main Workspace ─────────────────────────────────────────────────────
const Workspace: React.FC<{ standalone?: boolean }> = ({ standalone = false }) => {
  const { tabs, activeTabId, setActiveTab, closeTab, reorderTabs } = useAppStore();
  const tabBarRef = useRef<HTMLDivElement>(null);
  const activeTabRef = useRef<HTMLDivElement>(null);

  const [autoRefresh, setAutoRefresh] = useState(false);
  const [refreshInterval, setRefreshInterval] = useState(10);
  const [refreshing, setRefreshing] = useState(false);
  const [refreshNonce, setRefreshNonce] = useState(0);

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    setRefreshNonce(prev => prev + 1);
    setTimeout(() => setRefreshing(false), 600);
  }, []);

  useEffect(() => {
    if (!autoRefresh) return;
    const intervalMs = refreshInterval * 1000;
    const timer = window.setInterval(() => handleRefresh(), intervalMs);
    return () => window.clearInterval(timer);
  }, [autoRefresh, refreshInterval, handleRefresh]);

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 8 } }), useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }));

  useEffect(() => {
    if (activeTabRef.current && tabBarRef.current) {
      const tabElement = activeTabRef.current;
      const container = tabBarRef.current;
      const containerRect = container.getBoundingClientRect();
      const tabRect = tabElement.getBoundingClientRect();
      if (tabRect.left < containerRect.left || tabRect.right > containerRect.right) {
        tabElement.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' });
      }
    }
  }, [activeTabId]);

  const componentRegistry: Record<string, React.ComponentType<any>> = {
    'infra-kubernetes': KubernetesDetail, 'infra-kubeadm': KubernetesDetail, 'infra-k3s': KubernetesDetail,
    'infra-kubernetes-kubeadm': KubernetesDetail, 'infra-kubernetes-k3s': KubernetesDetail,
    'infra-postgresql': PostgreSQLDetail, 'infra-helm': HelmDetail,
  };

  const renderView = (viewId: string) => {
    const RegistryComponent = componentRegistry[viewId];
    if (RegistryComponent) {
      if (viewId.startsWith('infra-')) { const serviceName = viewId.replace('infra-', ''); return <RegistryComponent serviceName={serviceName} />; }
      return <RegistryComponent />;
    }
    if (viewId.startsWith('item-trading-broker-connectivity')) return <BrokerConnectivity />;
    if (viewId.startsWith('item-trading-broker-accounts')) return <BrokerAccounts />;
    if (viewId.startsWith('item-trading-broker')) return <BrokerIntelligence />;
    if (viewId.startsWith('domain-')) { const domainId = viewId.replace('domain-', ''); return <DomainWorkspace domainId={domainId} />; }
    if (viewId.startsWith('section-')) { const parts = viewId.split('-'); const domainId = parts[1]; const sectionLabel = parts.slice(2).join('-').replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase()); return <SectionWorkspace domainId={domainId} sectionLabel={sectionLabel} />; }
    if (viewId.startsWith('infra-')) { const serviceKey = viewId.replace('infra-', ''); const serviceName = serviceKey.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase()); return <InfrastructureDetail serviceName={serviceName} />; }
    if (viewId.startsWith('item-')) { const parts = viewId.split('-'); const domainId = parts[1]; const itemLabel = parts.slice(2).join('-').replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase()); return <ItemDetail domainId={domainId} itemLabel={itemLabel} />; }
    switch (viewId) {
      case 'dashboard': return <Dashboard />; case 'workflows': return <Workflows />; case 'scanner': return <MarketScanner />;
      case 'positions': return <Positions />; case 'logs': return <ExecutionLogs />; case 'depth': return <DepthChart />;
      case 'request': return <RequestBuilder />; case 'files': return <FileExplorer />; default: return <Dashboard />;
    }
  };

  const activeTab = tabs.find((tab) => tab.id === activeTabId);
  const handleCloseTab = (e: React.MouseEvent, tabId: string) => { e.stopPropagation(); closeTab(tabId); };
  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIndex = tabs.findIndex((tab) => tab.id === active.id);
    const newIndex = tabs.findIndex((tab) => tab.id === over.id);
    if (oldIndex === -1 || newIndex === -1) return;
    const newTabs = arrayMove(tabs, oldIndex, newIndex);
    reorderTabs(newTabs);
  };

  return (
    <div className="workspace-container">
      {!standalone && (
        <div className="tab-bar" ref={tabBarRef}>
          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={tabs.map((tab) => tab.id)} strategy={horizontalListSortingStrategy}>
              <div className="tabs-scroll">
                {tabs.map((tab) => (
                  <SortableTab key={tab.id} tab={tab} isActive={activeTabId === tab.id} onActivate={() => setActiveTab(tab.id)} onClose={(e) => handleCloseTab(e, tab.id)} canClose={tabs.length > 1} />
                ))}
              </div>
            </SortableContext>
          </DndContext>
        </div>
      )}

      <div className="workspace-content">
        <WorkspaceToolbar
          activeTabId={activeTabId}
          autoRefresh={autoRefresh}
          setAutoRefresh={setAutoRefresh}
          refreshInterval={refreshInterval}
          setRefreshInterval={setRefreshInterval}
          handleRefresh={handleRefresh}
          refreshing={refreshing}
        />
        <div className="workspace-view-container" key={(activeTabId ?? 'none') + refreshNonce}>
          {activeTab ? renderView(activeTab.id) : <div className="view-placeholder">No tab open</div>}
        </div>
      </div>
    </div>
  );
};

export default Workspace;
