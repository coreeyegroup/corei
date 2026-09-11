// src/governance/state/GovernanceState.ts
/**
 * COREI – Governance State
 * Stage-25 / Phase-24
 */
import { StatePlatform } from '../types';
import { GovernanceContext, GovernancePolicy, GovernanceDecision, GovernanceApproval, GovernanceWorkflow, GovernanceCompliance, GovernanceAudit } from '../models/GovernanceModels';

export class GovernanceState {
  private statePlatform: StatePlatform;
  private context: GovernanceContext;
  private readonly CONTEXT_KEY = 'governance.context';

  constructor(statePlatform: StatePlatform) {
    this.statePlatform = statePlatform;
    this.context = this.createEmptyContext();
  }

  private createEmptyContext(): GovernanceContext {
    return {
      policies: [],
      decisions: [],
      approvals: [],
      workflows: [],
      compliance: [],
      audits: [],
      workspaceId: null,
    };
  }

  initialize(): void {
    const saved = this.statePlatform.getState(this.CONTEXT_KEY);
    if (saved) {
      this.context = { ...this.createEmptyContext(), ...saved };
    }
  }

  getContext(): GovernanceContext {
    return this.context;
  }

  updateContext(partial: Partial<GovernanceContext>): void {
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
      policyCount: this.context.policies.length,
      decisionCount: this.context.decisions.length,
      approvalCount: this.context.approvals.length,
    };
  }
}
