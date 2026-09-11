// src/compliance/runtime/ComplianceRuntime.ts
/**
 * COREI – Compliance Runtime
 * Stage-25 / Phase-25
 */
import { WorkspaceRuntime, EventPlatform, StatePlatform } from '../types';
import { ComplianceState } from '../state/ComplianceState';
import { ComplianceService } from '../services/ComplianceService';
import { ComplianceEventHandlers } from '../events/ComplianceEventHandlers';
import { ComplianceContext, ComplianceControl, ComplianceObligation, ComplianceEvidence, ComplianceException, ComplianceMonitoring, ComplianceReport } from '../models/ComplianceModels';

export class ComplianceRuntime {
  private static instance: ComplianceRuntime;
  private workspaceRuntime: WorkspaceRuntime;
  private eventPlatform: EventPlatform;
  private statePlatform: StatePlatform;
  private state: ComplianceState;
  private complianceService: ComplianceService;
  private eventHandlers: ComplianceEventHandlers;
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
    this.state = new ComplianceState(statePlatform);
    this.complianceService = new ComplianceService(this.state);
    this.eventHandlers = new ComplianceEventHandlers(eventPlatform, this);
  }

  static getInstance(
    workspaceRuntime: WorkspaceRuntime,
    eventPlatform: EventPlatform,
    statePlatform: StatePlatform
  ): ComplianceRuntime {
    if (!ComplianceRuntime.instance) {
      ComplianceRuntime.instance = new ComplianceRuntime(workspaceRuntime, eventPlatform, statePlatform);
    }
    return ComplianceRuntime.instance;
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
    this.eventHandlers.suspend();
  }

  resume(): void {
    if (!this.initialized) return;
    this.active = true;
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
    const dummyControls: ComplianceControl[] = [
      { id: 'ctrl-1', name: 'Access Control', description: 'Ensure proper access controls', category: 'security', status: 'active', owner: 'security-team', implemented: true },
    ];
    const dummyObligations: ComplianceObligation[] = [
      { id: 'obl-1', name: 'Data Privacy', description: 'Comply with data privacy regulations', regulation: 'GDPR', status: 'compliant', assignedTo: 'compliance-officer' },
    ];
    const dummyEvidence: ComplianceEvidence[] = [
      { id: 'ev-1', name: 'Access Logs', description: 'Access logs for audit', status: 'collected', collectedBy: 'auditor', collectedAt: Date.now() },
    ];
    const dummyExceptions: ComplianceException[] = [
      { id: 'exc-1', name: 'Exception for testing', description: 'Temporary exception', status: 'open', raisedBy: 'developer', raisedAt: Date.now() },
    ];
    const dummyMonitoring: ComplianceMonitoring[] = [
      { id: 'mon-1', name: 'Daily Compliance Check', description: 'Runs daily compliance checks', frequency: 'daily', lastRun: Date.now(), nextRun: Date.now() + 86400000, status: 'completed', results: {} },
    ];
    const dummyReports: ComplianceReport[] = [
      { id: 'rep-1', name: 'Compliance Report Q1', description: 'Quarterly compliance report', type: 'quarterly', generatedAt: Date.now(), status: 'draft', data: {} },
    ];

    this.state.updateContext({
      controls: dummyControls,
      obligations: dummyObligations,
      evidence: dummyEvidence,
      exceptions: dummyExceptions,
      monitoring: dummyMonitoring,
      reports: dummyReports,
      workspaceId,
    });
  }

  unbindFromWorkspace(): void {
    this.state.updateContext({ workspaceId: null });
  }

  // Public API
  getComplianceContext(): ComplianceContext {
    return this.state.getContext();
  }

  getControls(): ComplianceControl[] {
    return this.complianceService.getControls();
  }

  getObligations(): ComplianceObligation[] {
    return this.complianceService.getObligations();
  }

  getEvidence(): ComplianceEvidence[] {
    return this.complianceService.getEvidence();
  }

  getExceptions(): ComplianceException[] {
    return this.complianceService.getExceptions();
  }

  getMonitoring(): ComplianceMonitoring[] {
    return this.complianceService.getMonitoring();
  }

  getReports(): ComplianceReport[] {
    return this.complianceService.getReports();
  }

  getDiagnostics() {
    return {
      runtime: {
        initialized: this.initialized,
        active: this.active,
        workspace: this.state.getContext().workspaceId,
      },
      state: this.state.getDiagnostics(),
      compliance: this.complianceService.getDiagnostics(),
      events: this.eventHandlers.getDiagnostics(),
    };
  }

  private loadDefaultData(): void {
    // Can be extended
  }
}
