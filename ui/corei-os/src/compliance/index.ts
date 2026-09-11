// src/compliance/index.ts
/**
 * COREI – Compliance Platform Public API
 * Stage-25 / Phase-25
 */
// Backend (classes)
export { ComplianceRuntime } from './runtime/ComplianceRuntime';
export { ComplianceState } from './state/ComplianceState';
export { ComplianceService } from './services/ComplianceService';
export { ComplianceEventHandlers } from './events/ComplianceEventHandlers';
export { createCompliancePlatform } from './backend-composition';

// Models – types
export type {
  ComplianceControl,
  ComplianceObligation,
  ComplianceEvidence,
  ComplianceException,
  ComplianceMonitoring,
  ComplianceReport,
  ComplianceContext,
} from './models/ComplianceModels';

// Contracts – type
export type { ComplianceRuntimeContract } from './contracts/ComplianceContracts';
