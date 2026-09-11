// src/infrastructure-integration/backend-composition.ts
/**
 * COREI – Infrastructure Integration Backend Composition
 * Stage-25 / Phase-26
 */
import { WorkspaceRuntime, EventPlatform, StatePlatform } from './types';
import { InfrastructureRuntime } from './runtime/InfrastructureRuntime';

export function createInfrastructurePlatform(
  workspaceRuntime: WorkspaceRuntime,
  eventPlatform: EventPlatform,
  statePlatform: StatePlatform
): InfrastructureRuntime {
  const runtime = InfrastructureRuntime.getInstance(workspaceRuntime, eventPlatform, statePlatform);
  runtime.initialize();
  runtime.activate();
  return runtime;
}
