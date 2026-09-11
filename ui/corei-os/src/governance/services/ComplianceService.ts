// src/governance/services/ComplianceService.ts
/**
 * COREI – Compliance Service
 * Stage-25 / Phase-24
 */
import { GovernanceState } from '../state/GovernanceState';
import { GovernanceCompliance } from '../models/GovernanceModels';

export class ComplianceService {
  private state: GovernanceState;

  constructor(state: GovernanceState) {
    this.state = state;
  }

  getComplianceStatus(): GovernanceCompliance[] {
    return this.state.getContext().compliance;
  }

  getNonCompliant(): GovernanceCompliance[] {
    return this.state.getContext().compliance.filter(c => c.status === 'non-compliant');
  }

  getDiagnostics() {
    return {
      service: 'ComplianceService',
      total: this.getComplianceStatus().length,
      nonCompliant: this.getNonCompliant().length,
    };
  }
}
