// src/infrastructure-integration-ui/index.ts
/**
 * COREI – Infrastructure Integration UI Public API
 * Stage-25 / Phase-26
 */
export { InfrastructureProvider, useInfrastructure } from './providers/InfrastructureProvider';
export {
  useInfrastructureContext,
  useInfrastructureHealth,
  useInfrastructureStatus,
  useInfrastructureTopology,
} from './hooks';
export { InfrastructureStatus } from './components/InfrastructureStatus';
export { InfrastructureDashboard } from './dashboards/InfrastructureDashboard';
