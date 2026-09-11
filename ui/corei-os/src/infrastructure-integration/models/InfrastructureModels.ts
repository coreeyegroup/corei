// src/infrastructure-integration/models/InfrastructureModels.ts
/**
 * COREI – Infrastructure Integration Domain Models
 * Stage-25 / Phase-26
 */
export interface InfrastructureIntegration {
  id: string;
  name: string;
  type: string;
  status: 'discovered' | 'registered' | 'validated' | 'configured' | 'connected' | 'operational' | 'degraded' | 'recovering' | 'suspended' | 'retired' | 'archived';
  connectorId?: string;
  adapterId?: string;
  metadata: Record<string, any>;
  createdAt: number;
  updatedAt: number;
}

export interface InfrastructureConnector {
  id: string;
  name: string;
  type: string;
  status: 'registered' | 'connected' | 'disconnected' | 'unavailable' | 'recovered';
  endpoint: string;
  capabilities: string[];
  health: 'healthy' | 'degraded' | 'critical' | 'offline';
  lastCheck: number;
}

export interface InfrastructureAdapter {
  id: string;
  name: string;
  type: string;
  compatibility: string[];
  version: string;
  active: boolean;
}

export interface InfrastructureHealth {
  overall: 'healthy' | 'degraded' | 'critical' | 'offline';
  components: Record<string, 'healthy' | 'degraded' | 'critical' | 'offline'>;
  timestamp: number;
  details: any;
}

export interface InfrastructureDiagnostic {
  id: string;
  source: string;
  severity: 'info' | 'warning' | 'error' | 'critical';
  message: string;
  timestamp: number;
  resolved?: boolean;
}

export interface InfrastructureWorkflow {
  id: string;
  type: string;
  state: 'queued' | 'running' | 'waiting' | 'completed' | 'failed' | 'cancelled' | 'archived';
  steps: InfrastructureWorkflowStep[];
  metadata: Record<string, any>;
  createdAt: number;
  updatedAt: number;
}

export interface InfrastructureWorkflowStep {
  id: string;
  name: string;
  status: 'pending' | 'running' | 'completed' | 'failed';
  startedAt?: number;
  completedAt?: number;
  error?: string;
}

export interface InfrastructureContext {
  runtimeState: 'initializing' | 'operational' | 'degraded' | 'suspended' | 'shutdown';
  integrations: InfrastructureIntegration[];
  connectors: InfrastructureConnector[];
  adapters: InfrastructureAdapter[];
  health: InfrastructureHealth;
  diagnostics: InfrastructureDiagnostic[];
  workflows: InfrastructureWorkflow[];
  workspaceId: string | null;
}
