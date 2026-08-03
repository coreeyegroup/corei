export type WorkspaceDomain =
  | 'TRADING'
  | 'INFRASTRUCTURE'
  | 'RISK'
  | 'RESEARCH'
  | 'EXECUTIVE';

export interface WorkspaceContext {
  workspaceId: string;
  domain: WorkspaceDomain;
  timestamp: number;
}
