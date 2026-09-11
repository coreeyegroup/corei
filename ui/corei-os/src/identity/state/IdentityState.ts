// src/identity/state/IdentityState.ts
/**
 * COREI – Identity State
 * Stage-25 / Phase-23
 */
import { StatePlatform } from '../types';
import { IdentityContext, Institution, Organization, Team, Operator, Role, Permission, WorkspaceProfile } from '../models/IdentityModels';

export class IdentityState {
  private statePlatform: StatePlatform;
  private context: IdentityContext;
  private readonly CONTEXT_KEY = 'identity.context';

  constructor(statePlatform: StatePlatform) {
    this.statePlatform = statePlatform;
    this.context = this.createEmptyContext();
  }

  private createEmptyContext(): IdentityContext {
    return {
      institution: null,
      organization: null,
      businessUnit: null,
      department: null,
      team: null,
      operator: null,
      role: null,
      permissions: [],
      workspaceProfile: null,
      workspaceId: null,
    };
  }

  initialize(): void {
    const saved = this.statePlatform.getState(this.CONTEXT_KEY);
    if (saved) {
      this.context = { ...this.createEmptyContext(), ...saved };
    }
  }

  getContext(): IdentityContext {
    return this.context;
  }

  updateContext(partial: Partial<IdentityContext>): void {
    this.context = { ...this.context, ...partial };
    this.statePlatform.setState(this.CONTEXT_KEY, this.context);
  }

  clear(): void {
    this.context = this.createEmptyContext();
    this.statePlatform.setState(this.CONTEXT_KEY, null);
  }

  getDiagnostics() {
    return {
      hasContext: !!this.context.operator,
      workspaceId: this.context.workspaceId,
      role: this.context.role?.name || null,
    };
  }
}
