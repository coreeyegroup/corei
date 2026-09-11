import { create } from 'zustand';
import {
  fetchInfrastructureStatus,
  type InfrastructureStatus,
} from '../services/infrastructureService';

export type HealthStatus =
  | 'HEALTHY'
  | 'DEGRADED'
  | 'OFFLINE'
  | 'UNKNOWN';

export interface ServiceStatus {
  name: string;
  status: HealthStatus;
  details: Record<string, unknown>;
  lastUpdated: number;
}

interface InfrastructureState {
  services: ServiceStatus[];
  isLoading: boolean;
  error: string | null;
  lastUpdated: number | null;

  fetchAll: () => Promise<void>;
  refresh: () => Promise<void>;
  updateService: (
    name: string,
    status: HealthStatus
  ) => void;
  getStatus: (
    serviceName: string
  ) => HealthStatus | null;
}

function normalizeStatus(
  value: unknown
): HealthStatus {
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

function normalizeService(
  service: InfrastructureStatus,
  timestamp: number
): ServiceStatus {
  return {
    name: String(service.service).toLowerCase(),
    status: normalizeStatus(service.status),
    details:
      service.details &&
      typeof service.details === 'object'
        ? service.details
        : {},
    lastUpdated: timestamp,
  };
}

export const useInfrastructureStore =
  create<InfrastructureState>((set, get) => ({
    services: [],
    isLoading: false,
    error: null,
    lastUpdated: null,

    fetchAll: async () => {
      set({
        isLoading: true,
        error: null,
      });

      try {
        const statuses =
          await fetchInfrastructureStatus();

        const timestamp = Date.now();

        const services =
          statuses.map((service) =>
            normalizeService(
              service,
              timestamp
            )
          );

        set({
          services,
          isLoading: false,
          error: null,
          lastUpdated: timestamp,
        });
      } catch (error) {
        const message =
          error instanceof Error
            ? error.message
            : 'Infrastructure API request failed';

        /*
         * Critical rule:
         * preserve the last authoritative dataset.
         *
         * Never replace live infrastructure state
         * with fabricated/mock values.
         */
        set((state) => ({
          services: state.services,
          isLoading: false,
          error: message,
        }));
      }
    },

    refresh: async () => {
      await get().fetchAll();
    },

    updateService: (
      name,
      status
    ) => {
      set((state) => ({
        services: state.services.map(
          (service) =>
            service.name === name
              ? {
                  ...service,
                  status,
                  lastUpdated: Date.now(),
                }
              : service
        ),
      }));
    },

    getStatus: (
      serviceName
    ) => {
      const service =
        get().services.find(
          (item) =>
            item.name ===
            serviceName.toLowerCase()
        );

      return service?.status ?? null;
    },
  }));

if (typeof window !== 'undefined') {
  const initialTimer = window.setTimeout(() => {
    void useInfrastructureStore
      .getState()
      .fetchAll();
  }, 100);

  const refreshTimer = window.setInterval(() => {
    void useInfrastructureStore
      .getState()
      .refresh();
  }, 30000);

  void initialTimer;
  void refreshTimer;
}
