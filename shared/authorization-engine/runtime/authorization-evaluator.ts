import type { AuthorizationState } from "./authorization-state";

export function hasPermission(
  state: AuthorizationState,
  roleId: string,
  permissionId: string,
  resourceId: string
): boolean {
  return state.policies.some(
    (policy) =>
      policy.role_id === roleId &&
      policy.permission_id === permissionId &&
      policy.resource_id === resourceId
  );
}
