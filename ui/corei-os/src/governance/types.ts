// src/governance/types.ts
/**
 * COREI – Governance External Types
 * Local interface definitions for consumed platform services.
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
