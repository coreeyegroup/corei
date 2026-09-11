// src/compliance-ui/hooks/useComplianceContext.ts
/**
 * COREI – useComplianceContext Hook
 * Stage-25 / Phase-25
 */
import { useCompliance } from '../providers/ComplianceProvider';

export function useComplianceContext() {
  const runtime = useCompliance();
  return runtime.getComplianceContext();
}
