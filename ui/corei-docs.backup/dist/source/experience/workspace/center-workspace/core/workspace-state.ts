import { WorkspaceDomain } from './workspace-types';

export interface WorkspaceState {
  activeWorkspaceId: string | null;
  activeDomain: WorkspaceDomain | null;
  mountedModules: string[];
  lastUpdated: number;
}
