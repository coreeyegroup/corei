// src/governance/services/ApprovalService.ts
/**
 * COREI – Approval Service
 * Stage-25 / Phase-24
 */
import { GovernanceState } from '../state/GovernanceState';
import { GovernanceApproval } from '../models/GovernanceModels';

export class ApprovalService {
  private state: GovernanceState;

  constructor(state: GovernanceState) {
    this.state = state;
  }

  getPendingApprovals(): GovernanceApproval[] {
    return this.state.getContext().approvals.filter(a => a.status === 'pending');
  }

  getApproval(id: string): GovernanceApproval | undefined {
    return this.state.getContext().approvals.find(a => a.id === id);
  }

  getDiagnostics() {
    return {
      service: 'ApprovalService',
      pending: this.getPendingApprovals().length,
    };
  }
}
