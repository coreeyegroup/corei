import React, { useState } from 'react';

import {
  useInfrastructureStore,
  type ServiceStatus,
} from '../../../store/infrastructureStore';

import {
  StatPanel,
  StatusGridPanel,
  TablePanel,
  TickerPanel,
} from './panels';

import {
  INFRASTRUCTURE_ITEM_CONFIGS,
} from '../../../config/infrastructureConfigs';

import './InfrastructureDetail.css';

interface InfrastructureDetailProps {
  serviceName: string;
}

type PrimitiveValue =
  | string
  | number
  | boolean
  | null
  | undefined;

type InfrastructureValue =
  | PrimitiveValue
  | Record<string, unknown>
  | unknown[];

interface PanelDefinition {
  type: 'stat' | 'status-grid' | 'table' | 'ticker';
  title?: string;
  source: string;
  columns?: Array<{
    key: string;
    label: string;
  }>;
}

interface StatusGridRow {
  name: string;
  status:
    | 'HEALTHY'
    | 'DEGRADED'
    | 'OFFLINE'
    | 'UNKNOWN';
}

interface TableRow {
  [key: string]: unknown;
}

interface TickerRow {
  symbol: string;
  price: string | number;
  change: string;
}

const getConfigKeyFromDisplayName = (
  displayName: string,
): string => {
  const map: Record<string, string> = {
    'Ubuntu Server': 'ubuntu-server',
    'Container Runtime (containerd)': 'containerd',
    'Nodes / Hosts': 'nodes-hosts',
    'Docker Engine': 'docker',
    'Kubernetes (k3s)': 'k3s',
    'Kubernetes (kubeadm)': 'kubeadm',
    Helm: 'helm',
    'Calico (CNI)': 'calico',
    MetalLB: 'metallb',
    'NGINX Ingress': 'nginx_ingress',
    'cert-manager': 'cert_manager',
    'Istio (Service Mesh)': 'istio_mesh',
    'Kong API Gateway': 'kong',
    'WireGuard (VPN)': 'wireguard',
  };

  return (
    map[displayName] ??
    displayName
      .toLowerCase()
      .replace(/\s+/g, '-')
  );
};

const getConfig = (name: string) => {
  if (INFRASTRUCTURE_ITEM_CONFIGS[name]) {
    return INFRASTRUCTURE_ITEM_CONFIGS[name];
  }

  const key = getConfigKeyFromDisplayName(name);

  return INFRASTRUCTURE_ITEM_CONFIGS[key];
};

function readValue(
  service: ServiceStatus | undefined,
  source: string,
): InfrastructureValue {
  if (
    service?.details &&
    Object.prototype.hasOwnProperty.call(
      service.details,
      source,
    )
  ) {
    return service.details[source] as InfrastructureValue;
  }

  return undefined;
}

function renderValue(
  value: InfrastructureValue,
): string | number {
  if (
    value === undefined ||
    value === null
  ) {
    return '—';
  }

  if (
    typeof value === 'string' ||
    typeof value === 'number' ||
    typeof value === 'boolean'
  ) {
    return String(value);
  }

  try {
    return JSON.stringify(value);
  } catch {
    return '—';
  }
}

function normalizeStatus(
  value: unknown,
): StatusGridRow['status'] {
  switch (value) {
    case 'HEALTHY':
    case 'DEGRADED':
    case 'OFFLINE':
    case 'UNKNOWN':
      return value;

    default:
      return 'UNKNOWN';
  }
}

function normalizeStatusGridRows(
  value: InfrastructureValue,
): StatusGridRow[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .filter(
      (row): row is Record<string, unknown> =>
        typeof row === 'object' &&
        row !== null,
    )
    .map((row, index) => ({
      name:
        typeof row.name === 'string'
          ? row.name
          : `Item ${index + 1}`,
      status: normalizeStatus(
        row.status,
      ),
    }));
}

function normalizeTableRows(
  value: InfrastructureValue,
): TableRow[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.filter(
    (row): row is TableRow =>
      typeof row === 'object' &&
      row !== null &&
      !Array.isArray(row),
  );
}

function normalizeTickerRows(
  value: InfrastructureValue,
): TickerRow[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .filter(
      (row): row is Record<string, unknown> =>
        typeof row === 'object' &&
        row !== null &&
        !Array.isArray(row),
    )
    .map((row, index) => {
      const symbol =
        typeof row.symbol === 'string'
          ? row.symbol
          : typeof row.name === 'string'
            ? row.name
            : `Item ${index + 1}`;

      const rawPrice =
        row.price ??
        row.last_price ??
        row.value;

      const price =
        typeof rawPrice === 'string' ||
        typeof rawPrice === 'number'
          ? rawPrice
          : '—';

      const rawChange =
        row.change ??
        row.change_percent ??
        row.net_change;

      const change =
        typeof rawChange === 'string'
          ? rawChange
          : typeof rawChange === 'number'
            ? String(rawChange)
            : '—';

      return {
        symbol,
        price,
        change,
      };
    });
}

