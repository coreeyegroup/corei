// src/infrastructure-integration-ui/hooks/useInfrastructureHealth.ts
/**
 * COREI – useInfrastructureHealth Hook
 * Stage-25 / Phase-26
 */
import { useInfrastructure } from '../providers/InfrastructureProvider';

export function useInfrastructureHealth() {
  const runtime = useInfrastructure();
  return runtime.getHealth();
}
