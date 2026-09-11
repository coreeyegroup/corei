// src/infrastructure-integration/services/InfrastructureService.ts
/**
 * COREI – Infrastructure Integration Core Service
 * Stage-25 / Phase-26
 */
import { InfrastructureState } from '../state/InfrastructureState';
import { InfrastructureIntegration, InfrastructureConnector, InfrastructureAdapter, InfrastructureHealth, InfrastructureDiagnostic, InfrastructureWorkflow } from '../models/InfrastructureModels';

export class InfrastructureService {
  private state: InfrastructureState;

  constructor(state: InfrastructureState) {
    this.state = state;
  }

  getIntegrations(): InfrastructureIntegration[] {
    return this.state.getContext().integrations;
  }

  getConnectors(): InfrastructureConnector[] {
    return this.state.getContext().connectors;
  }

  getAdapters(): InfrastructureAdapter[] {
    return this.state.getContext().adapters;
  }

  getHealth(): InfrastructureHealth {
    return this.state.getContext().health;
  }

  getDiagnostics(): InfrastructureDiagnostic[] {
    return this.state.getContext().diagnostics;
  }

  getWorkflows(): InfrastructureWorkflow[] {
    return this.state.getContext().workflows;
  }

  getDiagnosticsReport() {
    return {
      service: 'InfrastructureService',
      integrations: this.getIntegrations().length,
      connectors: this.getConnectors().length,
      adapters: this.getAdapters().length,
      diagnostics: this.getDiagnostics().length,
      workflows: this.getWorkflows().length,
      health: this.getHealth().overall,
    };
  }
}
