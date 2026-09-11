// src/components/infrastructure/kubernetes/KubernetesOverview.tsx
// COREI institutional Kubernetes overview — clean, neat, readable.
// Full labels, disciplined spacing, muted palette.
// Presentation-only surface. No API calls, no runtime state.

import React, { useMemo, useState } from 'react';
import './KubernetesOverview.css';

interface KubernetesOverviewProps {
  data: any;
}

type AnyRecord = Record<string, any>;
type Tone = 'neutral' | 'positive' | 'warning' | 'critical';

/* ------------------------------------------------------------------ */
/* Coercion                                                            */
/* ------------------------------------------------------------------ */

const arr = (v: unknown): AnyRecord[] => (Array.isArray(v) ? (v as AnyRecord[]) : []);

const numberValue = (v: unknown): number => {
  if (typeof v === 'number' && Number.isFinite(v)) return v;
  if (typeof v === 'string') {
    const n = Number(v.replace(/,/g, ''));
    return Number.isFinite(n) ? n : 0;
  }
  return 0;
};

const quantityNumber = (v: unknown): number => {
  if (typeof v === 'number' && Number.isFinite(v)) return v;
  if (typeof v !== 'string') return 0;
  const m = v.trim().match(/^(-?\d+(?:\.\d+)?)([a-zA-Z]*)$/);
  if (!m) return 0;
  const n = Number(m[1]);
  const s = m[2];
  if (!Number.isFinite(n)) return 0;
  if (s === 'm') return n / 1000;
  if (s === 'Ki') return n / 1024;
  if (s === 'Mi') return n;
  if (s === 'Gi') return n * 1024;
  if (s === 'Ti') return n * 1024 * 1024;
  if (s === 'K') return n / 1000;
  if (s === 'M') return n;
  if (s === 'G') return n * 1024;
  if (s === 'T') return n * 1024 * 1024;
  return n;
};

const fmtInt = (n: number): string =>
  new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(n);

const fmtCpu = (v: unknown): string => {
  if (typeof v === 'string' && v.trim()) {
    if (v.endsWith('m')) return `${fmtInt(quantityNumber(v) * 1000)}m`;
    return v;
  }
  return fmtInt(quantityNumber(v));
};

const fmtMem = (v: unknown): string => {
  if (typeof v === 'string' && v.trim()) {
    if (v.endsWith('Ki')) {
      const g = quantityNumber(v) / 1024;
      return g >= 1 ? `${g.toFixed(1)} GiB` : v;
    }
    if (v.endsWith('Mi')) return `${Number(v.slice(0, -2)).toFixed(0)} MiB`;
    if (v.endsWith('Gi')) return v.replace('Gi', ' GiB');
    return v;
  }
  const g = quantityNumber(v) / 1024 / 1024;
  return g > 0 ? `${g.toFixed(1)} GiB` : '—';
};

const ageFrom = (ts: unknown): string => {
  if (typeof ts !== 'string') return '—';
  const t = Date.parse(ts);
  if (!Number.isFinite(t)) return '—';
  const s = Math.max(0, Math.floor((Date.now() - t) / 1000));
  if (s < 60) return `${s}s`;
  const m = Math.floor(s / 60);
  if (m < 60) return `${m}m`;
  const h = Math.floor(m / 60);
  if (h < 48) return `${h}h`;
  return `${Math.floor(h / 24)}d`;
};

/* ------------------------------------------------------------------ */
/* Accessors                                                           */
/* ------------------------------------------------------------------ */

const condState = (node: AnyRecord, type: string): string => {
  const c = arr(node.conditions).find((i) => i.type === type);
  return c ? String(c.status ?? 'Unknown') : '—';
};

const nodeReady = (node: AnyRecord): boolean => {
  const r = arr(node.conditions).find((i) => i.type === 'Ready');
  if (r) return String(r.status).toLowerCase() === 'true';
  const s = String(node.ready ?? node.status ?? '').toLowerCase();
  return s === 'true' || s === 'ready' || s === 'healthy';
};

