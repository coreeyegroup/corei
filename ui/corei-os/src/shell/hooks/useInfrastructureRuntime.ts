// src/shell/hooks/useInfrastructureRuntime.ts
/**
 * COREI – Shell Infrastructure Runtime Hook
 * Stage-25 / Phase-26
 */
import { useMemo } from 'react';
import { createInfrastructurePlatform } from '../../infrastructure-integration/backend-composition';
import { WorkspaceRuntime, EventPlatform, StatePlatform } from '../../infrastructure-integration/types';

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

export function useInfrastructureRuntime() {
  return useMemo(() => {
    return createInfrastructurePlatform(
      dummyWorkspaceRuntime,
      dummyEventPlatform,
      dummyStatePlatform
    );
  }, []);
}
