// src/identity/types.ts
/**
 * COREI – Identity External Types
 * Local interface definitions for consumed platform services.
 */
export interface WorkspaceRuntime {
  getActiveWorkspace(): { id: string; name: string; type?: string } | null;
  // Add other methods as needed
}

export interface PanelRuntime {
  getActivePanels(): Array<{ id: string; [key: string]: any }>;
}

export interface EventPlatform {
  subscribe(event: string, handler: Function): void;
  unsubscribe(event: string, handler: Function): void;
}

export interface StatePlatform {
  getState(key: string): any;
  setState(key: string, value: any): void;
}

export interface IntelligenceRuntime {
  getInsights(): any[];
  getRecommendations(): any[];
  // minimal for integration
}
