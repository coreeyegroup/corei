/**
 * COREI – Intelligence External Types
 * Local interface definitions for consumed platform services.
 * Actual implementations are injected at runtime.
 */
export interface WorkspaceRuntime {
  getActiveWorkspace(): { id: string; name: string; type?: string } | null;
  // Add other methods as needed
}

export interface PanelRuntime {
  getActivePanels(): Array<{ id: string; [key: string]: any }>;
  // Add other methods as needed
}

export interface EventPlatform {
  subscribe(event: string, handler: Function): void;
  unsubscribe(event: string, handler: Function): void;
  // Add other methods as needed
}

export interface StatePlatform {
  getState(key: string): any;
  setState(key: string, value: any): void;
  // Add other methods as needed
}
