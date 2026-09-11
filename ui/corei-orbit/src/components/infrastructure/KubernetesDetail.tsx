// src/components/infrastructure/KubernetesDetail.tsx
import React, { useState, useEffect, useRef } from 'react';
import { useInfrastructureStore } from '../../store/infrastructureStore';
import KubernetesOverview from './kubernetes/KubernetesOverview';
import KubernetesNodes from './kubernetes/KubernetesNodes';
import KubernetesWorkloads from './kubernetes/KubernetesWorkloads';
import KubernetesNetwork from './kubernetes/KubernetesNetwork';
import KubernetesStorage from './kubernetes/KubernetesStorage';
import KubernetesConfig from './kubernetes/KubernetesConfig';
import KubernetesEvents from './kubernetes/KubernetesEvents';
import KubernetesLogs from './kubernetes/KubernetesLogs';
import KubernetesTerminal from './kubernetes/KubernetesTerminal';
import KubernetesAudit from './kubernetes/KubernetesAudit';
import KubernetesOperations from './kubernetes/KubernetesOperations';
import './KubernetesDetail.css';
import { kubernetesUiAdapter } from './kubernetes/kubernetesUiAdapter';

import {
  fetchKubernetesStatus,
  extractKubernetesStatus,
} from '../../services/infrastructureService';

// ─── Inline Tabs (unchanged) ──────────────────────────────────────────
interface TabsProps {
  activeTab: string;
  onChange: (tab: string) => void;
  children: React.ReactNode;
}

const Tabs: React.FC<TabsProps> = ({ activeTab, onChange, children }) => {
  return (
    <div className="tabs">
      {React.Children.map(children, (child) => {
        if (React.isValidElement<TabProps>(child) && child.type === Tab) {
          const tabValue = child.props.value || child.props.label;
          return React.cloneElement(child, {
            active: activeTab === tabValue,
            onClick: () => onChange(tabValue),
          });
        }
        return child;
      })}
    </div>
  );
};

interface TabProps {
  label: string;
  value?: string;
  active?: boolean;
  onClick?: () => void;
}

const Tab: React.FC<TabProps> = ({ label, active, onClick }) => {
  return (
    <button className={`tab ${active ? 'active' : ''}`} onClick={onClick}>
      {label}
    </button>
  );
};
// ──────────────────────────────────────────────────────────────────────

interface KubernetesDetailProps {
  serviceName: string;
}

