// src/governance/runtime/GovernanceRuntime.ts
/**
 * COREI – Governance Runtime
 * Stage-25 / Phase-24
 */
import { WorkspaceRuntime, EventPlatform, StatePlatform } from '../types';
import { GovernanceState } from '../state/GovernanceState';
import { GovernanceService } from '../services/GovernanceService';
import { PolicyService } from '../services/PolicyService';
import { ApprovalService } from '../services/ApprovalService';
import { WorkflowService } from '../services/WorkflowService';
import { ComplianceService } from '../services/ComplianceService';
import { GovernanceEventHandlers } from '../events/GovernanceEventHandlers';
import { GovernanceContext } from '../models/GovernanceModels';

export class GovernanceRuntime {
  private static instance: GovernanceRuntime;
  private workspaceRuntime: WorkspaceRuntime;
  private eventPlatform: EventPlatform;
  private statePlatform: StatePlatform;
  private state: GovernanceState;
  private governanceService: GovernanceService;
  private policyService: PolicyService;
  private approvalService: ApprovalService;
  private workflowService: WorkflowService;
  private complianceService: ComplianceService;
  private eventHandlers: GovernanceEventHandlers;
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
    this.state = new GovernanceState(statePlatform);
    this.governanceService = new GovernanceService(this.state);
    this.policyService = new PolicyService(this.state);
    this.approvalService = new ApprovalService(this.state);
    this.workflowService = new WorkflowService(this.state);
    this.complianceService = new ComplianceService(this.state);
    this.eventHandlers = new GovernanceEventHandlers(eventPlatform, this);
  }

  static getInstance(
    workspaceRuntime: WorkspaceRuntime,
    eventPlatform: EventPlatform,
    statePlatform: StatePlatform
  ): GovernanceRuntime {
    if (!GovernanceRuntime.instance) {
      GovernanceRuntime.instance = new GovernanceRuntime(workspaceRuntime, eventPlatform, statePlatform);
    }
    return GovernanceRuntime.instance;
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
    const dummyPolicies = [
      { id: 'pol-1', name: 'Data Access Policy', description: 'Controls access to sensitive data', category: 'security', status: 'active' as const, effectiveDate: '2024-01-01', metadata: {} },
    ];
    const dummyDecisions = [
      { id: 'dec-1', title: 'Approve New Trading Strategy', description: 'Review of algorithmic strategy', status: 'pending' as const, decisionMaker: 'compliance-officer', timestamp: Date.now() },
    ];
    const dummyApprovals = [
      { id: 'app-1', requestId: 'req-1', approver: 'manager', status: 'pending' as const, timestamp: Date.now() },
    ];
    const dummyWorkflows = [
      { id: 'wf-1', type: 'policy-review', state: 'in-review' as const, initiator: 'user1', createdAt: Date.now(), updatedAt: Date.now(), metadata: {} },
    ];
    const dummyCompliance = [
      { id: 'comp-1', regulation: 'GDPR', status: 'compliant' as const, evidence: ['audit-1'], lastAudit: Date.now() },
    ];
    const dummyAudits = [
      { id: 'aud-1', action: 'policy-created', actor: 'admin', timestamp: Date.now(), details: { policy: 'pol-1' } },
    ];

    this.state.updateContext({
      policies: dummyPolicies as any,
      decisions: dummyDecisions as any,
      approvals: dummyApprovals as any,
      workflows: dummyWorkflows as any,
      compliance: dummyCompliance as any,
      audits: dummyAudits as any,
      workspaceId,
    });
  }

  unbindFromWorkspace(): void {
    this.state.updateContext({ workspaceId: null });
  }

  // Public API
  getGovernanceContext(): GovernanceContext {
    return this.state.getContext();
  }

  getPolicies() {
    return this.governanceService.getPolicies();
  }

  getDecisions() {
    return this.governanceService.getDecisions();
  }

  getApprovals() {
    return this.governanceService.getApprovals();
  }

  getWorkflows() {
    return this.governanceService.getWorkflows();
  }

  getCompliance() {
    return this.governanceService.getCompliance();
  }

  getAudits() {
    return this.governanceService.getAudits();
  }

  getDiagnostics() {
    return {
      runtime: {
        initialized: this.initialized,
        active: this.active,
        workspace: this.state.getContext().workspaceId,
      },
      state: this.state.getDiagnostics(),
      governance: this.governanceService.getDiagnostics(),
      policy: this.policyService.getDiagnostics(),
      approval: this.approvalService.getDiagnostics(),
      workflow: this.workflowService.getDiagnostics(),
      compliance: this.complianceService.getDiagnostics(),
      events: this.eventHandlers.getDiagnostics(),
    };
  }

  private loadDefaultData(): void {
    // This can be extended to load from configuration
  }
}
