// src/governance-ui/hooks/usePolicies.ts
/**
 * COREI – usePolicies Hook
 * Stage-25 / Phase-24
 */
import { useGovernance } from '../providers/GovernanceProvider';

export function usePolicies() {
  const runtime = useGovernance();
  return {
    policies: runtime.getPolicies(),
    activePolicies: runtime.getPolicies().filter(p => p.status === 'active'),
  };
}
