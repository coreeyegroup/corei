/**
 * COREI OS — Stage 25 / Phase 03 / Step 05
 * Module: workspace-types
 * Layer: Core
 * Responsibility: Workspace domain definitions
 */

export type WorkspaceDomain =
  | "TRADING"
  | "INFRASTRUCTURE"
  | "RISK"
  | "RESEARCH"
  | "EXECUTIVE";

export interface WorkspaceContext {
  workspaceId: string;
  domain: WorkspaceDomain;
  timestamp: number;
}