const InfrastructureDetail: React.FC<
  InfrastructureDetailProps
> = ({ serviceName }) => {
  const {
    services,
    isLoading,
    error,
    refresh,
  } = useInfrastructureStore();

  const [
    refreshing,
    setRefreshing,
  ] = useState(false);

  const configKey =
    getConfigKeyFromDisplayName(
      serviceName,
    );

  const config =
    getConfig(serviceName);

  const serviceAliases: Record<
    string,
    string
  > = {
    k3s: 'kubernetes',
    kubeadm: 'kubernetes',
  };

  const serviceLookupKey =
    serviceAliases[configKey] ??
    configKey;

  const service =
    services.find(
      (item) =>
        item.name.toLowerCase() ===
        serviceLookupKey.toLowerCase(),
    );

  const displayName =
    config?.displayName ??
    serviceName;

  const icon =
    config?.icon ?? '🖥️';

  const status =
    service?.status ?? 'UNKNOWN';

  const statusClass =
    status.toLowerCase();

  const hasLiveData =
    Boolean(service);

  const handleRefresh =
    async () => {
      setRefreshing(true);

      try {
        await refresh();
      } finally {
        setRefreshing(false);
      }
    };

  const renderPanel = (
    panelDef: PanelDefinition,
    idx: number,
  ) => {
    const value =
      readValue(
        service,
        panelDef.source,
      );

    switch (panelDef.type) {
      case 'stat':
        return (
          <StatPanel
            key={idx}
            label={
              panelDef.title ??
              panelDef.source
            }
            value={renderValue(value)}
            unit=""
            color="default"
          />
        );

      case 'status-grid':
        return (
          <StatusGridPanel
            key={idx}
            title={panelDef.title}
            services={
              normalizeStatusGridRows(
                value,
              )
            }
          />
        );

      case 'table':
        return (
          <TablePanel
            key={idx}
            title={panelDef.title}
            columns={
              panelDef.columns ?? [
                {
                  key: 'name',
                  label: 'Name',
                },
                {
                  key: 'value',
                  label: 'Value',
                },
              ]
            }
            data={
              normalizeTableRows(value)
            }
          />
        );

      case 'ticker':
        return (
          <TickerPanel
            key={idx}
            tickers={
              normalizeTickerRows(
                value,
              )
            }
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="infrastructure-detail">
      <div className="infrastructure-detail-header">
        <div className="header-left">
          <span className="service-icon">
            {icon}
          </span>

          <div>
            <h2 className="service-name">
              {displayName}
            </h2>

            <span className="service-subtitle">
              {hasLiveData
                ? 'Live Infrastructure Data'
                : 'Waiting for Infrastructure Provider'}
            </span>
          </div>
        </div>

        <div className="header-right">
          <span
            className={`status-badge ${statusClass}`}
          >
            {status}
          </span>

          <button
            className="refresh-btn"
            onClick={handleRefresh}
            disabled={
              isLoading ||
              refreshing
            }
          >
            {refreshing
              ? '⟳'
              : '↻'}{' '}
            Refresh
          </button>

          <span className="last-updated">
            {service?.lastUpdated
              ? new Date(
                  service.lastUpdated,
                ).toLocaleTimeString()
              : '—'}
          </span>
        </div>
      </div>

      {error && (
        <div
          className="detail-placeholder"
          role="alert"
        >
          <p>
            Infrastructure provider
            unavailable.
          </p>

          <p className="hint">
            {error}
          </p>

          <p className="hint">
            Last known authoritative
            infrastructure data has
            been preserved.
          </p>
        </div>
      )}

      <div className="metrics-grid">
        {(
          config?.panels as
            | PanelDefinition[]
            | undefined
        )?.map(
          (
            panelDef,
            idx,
          ) =>
            renderPanel(
              panelDef,
              idx,
            ),
        )}
      </div>

      <div className="detail-placeholder">
        {hasLiveData ? (
          <p>
            Live data supplied by the
            COREI infrastructure provider.
          </p>
        ) : (
          <p>
            No authoritative data is
            currently available for{' '}
            <strong>
              {displayName}
            </strong>.
          </p>
        )}
      </div>
    </div>
  );
};

export default InfrastructureDetail;
