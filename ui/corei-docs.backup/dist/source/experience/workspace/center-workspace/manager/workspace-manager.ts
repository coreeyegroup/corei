import { WorkspaceState } from '../core/workspace-state';

export class WorkspaceManager {
  private state: WorkspaceState;

  constructor(initialState: WorkspaceState) {
    this.state = initialState;
  }

  setActiveWorkspace(id: string) {
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
