// src/identity/runtime/IdentityRuntime.ts
/**
 * COREI – Identity Runtime
 * Stage-25 / Phase-23
 */
import { WorkspaceRuntime, EventPlatform, StatePlatform } from '../types';
import { IdentityState } from '../state/IdentityState';
import { IdentityService } from '../services/IdentityService';
import { OrganizationService } from '../services/OrganizationService';
import { RoleService } from '../services/RoleService';
import { IdentityEventHandlers } from '../events/IdentityEventHandlers';
import { IdentityContext, Operator, Role, Permission, WorkspaceProfile } from '../models/IdentityModels';

export class IdentityRuntime {
  private static instance: IdentityRuntime;
  private workspaceRuntime: WorkspaceRuntime;
  private eventPlatform: EventPlatform;
  private statePlatform: StatePlatform;
  private state: IdentityState;
  private identityService: IdentityService;
  private organizationService: OrganizationService;
  private roleService: RoleService;
  private eventHandlers: IdentityEventHandlers;
  private initialized: boolean = false;
  private active: boolean = false;

  private constructor(
    workspaceRuntime: WorkspaceRuntime,
    eventPlatform: EventPlatform,
    statePlatform: StatePlatform
  ) {
    this.workspaceRuntime = workspaceRuntime;
    this.eventPlatform = eventPlatform;
    this.statePlatform = statePlatform;
    this.state = new IdentityState(statePlatform);
    this.identityService = new IdentityService(this.state, workspaceRuntime);
    this.organizationService = new OrganizationService(this.state);
    this.roleService = new RoleService(this.state);
    this.eventHandlers = new IdentityEventHandlers(eventPlatform, this);
  }

  static getInstance(
    workspaceRuntime: WorkspaceRuntime,
    eventPlatform: EventPlatform,
    statePlatform: StatePlatform
  ): IdentityRuntime {
    if (!IdentityRuntime.instance) {
      IdentityRuntime.instance = new IdentityRuntime(workspaceRuntime, eventPlatform, statePlatform);
    }
    return IdentityRuntime.instance;
  }

  // Lifecycle
  initialize(): void {
    if (this.initialized) return;
    this.state.initialize();
    this.eventHandlers.register();
    // Load default context (dummy for now)
    this.loadDefaultContext();
    this.initialized = true;
  }

  activate(): void {
    if (!this.initialized) throw new Error('Runtime not initialized');
    if (this.active) return;
    this.active = true;
    this.refresh();
  }

  refresh(): void {
    if (!this.active) return;
    const workspace = this.workspaceRuntime.getActiveWorkspace();
    if (workspace) {
      this.bindToWorkspace(workspace.id);
    }
  }

  suspend(): void {
    this.active = false;
    this.eventHandlers.suspend();
  }

  resume(): void {
    if (!this.initialized) return;
    this.active = true;
    this.eventHandlers.resume();
    this.refresh();
  }

  dispose(): void {
    this.eventHandlers.unregister();
    this.state.clear();
    this.initialized = false;
    this.active = false;
  }

  // Workspace binding
  bindToWorkspace(workspaceId: string): void {
    // In a real system, fetch operator and organization from an external source
    // For now, we set dummy data
    const dummyOperator: Operator = {
      id: 'op-1',
      username: 'operator',
      displayName: 'Default Operator',
      email: 'operator@corei.local',
      teamId: 'team-1',
      active: true,
    };
    const dummyRole: Role = {
      id: 'role-1',
      name: 'Trader',
      description: 'Can execute trades',
      permissions: ['trade:execute', 'view:market'],
    };
    const dummyPermissions: Permission[] = [
      { id: 'perm-1', name: 'trade:execute', resource: 'trade', action: 'execute' },
      { id: 'perm-2', name: 'view:market', resource: 'market', action: 'view' },
    ];
    const profile = this.identityService.resolveWorkspaceProfile(dummyOperator.id, workspaceId);
    this.state.updateContext({
      operator: dummyOperator,
      role: dummyRole,
      permissions: dummyPermissions,
      workspaceProfile: profile,
      workspaceId,
    });
  }

  unbindFromWorkspace(): void {
    this.state.updateContext({ workspaceId: null });
  }

  // Public API
  getIdentityContext(): IdentityContext {
    return this.state.getContext();
  }

  getInstitution() {
    return this.state.getContext().institution;
  }

  getOrganization() {
    return this.state.getContext().organization;
  }

  getTeam() {
    return this.state.getContext().team;
  }

  getOperator() {
    return this.state.getContext().operator;
  }

  getRole() {
    return this.state.getContext().role;
  }

  getPermissions() {
    return this.state.getContext().permissions;
  }

  getWorkspaceProfile() {
    return this.state.getContext().workspaceProfile;
  }

  getDiagnostics() {
    return {
      runtime: {
        initialized: this.initialized,
        active: this.active,
        workspace: this.state.getContext().workspaceId,
      },
      state: this.state.getDiagnostics(),
      identity: this.identityService.getDiagnostics(),
      organization: this.organizationService.getDiagnostics(),
      role: this.roleService.getDiagnostics(),
      events: this.eventHandlers.getDiagnostics(),
    };
  }

  private loadDefaultContext(): void {
    // This can be extended to load from configuration or external provider
  }
}
