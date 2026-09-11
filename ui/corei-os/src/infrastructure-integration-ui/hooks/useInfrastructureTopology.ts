// src/infrastructure-integration-ui/hooks/useInfrastructureTopology.ts
/**
 * COREI – useInfrastructureTopology Hook
 * Stage-25 / Phase-26
 */
import { useInfrastructure } from '../providers/InfrastructureProvider';

export function useInfrastructureTopology() {
  const runtime = useInfrastructure();
  return {
    integrations: runtime.getIntegrations(),
    connectors: runtime.getConnectors(),
    adapters: runtime.getAdapters(),
  };
}
