// src/infrastructure-integration/contracts/InfrastructureContracts.ts
/**
 * COREI – Infrastructure Integration Public Contracts
 * Stage-25 / Phase-26
 */
import { InfrastructureContext, InfrastructureIntegration, InfrastructureConnector, InfrastructureAdapter, InfrastructureHealth, InfrastructureDiagnostic, InfrastructureWorkflow } from '../models/InfrastructureModels';

export interface InfrastructureRuntimeContract {
  // Context access
  getContext(): InfrastructureContext;
  getIntegrations(): InfrastructureIntegration[];
  getConnectors(): InfrastructureConnector[];
  getAdapters(): InfrastructureAdapter[];
  getHealth(): InfrastructureHealth;
  getDiagnostics(): InfrastructureDiagnostic[];
  getWorkflows(): InfrastructureWorkflow[];

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
  getDiagnosticsReport(): any;
}
