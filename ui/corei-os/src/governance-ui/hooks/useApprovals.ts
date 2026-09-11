// src/governance-ui/hooks/useApprovals.ts
/**
 * COREI – useApprovals Hook
 * Stage-25 / Phase-24
 */
import { useGovernance } from '../providers/GovernanceProvider';

export function useApprovals() {
  const runtime = useGovernance();
  return {
    approvals: runtime.getApprovals(),
    pendingApprovals: runtime.getApprovals().filter(a => a.status === 'pending'),
  };
}
