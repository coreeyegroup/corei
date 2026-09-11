/**
 * ============================================================================
 * COREI – Identity & Organization Platform
 * Stage-25 / Phase-23 / Step-02
 * File: identity-service.ts
 * Purpose: Defines the identity service contract.
 * ============================================================================
 */

import type { IdentityContext, User, Organization, Environment } from './identity-context';

export interface IdentityServiceContract {
    getCurrentIdentity(): IdentityContext;
    getCurrentUser(): User | null;
    getCurrentOrganization(): Organization | null;
    getCurrentEnvironment(): Environment | null;
    isAuthenticated(): boolean;
    hasRole(role: string): boolean;
    hasPermission(permission: string): boolean;
    switchOrganization(organizationId: string): Promise<void>;
    logout(): Promise<void>;
}