const nodeRole = (node: AnyRecord): string => {
  const l = node.labels || {};
  if (l['node-role.kubernetes.io/control-plane'] !== undefined) return 'control-plane';
  if (l['node-role.kubernetes.io/master'] !== undefined) return 'control-plane';
  return String(node.role ?? 'worker');
};

const nodeIp = (node: AnyRecord): string => {
  const d = node.internal_ip ?? node.internalIP;
  if (d) return String(d);
  const a = arr(node.addresses).find((i) => i.type === 'InternalIP');
  return String(a?.address ?? '—');
};

const podState = (pod: AnyRecord): string => {
  const s = String(pod.status ?? pod.phase ?? 'Unknown').toLowerCase();
  if (s.includes('running')) return 'Running';
  if (s.includes('pending')) return 'Pending';
  if (s.includes('succeed') || s === 'completed') return 'Succeeded';
  if (s.includes('fail') || s.includes('error')) return 'Failed';
  return 'Unknown';
};

const sumNode = (
  nodes: AnyRecord[],
  field: 'capacity' | 'allocatable',
  resource: string
): number => nodes.reduce((s, n) => s + quantityNumber(n[field]?.[resource]), 0);

/* ------------------------------------------------------------------ */
/* Primitives                                                          */
/* ------------------------------------------------------------------ */

const tc = (t: Tone): string => `k8s-is-${t}`;

const Pill: React.FC<{ tone: Tone; children: React.ReactNode }> = ({ tone, children }) => (
  <span className={`k8s-pill ${tc(tone)}`}>{children}</span>
);

const Bar: React.FC<{ pct: number; tone?: Tone }> = ({ pct, tone = 'neutral' }) => (
  <span className={`k8s-bar ${tc(tone)}`}>
    <span style={{ width: `${Math.min(100, Math.max(0, pct))}%` }} />
  </span>
);

const Panel: React.FC<{
  title: string;
  meta?: React.ReactNode;
  tone?: Tone;
  className?: string;
  children: React.ReactNode;
}> = ({ title, meta, tone = 'neutral', className = '', children }) => (
  <section className={`k8s-panel ${tc(tone)} ${className}`}>
    <header className="k8s-panel-head">
      <span className="k8s-panel-title">{title}</span>
      {meta !== undefined && <span className="k8s-panel-meta">{meta}</span>}
    </header>
    <div className="k8s-panel-body">{children}</div>
  </section>
);

/* ------------------------------------------------------------------ */
/* Component                                                           */
/* ------------------------------------------------------------------ */

