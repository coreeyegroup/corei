import type { RoleContract } from "../contracts/role.contract";
import type { PermissionContract } from "../contracts/permission.contract";
import type { ResourceContract } from "../contracts/resource.contract";
import type { PolicyContract } from "../contracts/policy.contract";

export interface AuthorizationState {
  roles: RoleContract[];

  permissions: PermissionContract[];

  resources: ResourceContract[];

  policies: PolicyContract[];
}
