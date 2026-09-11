// src/compliance-ui/hooks/useMonitoring.ts
/**
 * COREI – useMonitoring Hook
 * Stage-25 / Phase-25
 */
import { useCompliance } from '../providers/ComplianceProvider';

export function useMonitoring() {
  const runtime = useCompliance();
  return {
    monitoring: runtime.getMonitoring(),
    activeMonitors: runtime.getMonitoring().filter(m => m.status !== 'failed'),
  };
}
