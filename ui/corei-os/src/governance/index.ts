// src/governance/index.ts
/**
 * COREI – Governance Platform Public API
 * Stage-25 / Phase-24
 */
// Backend (classes)
export { GovernanceRuntime } from './runtime/GovernanceRuntime';
export { GovernanceState } from './state/GovernanceState';
export { GovernanceService } from './services/GovernanceService';
export { PolicyService } from './services/PolicyService';
export { ApprovalService } from './services/ApprovalService';
export { WorkflowService } from './services/WorkflowService';
export { ComplianceService } from './services/ComplianceService';
export { GovernanceEventHandlers } from './events/GovernanceEventHandlers';
export { createGovernancePlatform } from './backend-composition';

// Models – types
export type {
  GovernancePolicy,
  GovernanceDecision,
  GovernanceApproval,
  GovernanceWorkflow,
  GovernanceCompliance,
  GovernanceAudit,
  GovernanceContext,
} from './models/GovernanceModels';

// Contracts – type
export type { GovernanceRuntimeContract } from './contracts/GovernanceContracts';
