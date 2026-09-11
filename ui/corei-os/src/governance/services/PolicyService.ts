// src/governance/services/PolicyService.ts
/**
 * COREI – Policy Service
 * Stage-25 / Phase-24
 */
import { GovernanceState } from '../state/GovernanceState';
import { GovernancePolicy } from '../models/GovernanceModels';

export class PolicyService {
  private state: GovernanceState;

  constructor(state: GovernanceState) {
    this.state = state;
  }

  getActivePolicies(): GovernancePolicy[] {
    return this.state.getContext().policies.filter(p => p.status === 'active');
  }

  getPolicy(id: string): GovernancePolicy | undefined {
    return this.state.getContext().policies.find(p => p.id === id);
  }

  getDiagnostics() {
    return {
      service: 'PolicyService',
      activePolicies: this.getActivePolicies().length,
    };
  }
}
