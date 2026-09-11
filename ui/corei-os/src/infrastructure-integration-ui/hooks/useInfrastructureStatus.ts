// src/infrastructure-integration-ui/hooks/useInfrastructureStatus.ts
/**
 * COREI – useInfrastructureStatus Hook
 * Stage-25 / Phase-26
 */
import { useInfrastructure } from '../providers/InfrastructureProvider';

export function useInfrastructureStatus() {
  const runtime = useInfrastructure();
  const context = runtime.getContext();
  return {
    runtimeState: context.runtimeState,
    integrationCount: context.integrations.length,
    connectorCount: context.connectors.length,
    health: context.health.overall,
  };
}
