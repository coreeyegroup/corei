// src/infrastructure-integration-ui/hooks/useInfrastructureContext.ts
/**
 * COREI – useInfrastructureContext Hook
 * Stage-25 / Phase-26
 */
import { useInfrastructure } from '../providers/InfrastructureProvider';

export function useInfrastructureContext() {
  const runtime = useInfrastructure();
  return runtime.getContext();
}