const KubernetesOverview: React.FC<KubernetesOverviewProps> = ({ data }) => {
  const source = (data || {}) as AnyRecord;

  const [nodeQuery, setNodeQuery] = useState('');
  const [eventQuery, setEventQuery] = useState('');
  const [eventFilter, setEventFilter] = useState<'all' | 'warning'>('all');

  const nodes = arr(source.node_status);
  const pods = arr(source.pods);
  const deployments = arr(source.deployments);
  const statefulsets = arr(source.statefulsets);
  const daemonsets = arr(source.daemonsets);
  const jobs = arr(source.jobs);
  const cronjobs = arr(source.cronjobs);
  const services = arr(source.services);
  const endpoints = arr(source.endpoints);
  const ingresses = arr(source.ingresses);
  const networkPolicies = arr(source.networkpolicies);
  const persistentVolumes = arr(source.persistentvolumes);
  const persistentClaims = arr(source.persistentvolumeclaims);
  const storageClasses = arr(source.storageclasses);
  const configMaps = arr(source.configmaps);
  const secrets = arr(source.secrets);
  const serviceAccounts = arr(source.serviceaccounts);
  const roles = arr(source.roles);
  const roleBindings = arr(source.rolebindings);
  const clusterRoles = arr(source.clusterroles);
  const clusterRoleBindings = arr(source.clusterrolebindings);
  const events = arr(source.events);

  const capacityCpu = source.total_capacity?.cpu ?? sumNode(nodes, 'capacity', 'cpu');
  const allocCpu = source.total_allocatable?.cpu ?? sumNode(nodes, 'allocatable', 'cpu');
  const capacityMem = source.total_capacity?.memory ?? sumNode(nodes, 'capacity', 'memory');
  const allocMem = source.total_allocatable?.memory ?? sumNode(nodes, 'allocatable', 'memory');
  const capacityPods = numberValue(source.total_capacity?.pods) || sumNode(nodes, 'capacity', 'pods');
  const allocPods = numberValue(source.total_allocatable?.pods) || sumNode(nodes, 'allocatable', 'pods');

  const podCounts = pods.reduce(
    (acc, pod) => { acc[podState(pod)] += 1; return acc; },
    { Running: 0, Pending: 0, Failed: 0, Succeeded: 0, Unknown: 0 } as Record<string, number>
  );

  const restarts = pods.reduce((s, p) => s + numberValue(p.restarts ?? p.restartCount), 0);

  const depDesired = deployments.reduce(
    (s, d) => s + numberValue(d.replicas ?? d.spec?.replicas ?? d.desired), 0);
  const depReady = deployments.reduce(
    (s, d) => s + numberValue(d.ready ?? d.readyReplicas ?? d.status?.readyReplicas), 0);
  const depUnready = Math.max(0, depDesired - depReady);

  const readyNodes = nodes.filter(nodeReady).length;
  const unschedNodes = nodes.filter((n) => n.unschedulable === true).length;

  const critEvents = events.filter((e) => {
    const t = String(e.type ?? '').toLowerCase();
    return t === 'warning' || t === 'error' || t === 'critical';
  }).length;

  const recentEvents = useMemo(() =>
    [...events].sort((a, b) => {
      const at = Date.parse(String(a.lastTimestamp || a.eventTime || a.firstTimestamp || ''));
      const bt = Date.parse(String(b.lastTimestamp || b.eventTime || b.firstTimestamp || ''));
      return bt - at;
    }), [events]);

  const fNodes = useMemo(() => {
    const q = nodeQuery.trim().toLowerCase();
    if (!q) return nodes;
    return nodes.filter((n) => {
      const h = [n.name, nodeIp(n), nodeRole(n), n.nodeInfo?.containerRuntimeVersion]
        .filter(Boolean).join(' ').toLowerCase();
      return h.includes(q);
    });
  }, [nodes, nodeQuery]);

  const fEvents = useMemo(() => {
    const q = eventQuery.trim().toLowerCase();
    let list = recentEvents;
    if (eventFilter === 'warning') {
      list = list.filter((e) => String(e.type ?? '').toLowerCase() !== 'normal');
    }
    if (!q) return list;
    return list.filter((e) => {
      const h = [e.namespace, e.reason, e.object, e.name, e.message, e.involvedObject?.name]
        .filter(Boolean).join(' ').toLowerCase();
      return h.includes(q);
    });
  }, [recentEvents, eventQuery, eventFilter]);

  const namespaces = useMemo(() => {
    const m = new Map<string, number>();
    pods.forEach((p) => {
      const ns = String(p.namespace ?? 'default');
      m.set(ns, (m.get(ns) || 0) + 1);
    });
    return [...m.entries()].sort((a, b) => b[1] - a[1]).slice(0, 8);
  }, [pods]);

  const nodeTone: Tone =
    nodes.length === 0 ? 'neutral'
    : readyNodes === nodes.length ? 'positive'
    : readyNodes === 0 ? 'critical'
    : 'warning';

  const podsTone: Tone =
    podCounts.Failed > 0 ? 'critical'
    : podCounts.Pending > 0 ? 'warning'
    : 'positive';

  const eventsTone: Tone =
    critEvents > 5 ? 'critical'
    : critEvents > 0 ? 'warning'
    : 'positive';

  const cpuPct = quantityNumber(capacityCpu) > 0
    ? Math.round((quantityNumber(allocCpu) / quantityNumber(capacityCpu)) * 100) : 0;
  const memPct = quantityNumber(capacityMem) > 0
    ? Math.round((quantityNumber(allocMem) / quantityNumber(capacityMem)) * 100) : 0;
  const podPct = capacityPods > 0 ? Math.round((allocPods / capacityPods) * 100) : 0;
  const podTotal = pods.length || 1;
  const pctOf = (n: number) => Math.round((n / podTotal) * 100);

  /* Full-word inventory labels — no abbreviations */
  const inventory: Array<[string, number]> = [
    ['Nodes', nodes.length],
    ['Pods', pods.length],
    ['Deployments', deployments.length],
    ['StatefulSets', statefulsets.length],
    ['DaemonSets', daemonsets.length],
    ['Jobs', jobs.length],
    ['CronJobs', cronjobs.length],
    ['Services', services.length],
    ['Endpoints', endpoints.length],
    ['Ingresses', ingresses.length],
    ['Network Policies', networkPolicies.length],
    ['Persistent Volumes', persistentVolumes.length],
    ['Persistent Claims', persistentClaims.length],
    ['Storage Classes', storageClasses.length],
    ['ConfigMaps', configMaps.length],
    ['Secrets', secrets.length],
    ['Service Accounts', serviceAccounts.length],
    ['Roles', roles.length],
    ['Role Bindings', roleBindings.length],
    ['Cluster Roles', clusterRoles.length],
    ['Cluster Bindings', clusterRoleBindings.length],
    ['Events', events.length],
  ];

  return (
    <div className="k8s-overview">

      {/* ==================== RIBBON ==================== */}
      <div className="k8s-ribbon">
        <div className={`k8s-rc ${tc(nodeTone)}`}>
          <span className="k8s-rc-label">Nodes Ready</span>
          <span className="k8s-rc-value">{readyNodes}<i> / {nodes.length}</i></span>
          <span className="k8s-rc-sub">{unschedNodes} unschedulable</span>
        </div>
        <div className={`k8s-rc ${tc(podsTone)}`}>
          <span className="k8s-rc-label">Pods</span>
          <span className="k8s-rc-value">{fmtInt(pods.length)}</span>
          <span className="k8s-rc-sub">{podCounts.Running} running · {podCounts.Pending} pending</span>
        </div>
        <div className="k8s-rc k8s-is-neutral">
          <span className="k8s-rc-label">Deployments</span>
          <span className="k8s-rc-value">{deployments.length}</span>
          <span className="k8s-rc-sub">{depReady} of {depDesired} ready</span>
        </div>
        <div className="k8s-rc k8s-is-neutral">
          <span className="k8s-rc-label">Services</span>
          <span className="k8s-rc-value">{services.length}</span>
          <span className="k8s-rc-sub">{endpoints.length} endpoints</span>
        </div>
        <div className="k8s-rc k8s-is-neutral">
          <span className="k8s-rc-label">Storage</span>
          <span className="k8s-rc-value">{persistentVolumes.length}</span>
          <span className="k8s-rc-sub">{persistentClaims.length} claims</span>
        </div>
        <div className={`k8s-rc ${tc(podCounts.Failed > 0 ? 'critical' : 'positive')}`}>
          <span className="k8s-rc-label">Failed Pods</span>
          <span className="k8s-rc-value">{podCounts.Failed}</span>
          <span className="k8s-rc-sub">{podCounts.Failed > 0 ? 'attention required' : 'nominal'}</span>
        </div>
        <div className={`k8s-rc ${tc(restarts > 0 ? 'warning' : 'positive')}`}>
          <span className="k8s-rc-label">Restarts</span>
          <span className="k8s-rc-value">{fmtInt(restarts)}</span>
          <span className="k8s-rc-sub">container restarts</span>
        </div>
        <div className={`k8s-rc ${tc(eventsTone)}`}>
          <span className="k8s-rc-label">Events</span>
          <span className="k8s-rc-value">{events.length}</span>
          <span className="k8s-rc-sub">{critEvents} warnings</span>
        </div>
      </div>

      {/* ==================== RESOURCE INVENTORY ==================== */}
      <div className="k8s-inventory-bar">
        <header className="k8s-inventory-head">
          <span className="k8s-inventory-title">Resource Inventory</span>
          <span className="k8s-inventory-meta">Live object counts across all namespaces</span>
        </header>
        <div className="k8s-inv">
          {inventory.map(([label, value]) => (
            <div className="k8s-inv-cell" key={label}>
              <span className="k8s-inv-label">{label}</span>
              <span className="k8s-inv-value">{fmtInt(numberValue(value))}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ==================== 3-COLUMN BODY ==================== */}
      <div className="k8s-body">

        {/* ---------------- LEFT ---------------- */}
        <div className="k8s-col k8s-col-left">

          <Panel title="Capacity" meta="allocatable / capacity" tone="neutral" className="k8s-p-cap">
            <div className="k8s-caps">
              <div className="k8s-cap">
                <div className="k8s-cap-row">
                  <span className="k8s-cap-name">CPU</span>
                  <span className="k8s-cap-val">{fmtCpu(allocCpu)} <i>/ {fmtCpu(capacityCpu)}</i></span>
                  <span className="k8s-cap-pct">{cpuPct}%</span>
                </div>
                <div className="k8s-cap-bar">
                  <div style={{ width: `${cpuPct}%` }} />
                  <i className="k8s-tick" style={{ left: '80%' }} />
                </div>
              </div>
              <div className="k8s-cap">
                <div className="k8s-cap-row">
                  <span className="k8s-cap-name">MEM</span>
                  <span className="k8s-cap-val">{fmtMem(allocMem)} <i>/ {fmtMem(capacityMem)}</i></span>
                  <span className="k8s-cap-pct">{memPct}%</span>
                </div>
                <div className="k8s-cap-bar">
                  <div style={{ width: `${memPct}%` }} />
                  <i className="k8s-tick" style={{ left: '80%' }} />
                </div>
              </div>
              <div className="k8s-cap">
                <div className="k8s-cap-row">
                  <span className="k8s-cap-name">PODS</span>
                  <span className="k8s-cap-val">{fmtInt(allocPods)} <i>/ {fmtInt(capacityPods)}</i></span>
                  <span className="k8s-cap-pct">{podPct}%</span>
                </div>
                <div className="k8s-cap-bar">
                  <div style={{ width: `${podPct}%` }} />
                  <i className="k8s-tick" style={{ left: '80%' }} />
                </div>
              </div>
            </div>
          </Panel>

          <Panel title="Pod States" meta={fmtInt(pods.length)} tone={podsTone} className="k8s-p-states">
            <div className="k8s-states">
              {[
                { tone: 'positive' as Tone, label: 'Running', n: podCounts.Running },
                { tone: 'warning' as Tone, label: 'Pending', n: podCounts.Pending },
                { tone: 'critical' as Tone, label: 'Failed', n: podCounts.Failed },
                { tone: 'neutral' as Tone, label: 'Succeeded', n: podCounts.Succeeded },
                { tone: 'neutral' as Tone, label: 'Unknown', n: podCounts.Unknown },
              ].map(({ tone, label, n }) => (
                <div className={`k8s-state-row ${tc(tone)}`} key={label}>
                  <i className="k8s-state-dot" />
                  <span className="k8s-state-name">{label}</span>
                  <Bar pct={pctOf(n)} tone={tone} />
                  <span className="k8s-state-n">{fmtInt(n)}</span>
                </div>
              ))}
            </div>
          </Panel>

          <Panel title="Namespaces" meta={`top ${namespaces.length} by pod count`} tone="neutral" className="k8s-p-ns">
            <div className="k8s-ns-scroll">
              {namespaces.length === 0 ? (
                <div className="k8s-empty-mini">No namespaces</div>
              ) : (
                <div className="k8s-ns">
                  {namespaces.map(([ns, count]) => (
                    <div className="k8s-ns-row" key={ns}>
                      <span className="k8s-ns-name" title={ns}>{ns}</span>
                      <Bar pct={(count / podTotal) * 100} tone="neutral" />
                      <span className="k8s-ns-count">{count}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </Panel>

        </div>

        {/* ---------------- CENTER ---------------- */}
        <div className="k8s-col k8s-col-center">
          <Panel
            title="Node Condition Matrix"
            meta={`${readyNodes} of ${nodes.length} ready`}
            tone={nodeTone}
            className="k8s-p-nodes"
          >
            <div className="k8s-tools">
              <input
                type="text"
                className="k8s-input"
                placeholder="Filter nodes by name, IP, role, or version…"
                value={nodeQuery}
                onChange={(e) => setNodeQuery(e.target.value)}
              />
              <span className="k8s-tools-count">{fNodes.length} of {nodes.length}</span>
            </div>
            <div className="k8s-table-wrap">
              <table className="k8s-table">
                <colgroup>
                  <col style={{ width: '18%' }} />
                  <col style={{ width: '13%' }} />
                  <col style={{ width: '12%' }} />
                  <col style={{ width: '8%' }} />
                  <col style={{ width: '7%' }} />
                  <col style={{ width: '7%' }} />
                  <col style={{ width: '7%' }} />
                  <col style={{ width: '7%' }} />
                  <col style={{ width: '7%' }} />
                  <col style={{ width: '8%' }} />
                  <col style={{ width: '6%' }} />
                </colgroup>
                <thead>
                  <tr>
                    <th>Node</th>
                    <th>Internal IP</th>
                    <th>Role</th>
                    <th>Ready</th>
                    <th>Memory</th>
                    <th>Disk</th>
                    <th>PID</th>
                    <th>Network</th>
                    <th>Scheduling</th>
                    <th>Kubelet</th>
                    <th>Runtime</th>
                  </tr>
                </thead>
                <tbody>
                  {fNodes.length === 0 ? (
                    <tr><td colSpan={11} className="k8s-empty">No nodes match filter</td></tr>
                  ) : fNodes.map((node, i) => {
                    const ready = nodeReady(node);
                    const mem = condState(node, 'MemoryPressure');
                    const disk = condState(node, 'DiskPressure');
                    const pid = condState(node, 'PIDPressure');
                    const net = condState(node, 'NetworkUnavailable');
                    const pt = (v: string): Tone => {
                      const s = v.toLowerCase();
                      if (s === 'true') return 'critical';
                      if (s === 'false') return 'positive';
                      return 'neutral';
                    };
                    const lbl = (v: string, ok: string, bad: string) => {
                      if (v === 'False') return ok;
                      if (v === 'True') return bad;
                      return v.toUpperCase();
                    };
                    return (
                      <tr key={`${String(node.name ?? 'n')}-${i}`}>
                        <td className="k8s-td-strong" title={String(node.name ?? '—')}>
                          {String(node.name ?? '—')}
                        </td>
                        <td className="k8s-mono">{nodeIp(node)}</td>
                        <td className="k8s-role">{nodeRole(node)}</td>
                        <td><Pill tone={ready ? 'positive' : 'critical'}>{ready ? 'ready' : 'fail'}</Pill></td>
                        <td><Pill tone={pt(mem)}>{lbl(mem, 'ok', 'press')}</Pill></td>
                        <td><Pill tone={pt(disk)}>{lbl(disk, 'ok', 'press')}</Pill></td>
                        <td><Pill tone={pt(pid)}>{lbl(pid, 'ok', 'press')}</Pill></td>
                        <td><Pill tone={pt(net)}>{lbl(net, 'ok', 'down')}</Pill></td>
                        <td><Pill tone={node.unschedulable ? 'warning' : 'positive'}>{node.unschedulable ? 'off' : 'on'}</Pill></td>
                        <td className="k8s-mono">{String(node.nodeInfo?.kubeletVersion ?? node.kubelet ?? '—')}</td>
                        <td className="k8s-mono">{String(node.nodeInfo?.containerRuntimeVersion ?? node.runtime ?? '—').replace(/^containerd:\/\//, '')}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </Panel>
        </div>

        {/* ---------------- RIGHT ---------------- */}
        <div className="k8s-col k8s-col-right">

          <Panel title="Alert Summary" meta={`${critEvents} warnings`} tone={eventsTone} className="k8s-p-alerts">
            <div className="k8s-alerts">
              <div className={`k8s-alert ${tc(podCounts.Failed > 0 ? 'critical' : 'positive')}`}>
                <span>Failed Pods</span>
                <strong>{podCounts.Failed}</strong>
              </div>
              <div className={`k8s-alert ${tc(restarts > 0 ? 'warning' : 'positive')}`}>
                <span>Restarts</span>
                <strong>{fmtInt(restarts)}</strong>
              </div>
              <div className={`k8s-alert ${tc(depUnready > 0 ? 'warning' : 'positive')}`}>
                <span>Unready</span>
                <strong>{depUnready}</strong>
              </div>
              <div className={`k8s-alert ${tc(unschedNodes > 0 ? 'warning' : 'positive')}`}>
                <span>Unschedulable</span>
                <strong>{unschedNodes}</strong>
              </div>
            </div>
          </Panel>

          <Panel
            title="Event Stream"
            meta={`${fEvents.length} of ${events.length}`}
            tone={eventsTone}
            className="k8s-p-events"
          >
            <div className="k8s-tools">
              <input
                type="text"
                className="k8s-input"
                placeholder="Filter events by namespace, reason, or object…"
                value={eventQuery}
                onChange={(e) => setEventQuery(e.target.value)}
              />
              <div className="k8s-chips">
                <button
                  type="button"
                  className={`k8s-chip ${eventFilter === 'all' ? 'is-active' : ''}`}
                  onClick={() => setEventFilter('all')}
                >All</button>
                <button
                  type="button"
                  className={`k8s-chip k8s-chip-warn ${eventFilter === 'warning' ? 'is-active' : ''}`}
                  onClick={() => setEventFilter('warning')}
                >Warnings</button>
              </div>
            </div>
            <div className="k8s-feed">
              {fEvents.length === 0 ? (
                <div className="k8s-empty-mini">No events match filter</div>
              ) : fEvents.map((event, i) => {
                const type = String(event.type ?? event.severity ?? 'Normal');
                const warn = type.toLowerCase() !== 'normal';
                const reason = String(event.reason ?? '—');
                const obj = String(event.object ?? event.involvedObject?.name ?? event.name ?? '—');
                const ns = String(event.namespace ?? '—');
                const msg = String(event.message ?? '—');
                const age = ageFrom(event.lastTimestamp || event.eventTime || event.firstTimestamp || event.creationTimestamp);
                return (
                  <div
                    className={`k8s-feed-item ${warn ? 'is-warning' : 'is-normal'}`}
                    key={`${String(event.uid ?? event.name ?? 'e')}-${i}`}
                  >
                    <div className="k8s-feed-head">
                      <span className="k8s-feed-age">{age}</span>
                      <Pill tone={warn ? 'critical' : 'positive'}>{type.toUpperCase()}</Pill>
                      <span className="k8s-feed-ns" title={ns}>{ns}</span>
                    </div>
                    <div className="k8s-feed-reason" title={reason}>{reason}</div>
                    <div className="k8s-feed-obj" title={obj}>{obj}</div>
                    <div className="k8s-feed-msg" title={msg}>{msg}</div>
                  </div>
                );
              })}
            </div>
          </Panel>

        </div>

      </div>

      {/* ==================== FOOTER ==================== */}
      <footer className="k8s-footer">
        <span className="k8s-footer-live"><i /> live</span>
        <span>Nodes <b>{nodes.length}</b></span>
        <span>Pods <b>{fmtInt(pods.length)}</b></span>
        <span>Deployments <b>{deployments.length}</b></span>
        <span>Services <b>{services.length}</b></span>
        <span>Events <b>{events.length}</b></span>
        <span className={critEvents > 0 ? 'is-warning-text' : ''}>
          Warnings <b>{critEvents}</b>
        </span>
        <span className="k8s-footer-tail">
          Capacity and allocatable are separate from utilization
        </span>
      </footer>

    </div>
  );
};

export default KubernetesOverview;
