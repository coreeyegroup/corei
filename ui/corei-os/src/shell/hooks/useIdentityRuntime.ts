// src/shell/hooks/useIdentityRuntime.ts
/**
 * COREI – Shell Identity Runtime Hook
 * Stage-25 / Phase-23
 * Provides a memoized IdentityRuntime for the shell.
 * This version uses dummy implementations of the platform services.
 * Replace with actual hooks when available.
 */
import { useMemo } from 'react';
import { createIdentityPlatform } from '../../identity/backend-composition';
import { WorkspaceRuntime, EventPlatform, StatePlatform } from '../../identity/types';

// Dummy implementations (replace with actual platform hooks when available)
const dummyWorkspaceRuntime: WorkspaceRuntime = {
  getActiveWorkspace: () => ({ id: 'dummy-workspace', name: 'Dummy', type: 'default' }),
};

const dummyEventPlatform: EventPlatform = {
  subscribe: () => {},
  unsubscribe: () => {},
};

const dummyStatePlatform: StatePlatform = {
  getState: () => null,
  setState: () => {},
};

export function useIdentityRuntime() {
  return useMemo(() => {
    return createIdentityPlatform(
      dummyWorkspaceRuntime,
      dummyEventPlatform,
      dummyStatePlatform
    );
  }, []);
}
