/**
 * COREI – Infrastructure Integration Runtime
 * Stage-25 / Phase-26
 */
import { WorkspaceRuntime, EventPlatform, StatePlatform } from '../types';
import { InfrastructureState } from '../state';
import { InfrastructureService } from '../services';
import { InfrastructureEventHandlers } from '../events/InfrastructureEventHandlers';
import { InfrastructureContext, InfrastructureIntegration, InfrastructureConnector, InfrastructureAdapter, InfrastructureHealth, InfrastructureDiagnostic, InfrastructureWorkflow } from '../models/InfrastructureModels';

export class InfrastructureRuntime {
  private static instance: InfrastructureRuntime;
  private workspaceRuntime: WorkspaceRuntime;
  private eventPlatform: EventPlatform;
  private statePlatform: StatePlatform;
  private state: InfrastructureState;
  private infrastructureService: InfrastructureService;
  private eventHandlers: InfrastructureEventHandlers;
  private initialized: boolean = false;
  private active: boolean = false;

  private constructor(
    workspaceRuntime: WorkspaceRuntime,
    eventPlatform: EventPlatform,
    statePlatform: StatePlatform
  ) {
    this.workspaceRuntime = workspaceRuntime;
    this.eventPlatform = eventPlatform;
    this.statePlatform = statePlatform;
    this.state = new InfrastructureState(statePlatform);
    this.infrastructureService = new InfrastructureService(this.state);
    this.eventHandlers = new InfrastructureEventHandlers(eventPlatform, this);
  }

  static getInstance(
    workspaceRuntime: WorkspaceRuntime,
    eventPlatform: EventPlatform,
    statePlatform: StatePlatform
  ): InfrastructureRuntime {
    if (!InfrastructureRuntime.instance) {
      InfrastructureRuntime.instance = new InfrastructureRuntime(workspaceRuntime, eventPlatform, statePlatform);
    }
    return InfrastructureRuntime.instance;
  }

  // Lifecycle
  initialize(): void {
    if (this.initialized) return;
    this.state.initialize();
    this.eventHandlers.register();
    this.loadDefaultData();
    this.initialized = true;
  }

  activate(): void {
    if (!this.initialized) throw new Error('Runtime not initialized');
    if (this.active) return;
    this.active = true;
    this.state.updateContext({ runtimeState: 'operational' });
    this.refresh();
  }

  refresh(): void {
    if (!this.active) return;
    const workspace = this.workspaceRuntime.getActiveWorkspace();
    if (workspace) {
      this.bindToWorkspace(workspace.id);
    }
  }

  suspend(): void {
    this.active = false;
    this.state.updateContext({ runtimeState: 'suspended' });
    this.eventHandlers.suspend();
  }

  resume(): void {
    if (!this.initialized) return;
    this.active = true;
    this.state.updateContext({ runtimeState: 'operational' });
    this.eventHandlers.resume();
    this.refresh();
  }

  dispose(): void {
    this.eventHandlers.unregister();
    this.state.clear();
    this.initialized = false;
    this.active = false;
  }

  // Workspace binding
  bindToWorkspace(workspaceId: string): void {
    // Dummy data for demonstration
    const dummyConnectors: InfrastructureConnector[] = [
      {
        id: 'conn-1',
        name: 'Kafka Connector',
        type: 'kafka',
        status: 'connected',
        endpoint: 'kafka://localhost:9092',
        capabilities: ['publish', 'subscribe'],
        health: 'healthy',
        lastCheck: Date.now(),
      },
      {
        id: 'conn-2',
        name: 'Redis Connector',
        type: 'redis',
        status: 'connected',
        endpoint: 'redis://localhost:6379',
        capabilities: ['cache', 'pubsub'],
        health: 'healthy',
        lastCheck: Date.now(),
      },
    ];

    const dummyAdapters: InfrastructureAdapter[] = [
      { id: 'adap-1', name: 'Kafka Adapter', type: 'kafka', compatibility: ['v1', 'v2'], version: '1.0.0', active: true },
      { id: 'adap-2', name: 'Redis Adapter', type: 'redis', compatibility: ['v1'], version: '1.0.0', active: true },
    ];

    const dummyIntegrations: InfrastructureIntegration[] = [
      { id: 'int-1', name: 'Market Data Integration', type: 'kafka', status: 'operational', connectorId: 'conn-1', adapterId: 'adap-1', metadata: { topic: 'market-data' }, createdAt: Date.now(), updatedAt: Date.now() },
    ];

    const dummyWorkflows: InfrastructureWorkflow[] = [
      { id: 'wf-1', type: 'discovery', state: 'completed', steps: [], metadata: {}, createdAt: Date.now(), updatedAt: Date.now() },
    ];

    const dummyHealth: InfrastructureHealth = {
      overall: 'healthy',
      components: { 'kafka': 'healthy', 'redis': 'healthy' },
      timestamp: Date.now(),
      details: {},
    };

    const dummyDiagnostics: InfrastructureDiagnostic[] = [
      { id: 'diag-1', source: 'kafka', severity: 'info', message: 'Kafka connection established', timestamp: Date.now(), resolved: true },
    ];

    this.state.updateContext({
      integrations: dummyIntegrations,
      connectors: dummyConnectors,
      adapters: dummyAdapters,
      workflows: dummyWorkflows,
      health: dummyHealth,
      diagnostics: dummyDiagnostics,
      workspaceId,
    });
  }

  unbindFromWorkspace(): void {
    this.state.updateContext({ workspaceId: null });
  }

  // Public API
  getContext(): InfrastructureContext {
    return this.state.getContext();
  }

  getIntegrations(): InfrastructureIntegration[] {
    return this.infrastructureService.getIntegrations();
  }

  getConnectors(): InfrastructureConnector[] {
    return this.infrastructureService.getConnectors();
  }

  getAdapters(): InfrastructureAdapter[] {
    return this.infrastructureService.getAdapters();
  }

  getHealth(): InfrastructureHealth {
    return this.infrastructureService.getHealth();
  }

  getDiagnostics(): InfrastructureDiagnostic[] {
    return this.infrastructureService.getDiagnostics();
  }

  getWorkflows(): InfrastructureWorkflow[] {
    return this.infrastructureService.getWorkflows();
  }

  getDiagnosticsReport() {
    return {
      runtime: {
        initialized: this.initialized,
        active: this.active,
        workspace: this.state.getContext().workspaceId,
        state: this.state.getContext().runtimeState,
      },
      state: this.state.getDiagnostics(),
      infrastructure: this.infrastructureService.getDiagnosticsReport(),
      events: this.eventHandlers.getDiagnostics(),
    };
  }

  private loadDefaultData(): void {
    // Can be extended to load from configuration
  }

    /**
   * Simulation method for real-time infrastructure updates.
   * Updates connectors and health status dynamically.
   */
  simulateData(connectors: InfrastructureConnector[], health: InfrastructureHealth): void {
    if (!this.active) return;
    this.state.updateContext({
      connectors,
      health,
    });
  }
}
