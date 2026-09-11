// src/identity-ui/hooks/useRole.ts
/**
 * COREI – useRole Hook
 * Stage-25 / Phase-23
 */
import { useIdentity } from '../providers/IdentityProvider';

export function useRole() {
  const runtime = useIdentity();
  return {
    role: runtime.getRole(),
    permissions: runtime.getPermissions(),
    hasPermission: (perm: string) => runtime.getPermissions().some(p => p.name === perm),
  };
}
