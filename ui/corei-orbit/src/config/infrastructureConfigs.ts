// src/config/infrastructureConfigs.ts
export type PanelType = 'stat' | 'status-grid' | 'table' | 'ticker' | 'log' | 'custom';

export interface PanelDefinition {
  type: PanelType;
  title?: string;
  source: string;
  gridCols?: number;
  columns?: Array<{ key: string; label: string }>;
  refreshInterval?: number;
}

// ─── Operation Definition ──────────────────────────────────────────────
export interface OperationParam {
  name: string;
  label: string;
  type: 'text' | 'number' | 'select' | 'boolean';
  required?: boolean;
  options?: string[];
  default?: any;
}

export interface OperationDefinition {
  id: string;
  label: string;
  icon?: string;
  description?: string;
  type: 'api' | 'command' | 'kubectl' | 'script';
  endpoint: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  confirm?: boolean;
  params?: OperationParam[];
  refreshAfter?: boolean;
}

export interface ServiceConfig {
  displayName: string;
  icon: string;
  panels: PanelDefinition[];
  defaultColumns?: Array<{ key: string; label: string }>;
  operations?: OperationDefinition[];
}

export const INFRASTRUCTURE_ITEM_CONFIGS: Record<string, ServiceConfig> = {
  // ─── Existing services ──────────────────────────────────────────────
  postgresql: {
    displayName: 'PostgreSQL',
    icon: '🐘',
    panels: [
      { type: 'stat', source: 'connections', title: 'Connections', gridCols: 2 },
      { type: 'stat', source: 'size', title: 'Database Size', gridCols: 2 },
      { type: 'stat', source: 'cache_hit', title: 'Cache Hit Ratio', gridCols: 2 },
      { type: 'stat', source: 'tps', title: 'Transactions/sec', gridCols: 2 },
      { type: 'table', source: 'active_queries', title: 'Active Queries' },
    ],
    operations: [
      {
        id: 'restart',
        label: 'Restart Database',
        icon: '🔄',
        type: 'api',
        endpoint: '/api/v1/infrastructure/postgres/restart',
        method: 'POST',
        confirm: true,
        refreshAfter: true,
      },
      {
        id: 'run-vacuum',
        label: 'Run VACUUM',
        icon: '🧹',
        type: 'api',
        endpoint: '/api/v1/infrastructure/postgres/vacuum',
        method: 'POST',
        params: [{ name: 'table', label: 'Table Name (optional)', type: 'text' }],
        refreshAfter: true,
      },
      {
        id: 'run-analyze',
        label: 'Run ANALYZE',
        icon: '📊',
        type: 'api',
        endpoint: '/api/v1/infrastructure/postgres/analyze',
        method: 'POST',
        params: [{ name: 'table', label: 'Table Name (optional)', type: 'text' }],
        refreshAfter: true,
      },
      {
        id: 'take-backup',
        label: 'Take Backup',
        icon: '💾',
        type: 'api',
        endpoint: '/api/v1/infrastructure/postgres/backup',
        method: 'POST',
        confirm: true,
        params: [
          {
            name: 'format',
            label: 'Format',
            type: 'select',
            options: ['plain', 'custom', 'directory'],
            default: 'plain',
          },
        ],
        refreshAfter: false,
      },
    ],
  },

  kafka: {
    displayName: 'Apache Kafka',
    icon: '📨',
    panels: [
      { type: 'stat', source: 'topics', title: 'Topics', gridCols: 2 },
      { type: 'stat', source: 'partitions', title: 'Partitions', gridCols: 2 },
      { type: 'stat', source: 'brokers', title: 'Brokers', gridCols: 2 },
      { type: 'stat', source: 'messages', title: 'Messages/sec', gridCols: 2 },
      { type: 'table', source: 'consumer_groups', title: 'Consumer Groups' },
      { type: 'table', source: 'partitions_detail', title: 'Partition Details' },
    ],
    operations: [
      {
        id: 'create-topic',
        label: 'Create Topic',
        icon: '➕',
        type: 'api',
        endpoint: '/api/v1/infrastructure/kafka/topics',
        method: 'POST',
        params: [
          { name: 'topic', label: 'Topic Name', type: 'text', required: true },
          { name: 'partitions', label: 'Partitions', type: 'number', default: 3 },
          { name: 'replication', label: 'Replication Factor', type: 'number', default: 1 },
        ],
        refreshAfter: true,
      },
      {
        id: 'delete-topic',
        label: 'Delete Topic',
        icon: '❌',
        type: 'api',
        endpoint: '/api/v1/infrastructure/kafka/topics',
        method: 'DELETE',
        confirm: true,
        params: [{ name: 'topic', label: 'Topic Name', type: 'text', required: true }],
        refreshAfter: true,
      },
      {
        id: 'reset-consumer-offset',
        label: 'Reset Consumer Offset',
        icon: '🔄',
        type: 'api',
        endpoint: '/api/v1/infrastructure/kafka/reset-offset',
        method: 'POST',
        params: [
          { name: 'group', label: 'Consumer Group', type: 'text', required: true },
          { name: 'topic', label: 'Topic', type: 'text', required: true },
          {
            name: 'offset',
            label: 'Offset',
            type: 'select',
            required: true,
            options: ['earliest', 'latest', 'custom'],
          },
          { name: 'customOffset', label: 'Custom Offset', type: 'number' },
        ],
        refreshAfter: true,
      },
    ],
  },

  kubernetes: {
    displayName: 'Kubernetes',
    icon: '☸️',
    panels: [
      { type: 'stat', source: 'nodes', title: 'Nodes', gridCols: 2 },
      { type: 'stat', source: 'pods', title: 'Pods', gridCols: 2 },
      { type: 'stat', source: 'services', title: 'Services', gridCols: 2 },
      { type: 'stat', source: 'cpu_usage', title: 'CPU Usage', gridCols: 2 },
      { type: 'stat', source: 'memory_usage', title: 'Memory Usage', gridCols: 2 },
      { type: 'status-grid', source: 'node_status', title: 'Node Status' },
    ],
    operations: [
      {
        id: 'scale-deployment',
        label: 'Scale Deployment',
        icon: '⬆️',
        type: 'api',
        endpoint: '/api/v1/infrastructure/kubernetes/scale',
        method: 'POST',
        confirm: true,
        params: [
          {
            name: 'deployment',
            label: 'Deployment Name',
            type: 'select',
            required: true,
            options: ['nginx', 'redis', 'postgres'],
          },
          { name: 'replicas', label: 'Replicas', type: 'number', required: true, default: 3 },
        ],
        refreshAfter: true,
      },
      {
        id: 'restart-pod',
        label: 'Restart Pod',
        icon: '🔄',
        type: 'api',
        endpoint: '/api/v1/infrastructure/kubernetes/restart',
        method: 'POST',
        confirm: true,
        params: [{ name: 'pod', label: 'Pod Name', type: 'text', required: true }],
      },
      {
        id: 'logs',
        label: 'View Logs',
        icon: '📋',
        type: 'api',
        endpoint: '/api/v1/infrastructure/kubernetes/logs',
        method: 'GET',
        params: [
          { name: 'pod', label: 'Pod Name', type: 'text', required: true },
          { name: 'tail', label: 'Tail Lines', type: 'number', default: 100 },
        ],
      },
      {
        id: 'describe-pod',
        label: 'Describe Pod',
        icon: '📝',
        type: 'api',
        endpoint: '/api/v1/infrastructure/kubernetes/describe',
        method: 'GET',
        params: [{ name: 'pod', label: 'Pod Name', type: 'text', required: true }],
      },
    ],
  },

  redis: {
    displayName: 'Redis Cluster',
    icon: '📦',
    panels: [
      { type: 'stat', source: 'memory_used', title: 'Memory Used', gridCols: 2 },
      { type: 'stat', source: 'keys', title: 'Keys', gridCols: 2 },
      { type: 'stat', source: 'hit_rate', title: 'Hit Rate', gridCols: 2 },
      { type: 'stat', source: 'commands', title: 'Commands/sec', gridCols: 2 },
      { type: 'table', source: 'clients', title: 'Connected Clients' },
    ],
    operations: [
      {
        id: 'flush-cache',
        label: 'Flush Cache',
        icon: '🧹',
        type: 'api',
        endpoint: '/api/v1/infrastructure/redis/flush',
        method: 'POST',
        confirm: true,
        refreshAfter: true,
      },
      {
        id: 'reload-config',
        label: 'Reload Configuration',
        icon: '🔄',
        type: 'api',
        endpoint: '/api/v1/infrastructure/redis/reload',
        method: 'POST',
        refreshAfter: true,
      },
    ],
  },

  prometheus: {
    displayName: 'Prometheus',
    icon: '📊',
    panels: [
      { type: 'stat', source: 'scrapes', title: 'Scrapes/sec', gridCols: 2 },
      { type: 'stat', source: 'targets', title: 'Targets', gridCols: 2 },
      { type: 'stat', source: 'series', title: 'Time Series', gridCols: 2 },
      { type: 'stat', source: 'uptime', title: 'Uptime', gridCols: 2 },
      { type: 'status-grid', source: 'target_status', title: 'Target Status' },
    ],
  },

  grafana: {
    displayName: 'Grafana',
    icon: '📈',
    panels: [
      { type: 'stat', source: 'dashboards', title: 'Dashboards', gridCols: 2 },
      { type: 'stat', source: 'datasources', title: 'Data Sources', gridCols: 2 },
      { type: 'stat', source: 'users', title: 'Users', gridCols: 2 },
      { type: 'stat', source: 'uptime', title: 'Uptime', gridCols: 2 },
    ],
  },

  loki: {
    displayName: 'Loki',
    icon: '📜',
    panels: [
      { type: 'stat', source: 'streams', title: 'Active Streams', gridCols: 2 },
      { type: 'stat', source: 'ingested', title: 'Ingested/sec', gridCols: 2 },
      { type: 'stat', source: 'retention', title: 'Retention', gridCols: 2 },
      { type: 'stat', source: 'uptime', title: 'Uptime', gridCols: 2 },
    ],
  },

  jaeger: {
    displayName: 'Jaeger',
    icon: '🔍',
    panels: [
      { type: 'stat', source: 'traces', title: 'Traces/sec', gridCols: 2 },
      { type: 'stat', source: 'services', title: 'Services', gridCols: 2 },
      { type: 'stat', source: 'uptime', title: 'Uptime', gridCols: 2 },
      { type: 'table', source: 'recent_traces', title: 'Recent Traces' },
    ],
  },

  alertmanager: {
    displayName: 'Alertmanager',
    icon: '🔔',
    panels: [
      { type: 'stat', source: 'alerts', title: 'Active Alerts', gridCols: 2 },
      { type: 'stat', source: 'silenced', title: 'Silenced', gridCols: 2 },
      { type: 'stat', source: 'uptime', title: 'Uptime', gridCols: 2 },
      { type: 'table', source: 'recent_alerts', title: 'Recent Alerts' },
    ],
  },

  keycloak: {
    displayName: 'Keycloak',
    icon: '🔑',
    panels: [
      { type: 'stat', source: 'users', title: 'Users', gridCols: 2 },
      { type: 'stat', source: 'sessions', title: 'Active Sessions', gridCols: 2 },
      { type: 'stat', source: 'clients', title: 'Clients', gridCols: 2 },
      { type: 'stat', source: 'uptime', title: 'Uptime', gridCols: 2 },
    ],
  },

  vault: {
    displayName: 'Vault',
    icon: '🔐',
    panels: [
      { type: 'stat', source: 'secrets', title: 'Secrets', gridCols: 2 },
      { type: 'stat', source: 'leases', title: 'Active Leases', gridCols: 2 },
      { type: 'stat', source: 'uptime', title: 'Uptime', gridCols: 2 },
    ],
  },

  harbor: {
    displayName: 'Harbor',
    icon: '⛵',
    panels: [
      { type: 'stat', source: 'projects', title: 'Projects', gridCols: 2 },
      { type: 'stat', source: 'repositories', title: 'Repositories', gridCols: 2 },
      { type: 'stat', source: 'artifacts', title: 'Artifacts', gridCols: 2 },
      { type: 'stat', source: 'uptime', title: 'Uptime', gridCols: 2 },
    ],
  },

  argocd: {
    displayName: 'ArgoCD',
    icon: '🚢',
    panels: [
      { type: 'stat', source: 'applications', title: 'Applications', gridCols: 2 },
      { type: 'stat', source: 'sync_status', title: 'Sync Status', gridCols: 2 },
      { type: 'stat', source: 'uptime', title: 'Uptime', gridCols: 2 },
      { type: 'status-grid', source: 'app_status', title: 'Application Status' },
    ],
  },

  nginx: {
    displayName: 'NGINX',
    icon: '🌐',
    panels: [
      { type: 'stat', source: 'connections', title: 'Active Connections', gridCols: 2 },
      { type: 'stat', source: 'requests', title: 'Requests/sec', gridCols: 2 },
      { type: 'stat', source: 'uptime', title: 'Uptime', gridCols: 2 },
    ],
  },

  istio: {
    displayName: 'Istio',
    icon: '🔀',
    panels: [
      { type: 'stat', source: 'services', title: 'Services', gridCols: 2 },
      { type: 'stat', source: 'proxies', title: 'Proxies', gridCols: 2 },
      { type: 'stat', source: 'uptime', title: 'Uptime', gridCols: 2 },
    ],
  },

  longhorn: {
    displayName: 'Longhorn',
    icon: '💾',
    panels: [
      { type: 'stat', source: 'volumes', title: 'Volumes', gridCols: 2 },
      { type: 'stat', source: 'replicas', title: 'Replicas', gridCols: 2 },
      { type: 'stat', source: 'uptime', title: 'Uptime', gridCols: 2 },
    ],
  },

  ceph: {
    displayName: 'Ceph',
    icon: '💿',
    panels: [
      { type: 'stat', source: 'osds', title: 'OSDs', gridCols: 2 },
      { type: 'stat', source: 'monitors', title: 'Monitors', gridCols: 2 },
      { type: 'stat', source: 'uptime', title: 'Uptime', gridCols: 2 },
    ],
  },

  velero: {
    displayName: 'Velero',
    icon: '📦',
    panels: [
      { type: 'stat', source: 'backups', title: 'Backups', gridCols: 2 },
      { type: 'stat', source: 'schedules', title: 'Schedules', gridCols: 2 },
      { type: 'stat', source: 'uptime', title: 'Uptime', gridCols: 2 },
    ],
  },

  terraform: {
    displayName: 'Terraform',
    icon: '🏗️',
    panels: [
      { type: 'stat', source: 'resources', title: 'Resources', gridCols: 2 },
      { type: 'stat', source: 'workspaces', title: 'Workspaces', gridCols: 2 },
      { type: 'stat', source: 'uptime', title: 'Uptime', gridCols: 2 },
    ],
  },

  n8n: {
    displayName: 'n8n',
    icon: '⚡',
    panels: [
      { type: 'stat', source: 'workflows', title: 'Workflows', gridCols: 2 },
      { type: 'stat', source: 'executions', title: 'Executions', gridCols: 2 },
      { type: 'stat', source: 'uptime', title: 'Uptime', gridCols: 2 },
    ],
  },

  'ubuntu-server': {
    displayName: 'Ubuntu Server',
    icon: '🐧',
    panels: [
      { type: 'stat', source: 'os', title: 'OS Version', gridCols: 2 },
      { type: 'stat', source: 'uptime', title: 'Uptime', gridCols: 2 },
      { type: 'stat', source: 'cpu_usage', title: 'CPU Usage', gridCols: 2 },
      { type: 'stat', source: 'memory_usage', title: 'Memory Usage', gridCols: 2 },
      { type: 'stat', source: 'disk_usage', title: 'Disk Usage', gridCols: 2 },
      { type: 'stat', source: 'load_avg', title: 'Load Average', gridCols: 2 },
    ],
  },

  'containerd': {
    displayName: 'Container Runtime (containerd)',
    icon: '🐳',
    panels: [
      { type: 'stat', source: 'version', title: 'Version', gridCols: 2 },
      { type: 'stat', source: 'containers', title: 'Containers', gridCols: 2 },
      { type: 'stat', source: 'images', title: 'Images', gridCols: 2 },
      { type: 'stat', source: 'uptime', title: 'Uptime', gridCols: 2 },
    ],
  },

  'nodes-hosts': {
    displayName: 'Nodes / Hosts',
    icon: '🖥️',
    panels: [
      { type: 'status-grid', source: 'node_status', title: 'Node Status' },
      { type: 'table', source: 'nodes_table', title: 'Node Details' },
    ],
  },

  docker: {
    displayName: 'Docker Engine',
    icon: '🐳',
    panels: [
      { type: 'stat', source: 'version', title: 'Version', gridCols: 2 },
      { type: 'stat', source: 'containers', title: 'Containers', gridCols: 2 },
      { type: 'stat', source: 'images', title: 'Images', gridCols: 2 },
      { type: 'stat', source: 'volumes', title: 'Volumes', gridCols: 2 },
      { type: 'stat', source: 'networks', title: 'Networks', gridCols: 2 },
      { type: 'stat', source: 'uptime', title: 'Uptime', gridCols: 2 },
    ],
    operations: [
      {
        id: 'restart-container',
        label: 'Restart Container',
        icon: '🔄',
        type: 'api',
        endpoint: '/api/v1/infrastructure/docker/restart',
        method: 'POST',
        params: [{ name: 'container', label: 'Container Name', type: 'text', required: true }],
        refreshAfter: true,
      },
      {
        id: 'logs',
        label: 'View Container Logs',
        icon: '📋',
        type: 'api',
        endpoint: '/api/v1/infrastructure/docker/logs',
        method: 'GET',
        params: [
          { name: 'container', label: 'Container Name', type: 'text', required: true },
          { name: 'tail', label: 'Tail Lines', type: 'number', default: 100 },
        ],
      },
    ],
  },

  k3s: {
    displayName: 'Kubernetes (k3s)',
    icon: '☸️',
    panels: [
      { type: 'stat', source: 'version', title: 'Version', gridCols: 2 },
      { type: 'stat', source: 'nodes', title: 'Nodes', gridCols: 2 },
      { type: 'stat', source: 'pods', title: 'Pods', gridCols: 2 },
      { type: 'stat', source: 'services', title: 'Services', gridCols: 2 },
      { type: 'status-grid', source: 'node_status', title: 'Node Status' },
      { type: 'table', source: 'deployments', title: 'Deployments' },
    ],
  },

  kubeadm: {
    displayName: 'Kubernetes (kubeadm)',
    icon: '☸️',
    panels: [
      { type: 'stat', source: 'version', title: 'Version', gridCols: 2 },
      { type: 'stat', source: 'nodes', title: 'Nodes', gridCols: 2 },
      { type: 'stat', source: 'pods', title: 'Pods', gridCols: 2 },
      { type: 'stat', source: 'services', title: 'Services', gridCols: 2 },
      { type: 'status-grid', source: 'node_status', title: 'Node Status' },
      { type: 'table', source: 'deployments', title: 'Deployments' },
    ],
  },

  helm: {
    displayName: 'Helm',
    icon: '⛵',
    panels: [
      { type: 'stat', source: 'releases', title: 'Releases', gridCols: 2 },
      { type: 'stat', source: 'repos', title: 'Repositories', gridCols: 2 },
      { type: 'stat', source: 'version', title: 'Version', gridCols: 2 },
      { type: 'stat', source: 'uptime', title: 'Uptime', gridCols: 2 },
      { type: 'table', source: 'releases_table', title: 'Release Details' },
    ],
  },

  // ─── Network & Traffic ──────────────────────────────────────────────
  calico: {
    displayName: 'Calico (CNI)',
    icon: '🌐',
    panels: [
      { type: 'stat', source: 'version', title: 'Version', gridCols: 2 },
      { type: 'stat', source: 'nodes', title: 'Nodes', gridCols: 2 },
      { type: 'stat', source: 'policies', title: 'Network Policies', gridCols: 2 },
      { type: 'stat', source: 'uptime', title: 'Uptime', gridCols: 2 },
    ],
  },

  metallb: {
    displayName: 'MetalLB',
    icon: '⚖️',
    panels: [
      { type: 'stat', source: 'version', title: 'Version', gridCols: 2 },
      { type: 'stat', source: 'address_pools', title: 'Address Pools', gridCols: 2 },
      { type: 'stat', source: 'services', title: 'Services', gridCols: 2 },
      { type: 'stat', source: 'uptime', title: 'Uptime', gridCols: 2 },
    ],
  },

  nginx_ingress: {
    displayName: 'NGINX Ingress',
    icon: '🌐',
    panels: [
      { type: 'stat', source: 'version', title: 'Version', gridCols: 2 },
      { type: 'stat', source: 'replicas', title: 'Replicas', gridCols: 2 },
      { type: 'stat', source: 'routes', title: 'Routes', gridCols: 2 },
      { type: 'stat', source: 'uptime', title: 'Uptime', gridCols: 2 },
    ],
  },

  cert_manager: {
    displayName: 'cert-manager',
    icon: '🔒',
    panels: [
      { type: 'stat', source: 'version', title: 'Version', gridCols: 2 },
      { type: 'stat', source: 'certificates', title: 'Certificates', gridCols: 2 },
      { type: 'stat', source: 'issuers', title: 'Issuers', gridCols: 2 },
      { type: 'stat', source: 'uptime', title: 'Uptime', gridCols: 2 },
    ],
  },

  istio_mesh: {
    displayName: 'Istio (Service Mesh)',
    icon: '🔀',
    panels: [
      { type: 'stat', source: 'version', title: 'Version', gridCols: 2 },
      { type: 'stat', source: 'services', title: 'Services', gridCols: 2 },
      { type: 'stat', source: 'proxies', title: 'Proxies', gridCols: 2 },
      { type: 'stat', source: 'uptime', title: 'Uptime', gridCols: 2 },
    ],
  },

  kong: {
    displayName: 'Kong API Gateway',
    icon: '🦍',
    panels: [
      { type: 'stat', source: 'version', title: 'Version', gridCols: 2 },
      { type: 'stat', source: 'routes', title: 'Routes', gridCols: 2 },
      { type: 'stat', source: 'services', title: 'Services', gridCols: 2 },
      { type: 'stat', source: 'uptime', title: 'Uptime', gridCols: 2 },
    ],
  },

  wireguard: {
    displayName: 'WireGuard (VPN)',
    icon: '🔒',
    panels: [
      { type: 'stat', source: 'version', title: 'Version', gridCols: 2 },
      { type: 'stat', source: 'peers', title: 'Peers', gridCols: 2 },
      { type: 'stat', source: 'interfaces', title: 'Interfaces', gridCols: 2 },
      { type: 'stat', source: 'uptime', title: 'Uptime', gridCols: 2 },
    ],
  },
};
