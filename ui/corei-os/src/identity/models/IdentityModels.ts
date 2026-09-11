// src/identity/models/IdentityModels.ts
/**
 * COREI – Identity Domain Models
 * Stage-25 / Phase-23
 */
export interface Institution {
  id: string;
  name: string;
  code: string;
  // Additional metadata
}

export interface Organization {
  id: string;
  name: string;
  code: string;
  institutionId: string;
  parentId?: string;
}

export interface BusinessUnit {
  id: string;
  name: string;
  code: string;
  organizationId: string;
  parentId?: string;
}

export interface Department {
  id: string;
  name: string;
  code: string;
  businessUnitId: string;
  parentId?: string;
}

export interface Team {
  id: string;
  name: string;
  code: string;
  departmentId: string;
  parentId?: string;
}

export interface Operator {
  id: string;
  username: string;
  displayName: string;
  email: string;
  teamId: string;
  active: boolean;
}

export interface Role {
  id: string;
  name: string;
  description: string;
  permissions: string[];
}

export interface Permission {
  id: string;
  name: string;
  resource: string;
  action: string;
  description?: string;
}

export interface WorkspaceProfile {
  id: string;
  operatorId: string;
  workspaceId: string;
  roleId: string;
  settings: Record<string, any>;
}

export interface IdentityContext {
  institution: Institution | null;
  organization: Organization | null;
  businessUnit: BusinessUnit | null;
  department: Department | null;
  team: Team | null;
  operator: Operator | null;
  role: Role | null;
  permissions: Permission[];
  workspaceProfile: WorkspaceProfile | null;
  workspaceId: string | null;
}
