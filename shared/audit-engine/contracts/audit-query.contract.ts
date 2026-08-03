export interface AuditQueryContract {
  actor_id?: string;

  resource_id?: string;

  terminal_scope?: string;

  classification?: string;

  action?: string;

  outcome?: string;

  correlation_id?: string;

  from_timestamp?: string;

  to_timestamp?: string;
}
