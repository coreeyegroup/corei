// src/shell/hooks/useComplianceRuntime.ts
/**
 * COREI – Shell Compliance Runtime Hook
 * Stage-25 / Phase-25
 */
import { useMemo } from 'react';
import { createCompliancePlatform } from '../../compliance/backend-composition';
import { WorkspaceRuntime, EventPlatform, StatePlatform } from '../../compliance/types';

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

export function useComplianceRuntime() {
  return useMemo(() => {
    return createCompliancePlatform(
      dummyWorkspaceRuntime,
      dummyEventPlatform,
      dummyStatePlatform
    );
  }, []);
}
