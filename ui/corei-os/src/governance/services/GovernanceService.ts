// src/governance/services/GovernanceService.ts
/**
 * COREI – Governance Core Service
 * Stage-25 / Phase-24
 */
import { GovernanceState } from '../state/GovernanceState';
import { GovernancePolicy, GovernanceDecision, GovernanceApproval, GovernanceWorkflow, GovernanceCompliance, GovernanceAudit } from '../models/GovernanceModels';

export class GovernanceService {
  private state: GovernanceState;

  constructor(state: GovernanceState) {
    this.state = state;
  }

  getPolicies(): GovernancePolicy[] {
    return this.state.getContext().policies;
  }

  getDecisions(): GovernanceDecision[] {
    return this.state.getContext().decisions;
  }

  getApprovals(): GovernanceApproval[] {
    return this.state.getContext().approvals;
  }

  getWorkflows(): GovernanceWorkflow[] {
    return this.state.getContext().workflows;
  }

  getCompliance(): GovernanceCompliance[] {
    return this.state.getContext().compliance;
  }

  getAudits(): GovernanceAudit[] {
    return this.state.getContext().audits;
  }

  getDiagnostics() {
    return {
      service: 'GovernanceService',
      policies: this.getPolicies().length,
      decisions: this.getDecisions().length,
      approvals: this.getApprovals().length,
      workflows: this.getWorkflows().length,
    };
  }
}
