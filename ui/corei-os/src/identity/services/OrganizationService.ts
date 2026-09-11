// src/identity/services/OrganizationService.ts
/**
 * COREI – Organization Service
 * Stage-25 / Phase-23
 */
import { Institution, Organization, BusinessUnit, Department, Team } from '../models/IdentityModels';
import { IdentityState } from '../state/IdentityState';

export class OrganizationService {
  private state: IdentityState;

  constructor(state: IdentityState) {
    this.state = state;
  }

  getCurrentInstitution(): Institution | null {
    return this.state.getContext().institution;
  }

  getCurrentOrganization(): Organization | null {
    return this.state.getContext().organization;
  }

  getCurrentBusinessUnit(): BusinessUnit | null {
    return this.state.getContext().businessUnit;
  }

  getCurrentDepartment(): Department | null {
    return this.state.getContext().department;
  }

  getCurrentTeam(): Team | null {
    return this.state.getContext().team;
  }

  getDiagnostics() {
    const ctx = this.state.getContext();
    return {
      service: 'OrganizationService',
      institution: ctx.institution?.name || 'none',
      organization: ctx.organization?.name || 'none',
      team: ctx.team?.name || 'none',
    };
  }
}
