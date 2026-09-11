// src/identity/services/RoleService.ts
/**
 * COREI – Role & Permission Service
 * Stage-25 / Phase-23
 */
import { Role, Permission } from '../models/IdentityModels';
import { IdentityState } from '../state/IdentityState';

export class RoleService {
  private state: IdentityState;

  constructor(state: IdentityState) {
    this.state = state;
  }

  getCurrentRole(): Role | null {
    return this.state.getContext().role;
  }

  getEffectivePermissions(): Permission[] {
    return this.state.getContext().permissions;
  }

  hasPermission(permissionName: string): boolean {
    return this.state.getContext().permissions.some(p => p.name === permissionName);
  }

  getDiagnostics() {
    return {
      service: 'RoleService',
      role: this.getCurrentRole()?.name || 'none',
      permissionCount: this.getEffectivePermissions().length,
    };
  }
}
