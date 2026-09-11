// src/governance-ui/hooks/useCompliance.ts
/**
 * COREI – useCompliance Hook
 * Stage-25 / Phase-24
 */
import { useGovernance } from '../providers/GovernanceProvider';

export function useCompliance() {
  const runtime = useGovernance();
  return {
    compliance: runtime.getCompliance(),
    nonCompliant: runtime.getCompliance().filter(c => c.status === 'non-compliant'),
  };
}
