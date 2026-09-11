// src/governance/contracts/GovernanceContracts.ts
/**
 * COREI – Governance Public Contracts
 * Stage-25 / Phase-24
 */
import { GovernanceContext, GovernancePolicy, GovernanceDecision, GovernanceApproval, GovernanceWorkflow, GovernanceCompliance, GovernanceAudit } from '../models/GovernanceModels';

export interface GovernanceRuntimeContract {
  // Context access
  getGovernanceContext(): GovernanceContext;
  getPolicies(): GovernancePolicy[];
  getDecisions(): GovernanceDecision[];
  getApprovals(): GovernanceApproval[];
  getWorkflows(): GovernanceWorkflow[];
  getCompliance(): GovernanceCompliance[];
  getAudits(): GovernanceAudit[];

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
