/**
 * COREI OS — Stage 25 / Phase 03 / Step 05
 * Module: workspace-manager
 * Layer: Manager
 * Responsibility: workspace lifecycle orchestration
 */

import { WorkspaceState } from "../core/workspace-state";

export class WorkspaceManager {

  private state: WorkspaceState;

  constructor(initialState: WorkspaceState) {
    this.state = initialState;
  }

  setWorkspace(id: string) {
    this.state.activeWorkspaceId = id;
    this.state.lastUpdated = Date.now();
  }

  setDomain(domain: any) {
    this.state.activeDomain = domain;
    this.state.lastUpdated = Date.now();
  }

  getState() {
    return this.state;
  }
}
