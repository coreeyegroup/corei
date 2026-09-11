// src/compliance-ui/hooks/useObligations.ts
/**
 * COREI – useObligations Hook
 * Stage-25 / Phase-25
 */
import { useCompliance } from '../providers/ComplianceProvider';

export function useObligations() {
  const runtime = useCompliance();
  return {
    obligations: runtime.getObligations(),
    nonCompliant: runtime.getObligations().filter(o => o.status === 'non-compliant'),
  };
}
