/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 06
 * Step        : 03
 *
 * File        : workspace-state.ts
 * Purpose     : Workspace State
 * =============================================================================
 */

import type { WorkspaceAvailability } from "./workspace-availability";
import type { WorkspaceHealth } from "./workspace-health";
import type { WorkspaceReadiness } from "./workspace-readiness";
import type { WorkspaceStatus } from "./workspace-status";

export interface WorkspaceState {

    readonly status: WorkspaceStatus;

    readonly health: WorkspaceHealth;

    readonly readiness: WorkspaceReadiness;

    readonly availability: WorkspaceAvailability;

}
