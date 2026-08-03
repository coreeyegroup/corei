export interface PermissionContract {
  permission_id: string;

  resource: string;

  action:
    | "view"
    | "create"
    | "update"
    | "delete"
    | "approve"
    | "execute"
    | "rollback"
    | "replay"
    | "governance_approve"
    | "governance_reject";

  description: string;
}
