// src/identity/backend-composition.ts
/**
 * COREI – Identity Backend Composition
 * Stage-25 / Phase-23
 */
import { WorkspaceRuntime, EventPlatform, StatePlatform } from './types';
import { IdentityRuntime } from './runtime/IdentityRuntime';

export function createIdentityPlatform(
  workspaceRuntime: WorkspaceRuntime,
  eventPlatform: EventPlatform,
  statePlatform: StatePlatform
): IdentityRuntime {
  const runtime = IdentityRuntime.getInstance(workspaceRuntime, eventPlatform, statePlatform);
  runtime.initialize();
  runtime.activate();
  return runtime;
}
