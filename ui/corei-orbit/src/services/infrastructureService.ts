// src/services/infrastructureService.ts
import type { HealthStatus } from '../store/infrastructureStore';

export interface InfrastructureStatus {
  service: string;
  status: HealthStatus;
  details?: Record<string, unknown>;
}

export interface OperationResult {
  success: boolean;
  message?: string;
  data?: any;
  logs?: string[];
}

export const API_BASE = import.meta.env.VITE_API_BASE_URL || '/api/v1';

export function getKubernetesWebSocketUrl(params: {
  pod: string;
  namespace: string;
  container?: string;
}): string {
  const configured = import.meta.env.VITE_KUBERNETES_WS_URL as string | undefined;

  const query = new URLSearchParams({
    pod: params.pod,
    namespace: params.namespace,
  });

  if (params.container) {
    query.set('container', params.container);
  }

  if (configured) {
    const base = configured.replace(/\/$/, '');

    const endpoint = base.endsWith(
      '/api/v1/infrastructure/kubernetes/exec'
    )
      ? base
      : `${base}/api/v1/infrastructure/kubernetes/exec`;

    return `${endpoint}?${query.toString()}`;
  }

  const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
  const base = window.location.host;

  return `${protocol}//${base}${API_BASE}/infrastructure/kubernetes/exec?${query.toString()}`;
}

async function request<T>(
  path: string,
  options?: RequestInit
): Promise<T> {
  const response = await fetch(`${API_BASE}${path}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
    },
    cache: 'no-store',
    ...options,
  });

  if (!response.ok) {
    throw new Error(
      `Infrastructure API ${response.status}: ${response.statusText}`
    );
  }

  return response.json() as Promise<T>;
}

export async function fetchInfrastructureStatus(): Promise<
  InfrastructureStatus[]
> {
  return request<InfrastructureStatus[]>('/infrastructure/status');
}

export async function fetchKafkaStatus(): Promise<InfrastructureStatus[]> {
  return request<InfrastructureStatus[]>('/infrastructure/kafka/status');
}

export async function fetchKubernetesStatus(): Promise<
  InfrastructureStatus[]
> {
  const data = await request<Record<string, unknown>>(
    '/infrastructure/kubernetes/status'
  );

  return [
    {
      service: 'kubernetes',
      status: data.error ? 'DEGRADED' : 'HEALTHY',
      details: data,
    },
  ];
}

export async function fetchDatabaseStatus(): Promise<
  InfrastructureStatus[]
> {
  return request<InfrastructureStatus[]>('/infrastructure/database/status');
}

export function extractKubernetesStatus(
  statusArray: InfrastructureStatus[]
): InfrastructureStatus | undefined {
  return statusArray.find(
    (status) => status.service === 'kubernetes'
  );
}

export async function executeOperation(
  serviceKey: string,
  operationId: string,
  params?: Record<string, any>
): Promise<OperationResult> {
  const opMap: Record<
    string,
    {
      endpoint: string;
      method: string;
    }
  > = {
    'kubernetes/scale-deployment': {
      endpoint: '/infrastructure/kubernetes/scale',
      method: 'POST',
    },

    'kubernetes/restart-pod': {
      endpoint: '/infrastructure/kubernetes/restart-pod',
      method: 'POST',
    },

    'kubernetes/logs': {
      endpoint: '/infrastructure/kubernetes/logs',
      method: 'GET',
    },

    'kubernetes/describe-pod': {
      endpoint: '/infrastructure/kubernetes/describe',
      method: 'GET',
    },

    'kubernetes/cordon': {
      endpoint: '/infrastructure/kubernetes/cordon',
      method: 'POST',
    },

    'kubernetes/uncordon': {
      endpoint: '/infrastructure/kubernetes/uncordon',
      method: 'POST',
    },

    'kubernetes/drain': {
      endpoint: '/infrastructure/kubernetes/drain',
      method: 'POST',
    },

    'kubernetes/rollout-restart': {
      endpoint: '/infrastructure/kubernetes/rollout/restart',
      method: 'POST',
    },

    'kubernetes/rollout-pause': {
      endpoint: '/infrastructure/kubernetes/rollout/pause',
      method: 'POST',
    },

    'kubernetes/rollout-resume': {
      endpoint: '/infrastructure/kubernetes/rollout/resume',
      method: 'POST',
    },

    'kubernetes/rollout-history': {
      endpoint: '/infrastructure/kubernetes/rollout/history',
      method: 'GET',
    },

    'kubernetes/rollout-undo': {
      endpoint: '/infrastructure/kubernetes/rollout/undo',
      method: 'POST',
    },

    'kubernetes/delete-resource': {
      endpoint: '/infrastructure/kubernetes/delete',
      method: 'POST',
    },

    'helm/install': {
      endpoint: '/infrastructure/helm/install',
      method: 'POST',
    },

    'helm/upgrade': {
      endpoint: '/infrastructure/helm/upgrade',
      method: 'POST',
    },

    'helm/rollback': {
      endpoint: '/infrastructure/helm/rollback',
      method: 'POST',
    },

    'helm/uninstall': {
      endpoint: '/infrastructure/helm/uninstall',
      method: 'POST',
    },
  };

  const key = `${serviceKey}/${operationId}`;
  const operation = opMap[key];

  if (!operation) {
    return {
      success: false,
      message: `Operation ${operationId} not supported`,
    };
  }

  try {
    const url = new URL(
      `${API_BASE}${operation.endpoint}`,
      window.location.origin
    );

    if (operation.method === 'GET' && params) {
      Object.keys(params).forEach((keyName) => {
        url.searchParams.append(
          keyName,
          String(params[keyName])
        );
      });
    }

    const options: RequestInit = {
      method: operation.method,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    if (operation.method !== 'GET' && params) {
      options.body = JSON.stringify(params);
    }

    const response = await fetch(url.toString(), options);
    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: data.error || 'Operation failed',
      };
    }

    return {
      success: true,
      message: data.message || 'Operation successful',
      data,
    };
  } catch (error) {
    return {
      success: false,
      message: (error as Error).message,
    };
  }
}

export function getMockInfrastructureStatus(): InfrastructureStatus[] {
  return [];
}

export function startInfrastructureTicker(): void {
  import('../store/infrastructureStore').then(
    ({ useInfrastructureStore }) => {
      void useInfrastructureStore.getState().refresh();
    }
  );
}
