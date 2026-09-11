/**
 * COREI OS — Stage 25 / Phase 03 / Step 05
 * Module: workspace-state
 * Layer: Core
 * Responsibility: deterministic workspace runtime state
 */

import { WorkspaceDomain } from "./workspace-types";

export interface WorkspaceState {
  activeWorkspaceId: string | null;
  activeDomain: WorkspaceDomain | null;
  mountedModules: string[];
  lastUpdated: number;
}
