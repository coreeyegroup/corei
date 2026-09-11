// src/identity/index.ts
/**
 * COREI – Identity Platform Public API
 * Stage-25 / Phase-23
 */
// Backend (classes – can export as is)
export { IdentityRuntime } from './runtime/IdentityRuntime';
export { IdentityState } from './state/IdentityState';
export { IdentityService } from './services/IdentityService';
export { OrganizationService } from './services/OrganizationService';
export { RoleService } from './services/RoleService';
export { IdentityEventHandlers } from './events/IdentityEventHandlers';
export { createIdentityPlatform } from './backend-composition';

// Models – these are types/interfaces, so use export type
export type {
  Institution,
  Organization,
  BusinessUnit,
  Department,
  Team,
  Operator,
  Role,
  Permission,
  WorkspaceProfile,
  IdentityContext,
} from './models/IdentityModels';

// Contracts – also type
export type { IdentityRuntimeContract } from './contracts/IdentityContracts';
