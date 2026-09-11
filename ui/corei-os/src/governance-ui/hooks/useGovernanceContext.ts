// src/governance-ui/hooks/useGovernanceContext.ts
/**
 * COREI – useGovernanceContext Hook
 * Stage-25 / Phase-24
 */
import { useGovernance } from '../providers/GovernanceProvider';

export function useGovernanceContext() {
  const runtime = useGovernance();
  return runtime.getGovernanceContext();
}
