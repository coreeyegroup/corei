// src/compliance/state/ComplianceState.ts
/**
 * COREI – Compliance State
 * Stage-25 / Phase-25
 */
import { StatePlatform } from '../types';
import { ComplianceContext, ComplianceControl, ComplianceObligation, ComplianceEvidence, ComplianceException, ComplianceMonitoring, ComplianceReport } from '../models/ComplianceModels';

export class ComplianceState {
  private statePlatform: StatePlatform;
  private context: ComplianceContext;
  private readonly CONTEXT_KEY = 'compliance.context';

  constructor(statePlatform: StatePlatform) {
    this.statePlatform = statePlatform;
    this.context = this.createEmptyContext();
  }

  private createEmptyContext(): ComplianceContext {
    return {
      controls: [],
      obligations: [],
      evidence: [],
      exceptions: [],
      monitoring: [],
      reports: [],
      workspaceId: null,
    };
  }

  initialize(): void {
    const saved = this.statePlatform.getState(this.CONTEXT_KEY);
    if (saved) {
      this.context = { ...this.createEmptyContext(), ...saved };
    }
  }

  getContext(): ComplianceContext {
    return this.context;
  }

  updateContext(partial: Partial<ComplianceContext>): void {
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
      controls: this.context.controls.length,
      obligations: this.context.obligations.length,
      evidence: this.context.evidence.length,
      exceptions: this.context.exceptions.length,
    };
  }
}
