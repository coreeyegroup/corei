// src/shell/hooks/useGovernanceRuntime.ts
/**
 * COREI – Shell Governance Runtime Hook
 * Stage-25 / Phase-24
 * Provides a memoized GovernanceRuntime for the shell.
 * This version uses dummy implementations of the platform services.
 * Replace with actual hooks when available.
 */
import { useMemo } from 'react';
import { createGovernancePlatform } from '../../governance/backend-composition';
import { WorkspaceRuntime, EventPlatform, StatePlatform } from '../../governance/types';

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

export function useGovernanceRuntime() {
  return useMemo(() => {
    return createGovernancePlatform(
      dummyWorkspaceRuntime,
      dummyEventPlatform,
      dummyStatePlatform
    );
  }, []);
}
