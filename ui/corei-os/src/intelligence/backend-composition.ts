// src/intelligence/backend-composition.ts
import { WorkspaceRuntime, PanelRuntime, EventPlatform, StatePlatform } from './types';
import { IntelligenceRuntime } from './right-panel/runtime/intelligence-runtime';
import { IntelligenceService } from './right-panel/services/intelligence-service';

export function createIntelligencePlatform(
  workspaceRuntime: WorkspaceRuntime,
  panelRuntime: PanelRuntime,
  eventPlatform: EventPlatform,
  statePlatform: StatePlatform
): IntelligenceRuntime {
  const service = new IntelligenceService();
  const runtime = IntelligenceRuntime.getInstance(
    workspaceRuntime,
    panelRuntime,
    eventPlatform,
    statePlatform,
    service
  );
  runtime.initialize();
  runtime.activate();
  return runtime;
}
