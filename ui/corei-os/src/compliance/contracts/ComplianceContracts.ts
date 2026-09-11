// src/compliance/contracts/ComplianceContracts.ts
/**
 * COREI – Compliance Public Contracts
 * Stage-25 / Phase-25
 */
import { ComplianceContext, ComplianceControl, ComplianceObligation, ComplianceEvidence, ComplianceException, ComplianceMonitoring, ComplianceReport } from '../models/ComplianceModels';

export interface ComplianceRuntimeContract {
  // Context access
  getComplianceContext(): ComplianceContext;
  getControls(): ComplianceControl[];
  getObligations(): ComplianceObligation[];
  getEvidence(): ComplianceEvidence[];
  getExceptions(): ComplianceException[];
  getMonitoring(): ComplianceMonitoring[];
  getReports(): ComplianceReport[];

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
