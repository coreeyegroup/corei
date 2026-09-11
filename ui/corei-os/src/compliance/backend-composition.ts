// src/compliance/backend-composition.ts
/**
 * COREI – Compliance Backend Composition
 * Stage-25 / Phase-25
 */
import { WorkspaceRuntime, EventPlatform, StatePlatform } from './types';
import { ComplianceRuntime } from './runtime/ComplianceRuntime';

export function createCompliancePlatform(
  workspaceRuntime: WorkspaceRuntime,
  eventPlatform: EventPlatform,
  statePlatform: StatePlatform
): ComplianceRuntime {
  const runtime = ComplianceRuntime.getInstance(workspaceRuntime, eventPlatform, statePlatform);
  runtime.initialize();
  runtime.activate();
  return runtime;
}
