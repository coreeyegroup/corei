// src/infrastructure-integration/types.ts
/**
 * COREI – Infrastructure Integration External Types
 * Stage-25 / Phase-26
 */
export interface WorkspaceRuntime {
  getActiveWorkspace(): { id: string; name: string; type?: string } | null;
}

export interface IdentityRuntime {
  getIdentityContext(): any;
  getOrganization(): any;
  getRole(): any;
  getPermissions(): any[];
}

export interface GovernanceRuntime {
  getPolicies(): any[];
  getDecisions(): any[];
  getApprovals(): any[];
  getGovernanceContext(): any;
}

export interface ComplianceRuntime {
  getComplianceContext(): any;
  getControls(): any[];
  getObligations(): any[];
}

export interface IntelligenceRuntime {
  getInsights(): any[];
  getRecommendations(): any[];
}

export interface EventPlatform {
  subscribe(event: string, handler: Function): void;
  unsubscribe(event: string, handler: Function): void;
}

export interface StatePlatform {
  getState(key: string): any;
  setState(key: string, value: any): void;
}
