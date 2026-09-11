// src/governance-ui/hooks/useWorkflows.ts
/**
 * COREI – useWorkflows Hook
 * Stage-25 / Phase-24
 */
import { useGovernance } from '../providers/GovernanceProvider';

export function useWorkflows() {
  const runtime = useGovernance();
  return {
    workflows: runtime.getWorkflows(),
    activeWorkflows: runtime.getWorkflows().filter(w => w.state !== 'closed'),
  };
}
