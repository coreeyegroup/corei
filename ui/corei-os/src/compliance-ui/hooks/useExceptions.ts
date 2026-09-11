// src/compliance-ui/hooks/useExceptions.ts
/**
 * COREI – useExceptions Hook
 * Stage-25 / Phase-25
 */
import { useCompliance } from '../providers/ComplianceProvider';

export function useExceptions() {
  const runtime = useCompliance();
  return {
    exceptions: runtime.getExceptions(),
    openExceptions: runtime.getExceptions().filter(e => e.status === 'open'),
  };
}
