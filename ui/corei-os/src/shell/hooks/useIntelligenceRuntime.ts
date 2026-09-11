// src/shell/hooks/useIntelligenceRuntime.ts
import { useMemo } from 'react';
import { createIntelligencePlatform } from '../../intelligence/backend-composition';
import { IntelligenceRuntime } from '../../intelligence/right-panel/runtime/intelligence-runtime';
import { WorkspaceRuntime, PanelRuntime, EventPlatform, StatePlatform } from '../../intelligence/types';

const dummyWorkspaceRuntime: WorkspaceRuntime = {
  getActiveWorkspace: () => ({ id: 'dummy', name: 'Dummy', type: 'default' }),
};
const dummyPanelRuntime: PanelRuntime = {
  getActivePanels: () => [],
};
const dummyEventPlatform: EventPlatform = {
  subscribe: () => {},
  unsubscribe: () => {},
};
const dummyStatePlatform: StatePlatform = {
  getState: () => null,
  setState: () => {},
};

export function useIntelligenceRuntime(): IntelligenceRuntime {
  return useMemo(() => {
    try {
      const runtime = createIntelligencePlatform(
        dummyWorkspaceRuntime,
        dummyPanelRuntime,
        dummyEventPlatform,
        dummyStatePlatform
      );

      console.log('[useIntelligenceRuntime] runtime created:', runtime);

      return runtime;
    } catch (err) {
      console.error('[useIntelligenceRuntime] failed to create runtime:', err);
      throw err;
    }
  }, []);
}