const KubernetesDetail: React.FC<KubernetesDetailProps> = () => {
  const { services, refresh } = useInfrastructureStore();
  const [activeTab, setActiveTab] = useState('overview');
  const [terminalPod, setTerminalPod] = useState<{ pod: string; namespace: string; container?: string } | null>(null);

  // ─── CHANGED: Use local state for Kubernetes data, not from store ──
  const [k8sData, setK8sData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const intervalRef = useRef<number | null>(null);

  // ─── Polling function ──────────────────────────────────────────────
  const fetchData = async () => {
    try {
      const statusArray = await fetchKubernetesStatus();
      const k8sStatus = extractKubernetesStatus(statusArray);
      if (k8sStatus && k8sStatus.status === 'HEALTHY') {
        setK8sData(k8sStatus.details || {});
        setError(null);
      } else if (k8sStatus) {
        // Status is DEGRADED or other
        setK8sData(k8sStatus.details || {});
        const detailError =
          typeof k8sStatus.details?.error === 'string'
            ? k8sStatus.details.error
            : null;

        setError(detailError || 'Kubernetes status is degraded');
      } else {
        setK8sData(null);
        setError('Kubernetes service not found in status response');
      }
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  // ─── Initial fetch and start polling ──────────────────────────────
  useEffect(() => {
    // Ensure store is loaded (if needed)
    if (services.length === 0) {
      refresh();
    }

    fetchData();

    intervalRef.current = window.setInterval(() => {
      fetchData();
    }, 10000); // 10 seconds

    return () => {
      if (intervalRef.current) window.clearInterval(intervalRef.current);
    };
  }, []); // Run only once on mount

  // ─── Determine service status from store (for badge) ──────────────
  const service = services.find((s) => s.name.toLowerCase() === 'kubernetes');
  const status = service?.status || (k8sData ? 'HEALTHY' : 'UNKNOWN');

  if (loading && !k8sData) {
    return <div className="loading">Loading Kubernetes cluster data...</div>;
  }

  if (error && !k8sData) {
    return <div className="error">Error: {error}</div>;
  }

  const data = k8sData || {};

  // Kubernetes backend → COREI Orbit UI boundary.
  // Preserve the authoritative Kubernetes objects and normalize
  // collection fields so every UI module receives deterministic arrays.
  const clusterInfo =
    data.cluster_info && typeof data.cluster_info === 'object'
      ? data.cluster_info
      : {};

  const clusterVersion =
    clusterInfo.serverVersion?.gitVersion ||
    clusterInfo.version ||
    '—';

  const clusterContext =
    clusterInfo.context ||
    clusterInfo.currentContext ||
    'unknown';

  const nodeStatus = kubernetesUiAdapter.nodes(data.node_status);
  const pods = kubernetesUiAdapter.pods(data.pods);
  const deployments = kubernetesUiAdapter.deployments(data.deployments);
  const statefulsets = kubernetesUiAdapter.statefulsets(data.statefulsets);
  const daemonsets = kubernetesUiAdapter.daemonsets(data.daemonsets);
  const jobs = kubernetesUiAdapter.jobs(data.jobs);
  const cronjobs = kubernetesUiAdapter.cronjobs(data.cronjobs);

  const servicesList = kubernetesUiAdapter.services(data.services);
  const endpoints = kubernetesUiAdapter.endpoints(data.endpoints);
  const ingresses = kubernetesUiAdapter.ingresses(data.ingresses);
  const networkpolicies = kubernetesUiAdapter.networkpolicies(data.networkpolicies);

  const persistentvolumes = kubernetesUiAdapter.persistentvolumes(data.persistentvolumes);
  const persistentvolumeclaims = kubernetesUiAdapter.persistentvolumeclaims(data.persistentvolumeclaims);
  const storageclasses = kubernetesUiAdapter.storageclasses(data.storageclasses);

  const configmaps = kubernetesUiAdapter.configmaps(data.configmaps);
  const secrets = kubernetesUiAdapter.secrets(data.secrets);
  const serviceaccounts = kubernetesUiAdapter.serviceaccounts(data.serviceaccounts);
  const roles = kubernetesUiAdapter.roles(data.roles);
  const rolebindings = kubernetesUiAdapter.rolebindings(data.rolebindings);
  const clusterroles = kubernetesUiAdapter.clusterroles(data.clusterroles);
  const clusterrolebindings = kubernetesUiAdapter.clusterrolebindings(data.clusterrolebindings);

  const events = kubernetesUiAdapter.events(data.events);

  const handleExecPod = (
    pod: string,
    namespace: string,
    container?: string
  ) => {
    setTerminalPod({ pod, namespace, container });
    setActiveTab('terminal');
  };


  return (
    <div className="kubernetes-detail">
      <div className="detail-header">
        <div className="header-left">
          <span className="service-icon">☸️</span>
          <h2>Kubernetes Control Terminal</h2>
          <span className={`status-badge ${status.toLowerCase()}`}>{status}</span>
          <span className="cluster-info">
            {clusterContext} · {clusterVersion}
          </span>
        </div>
        <div className="header-right">
          <button className="refresh-btn" onClick={fetchData} disabled={loading}>
            {loading ? '⟳' : '↻'} Refresh
          </button>
          <span className="last-updated">
            {new Date().toLocaleTimeString()}
          </span>
        </div>
      </div>

      <div className="tabs-container">
        <Tabs activeTab={activeTab} onChange={setActiveTab}>
          <Tab label="Overview" value="overview" />
          <Tab label="Nodes" value="nodes" />
          <Tab label="Workloads" value="workloads" />
          <Tab label="Network" value="network" />
          <Tab label="Storage" value="storage" />
          <Tab label="Config & Security" value="config" />
          <Tab label="Events" value="events" />
            <Tab label="Logs" value="logs" />
          <Tab label="Terminal" value="terminal" />
          <Tab label="Audit" value="audit" />
          <Tab label="Operations" value="ops" />
        </Tabs>
      </div>

      <div className="tab-content">
        {activeTab === 'overview' && <KubernetesOverview data={data} />}
        {activeTab === 'nodes' && <KubernetesNodes nodes={nodeStatus} />}
        {activeTab === 'workloads' && (
          <KubernetesWorkloads
            pods={pods}
            deployments={deployments}
            statefulsets={statefulsets}
            daemonsets={daemonsets}
            jobs={jobs}
            cronjobs={cronjobs}
            onExecPod={handleExecPod}
          />
        )}
        {activeTab === 'network' && (
          <KubernetesNetwork
            services={servicesList}
            endpoints={endpoints}
            ingresses={ingresses}
            networkpolicies={networkpolicies}
          />
        )}
        {activeTab === 'storage' && (
          <KubernetesStorage
            pvs={persistentvolumes}
            pvcs={persistentvolumeclaims}
            storageclasses={storageclasses}
          />
        )}
        {activeTab === 'config' && (
          <KubernetesConfig
            configmaps={configmaps}
            secrets={secrets}
            serviceaccounts={serviceaccounts}
            roles={roles}
            rolebindings={rolebindings}
            clusterroles={clusterroles}
            clusterrolebindings={clusterrolebindings}
          />
        )}
        {activeTab === 'events' && <KubernetesEvents events={events} />}
          {activeTab === 'logs' && <KubernetesLogs pods={pods} />}
        {activeTab === 'terminal' && (
          <div style={{ height: '500px', width: '100%' }}>
            {terminalPod ? (
              <KubernetesTerminal
                pod={terminalPod.pod}
                namespace={terminalPod.namespace}
                container={terminalPod.container}
                onClose={() => setTerminalPod(null)}
              />
            ) : (
              <div style={{ padding: '16px' }}>
                <p>Select a pod from the Workloads → Pods table to open a terminal, or enter details below:</p>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
                  <input placeholder="Pod name" id="pod-name" style={{ padding: '4px 8px' }} />
                  <input placeholder="Namespace" id="pod-namespace" defaultValue="default" style={{ padding: '4px 8px' }} />
                  <input placeholder="Container (optional)" id="pod-container" style={{ padding: '4px 8px' }} />
                  <button onClick={() => {
                    const name = (document.getElementById('pod-name') as HTMLInputElement)?.value;
                    const ns = (document.getElementById('pod-namespace') as HTMLInputElement)?.value || 'default';
                    const container = (document.getElementById('pod-container') as HTMLInputElement)?.value || undefined;
                    if (name) {
                      setTerminalPod({ pod: name, namespace: ns, container });
                      setActiveTab('terminal');
                    }
                  }}>Open Terminal</button>
                </div>
              </div>
            )}
          </div>
        )}
        {activeTab === 'audit' && <KubernetesAudit />}
        {activeTab === 'ops' && <KubernetesOperations />}
      </div>
    </div>
  );
};

export default KubernetesDetail;
