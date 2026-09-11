// src/identity/contracts/IdentityContracts.ts
/**
 * COREI – Identity Public Contracts
 * Stage-25 / Phase-23
 */
import { IdentityContext, Institution, Organization, Team, Operator, Role, Permission, WorkspaceProfile } from '../models/IdentityModels';

export interface IdentityRuntimeContract {
  // Context access
  getIdentityContext(): IdentityContext;
  getInstitution(): Institution | null;
  getOrganization(): Organization | null;
  getTeam(): Team | null;
  getOperator(): Operator | null;
  getRole(): Role | null;
  getPermissions(): Permission[];
  getWorkspaceProfile(): WorkspaceProfile | null;

  // Lifecycle
  initialize(): void;
  activate(): void;
  refresh(): void;
  suspend(): void;
  resume(): void;
  dispose(): void;

  // Workspace binding
  bindToWorkspace(workspaceId: string): void;
  unbindFromWorkspace(): void;

  // Diagnostics
  getDiagnostics(): any;
}
