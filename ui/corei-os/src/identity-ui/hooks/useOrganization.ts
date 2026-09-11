// src/identity-ui/hooks/useOrganization.ts
/**
 * COREI – useOrganization Hook
 * Stage-25 / Phase-23
 */
import { useIdentity } from '../providers/IdentityProvider';

export function useOrganization() {
  const runtime = useIdentity();
  return {
    institution: runtime.getInstitution(),
    organization: runtime.getOrganization(),
    team: runtime.getTeam(),
  };
}
