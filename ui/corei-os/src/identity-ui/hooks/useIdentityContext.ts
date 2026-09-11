// src/identity-ui/hooks/useIdentityContext.ts
/**
 * COREI – useIdentityContext Hook
 * Stage-25 / Phase-23
 */
import { useIdentity } from '../providers/IdentityProvider';

export function useIdentityContext() {
  const runtime = useIdentity();
  return runtime.getIdentityContext();
}
