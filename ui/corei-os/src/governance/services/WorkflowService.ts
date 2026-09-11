// src/governance/services/WorkflowService.ts
/**
 * COREI – Workflow Service
 * Stage-25 / Phase-24
 */
import { GovernanceState } from '../state/GovernanceState';
import { GovernanceWorkflow } from '../models/GovernanceModels';

export class WorkflowService {
  private state: GovernanceState;

  constructor(state: GovernanceState) {
    this.state = state;
  }

  getActiveWorkflows(): GovernanceWorkflow[] {
    return this.state.getContext().workflows.filter(w => w.state !== 'closed');
  }

  getWorkflow(id: string): GovernanceWorkflow | undefined {
    return this.state.getContext().workflows.find(w => w.id === id);
  }

  getDiagnostics() {
    return {
      service: 'WorkflowService',
      active: this.getActiveWorkflows().length,
    };
  }
}
