// src/compliance-ui/hooks/useReporting.ts
/**
 * COREI – useReporting Hook
 * Stage-25 / Phase-25
 */
import { useCompliance } from '../providers/ComplianceProvider';

export function useReporting() {
  const runtime = useCompliance();
  return {
    reports: runtime.getReports(),
    publishedReports: runtime.getReports().filter(r => r.status === 'published'),
  };
}
