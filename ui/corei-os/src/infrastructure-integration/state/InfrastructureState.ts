// src/infrastructure-integration/state/InfrastructureState.ts
/**
 * COREI – Infrastructure Integration State
 * Stage-25 / Phase-26
 */
import { StatePlatform } from '../types';
import { InfrastructureContext, InfrastructureIntegration, InfrastructureConnector, InfrastructureAdapter, InfrastructureHealth, InfrastructureDiagnostic, InfrastructureWorkflow } from '../models/InfrastructureModels';

export class InfrastructureState {
  private statePlatform: StatePlatform;
  private context: InfrastructureContext;
  private readonly CONTEXT_KEY = 'infrastructure.context';

  constructor(statePlatform: StatePlatform) {
    this.statePlatform = statePlatform;
    this.context = this.createEmptyContext();
  }

  private createEmptyContext(): InfrastructureContext {
    return {
      runtimeState: 'initializing',
      integrations: [],
      connectors: [],
      adapters: [],
      health: {
        overall: 'offline',
        components: {},
        timestamp: Date.now(),
        details: {},
      },
      diagnostics: [],
      workflows: [],
      workspaceId: null,
    };
  }

  initialize(): void {
    const saved = this.statePlatform.getState(this.CONTEXT_KEY);
    if (saved) {
      this.context = { ...this.createEmptyContext(), ...saved };
    }
  }

  getContext(): InfrastructureContext {
    return this.context;
  }

  updateContext(partial: Partial<InfrastructureContext>): void {
    this.context = { ...this.context, ...partial };
    this.statePlatform.setState(this.CONTEXT_KEY, this.context);
  }

  clear(): void {
    this.context = this.createEmptyContext();
    this.statePlatform.setState(this.CONTEXT_KEY, null);
  }

  getDiagnostics() {
    return {
      hasContext: !!this.context.workspaceId,
      workspaceId: this.context.workspaceId,
      runtimeState: this.context.runtimeState,
      integrationCount: this.context.integrations.length,
      connectorCount: this.context.connectors.length,
      diagnosticCount: this.context.diagnostics.length,
    };
  }
}
