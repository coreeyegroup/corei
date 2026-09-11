/**
 * ============================================================================
 * COREI – Identity & Organization Platform
 * Stage-25 / Phase-23 / Step-02
 * File: identity-context.ts
 * Purpose: Defines the identity context model.
 * ============================================================================
 */

export interface User {
    id: string;
    name: string;
    email?: string;
    roles: string[];
    permissions: string[];
}

export interface Organization {
    id: string;
    name: string;
    domain?: string;
}

export interface Environment {
    id: string;
    name: string;
    type: 'development' | 'staging' | 'production';
}

export interface IdentityContext {
    user: User | null;
    organization: Organization | null;
    environment: Environment | null;
    isAuthenticated: boolean;
}
