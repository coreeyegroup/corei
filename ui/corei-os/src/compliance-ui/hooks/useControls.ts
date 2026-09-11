// src/compliance-ui/hooks/useControls.ts
/**
 * COREI – useControls Hook
 * Stage-25 / Phase-25
 */
import { useCompliance } from '../providers/ComplianceProvider';

export function useControls() {
  const runtime = useCompliance();
  return {
    controls: runtime.getControls(),
    activeControls: runtime.getControls().filter(c => c.status === 'active'),
  };
}
