export interface AuditEntryContract {
  audit_id: string;

  parent_audit_id: string | null;

  actor_id: string;

  actor_role: string;

  terminal_scope:
    | "infra"
    | "trading"
    | "risk"
    | "executive"
    | "research"
    | "compliance";

  resource_id: string;

  resource_type: string;

  classification:
    | "internal"
    | "confidential"
    | "restricted";

  action: string;

  outcome:
    | "success"
    | "failure"
    | "rejected"
    | "cancelled";

  timestamp: string;

  correlation_id: string | null;

  retention_policy: string;

  metadata: Record<string, unknown>;
}
