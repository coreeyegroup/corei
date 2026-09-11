// src/compliance-ui/hooks/useEvidence.ts
/**
 * COREI – useEvidence Hook
 * Stage-25 / Phase-25
 */
import { useCompliance } from '../providers/ComplianceProvider';

export function useEvidence() {
  const runtime = useCompliance();
  return {
    evidence: runtime.getEvidence(),
    verified: runtime.getEvidence().filter(e => e.status === 'verified'),
  };
}
