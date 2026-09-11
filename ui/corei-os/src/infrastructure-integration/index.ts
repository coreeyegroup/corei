/**
 * COREI – Infrastructure Integration Platform Public API
 * Stage-25 / Phase-26
 */
// Backend (classes)
export { InfrastructureRuntime } from './runtime/InfrastructureRuntime';
export { InfrastructureState } from './state';
export { InfrastructureService } from './services';
export { InfrastructureEventHandlers } from './events/InfrastructureEventHandlers';
export { createInfrastructurePlatform } from './backend-composition';

// Models – types
export type {
  InfrastructureIntegration,
  InfrastructureConnector,
  InfrastructureAdapter,
  InfrastructureHealth,
  InfrastructureDiagnostic,
  InfrastructureWorkflow,
  InfrastructureWorkflowStep,
  InfrastructureContext,
} from './models/InfrastructureModels';

// Contracts – type
export type { InfrastructureRuntimeContract } from './contracts/InfrastructureContracts';
