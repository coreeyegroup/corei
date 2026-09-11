// src/governance/backend-composition.ts
/**
 * COREI – Governance Backend Composition
 * Stage-25 / Phase-24
 */
import { WorkspaceRuntime, EventPlatform, StatePlatform } from './types';
import { GovernanceRuntime } from './runtime/GovernanceRuntime';

export function createGovernancePlatform(
  workspaceRuntime: WorkspaceRuntime,
  eventPlatform: EventPlatform,
  statePlatform: StatePlatform
): GovernanceRuntime {
  const runtime = GovernanceRuntime.getInstance(workspaceRuntime, eventPlatform, statePlatform);
  runtime.initialize();
  runtime.activate();
  return runtime;
}
