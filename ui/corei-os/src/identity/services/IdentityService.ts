// src/identity/services/IdentityService.ts
/**
 * COREI – Identity Service
 * Stage-25 / Phase-23
 */
import { Operator, Role, Permission, WorkspaceProfile } from '../models/IdentityModels';
import { IdentityState } from '../state/IdentityState';
import { WorkspaceRuntime } from '../types';

export class IdentityService {
  private state: IdentityState;
  private workspaceRuntime: WorkspaceRuntime;

  constructor(state: IdentityState, workspaceRuntime: WorkspaceRuntime) {
    this.state = state;
    this.workspaceRuntime = workspaceRuntime;
  }

  getCurrentOperator(): Operator | null {
    return this.state.getContext().operator;
  }

  getCurrentRole(): Role | null {
    return this.state.getContext().role;
  }

  getEffectivePermissions(): Permission[] {
    return this.state.getContext().permissions;
  }

  resolveWorkspaceProfile(operatorId: string, workspaceId: string): WorkspaceProfile | null {
    // In a real system, this would fetch from a store or API
    // For now, return a default
    return {
      id: 'default-profile',
      operatorId,
      workspaceId,
      roleId: 'default-role',
      settings: {},
    };
  }

  getDiagnostics() {
    return {
      service: 'IdentityService',
      operator: this.getCurrentOperator()?.username || 'none',
      role: this.getCurrentRole()?.name || 'none',
      permissions: this.getEffectivePermissions().length,
    };
  }
}
