import type { AuditEntryContract } from "../contracts/audit-entry.contract";

export interface AuditState {
  entries: AuditEntryContract[];

  total_entries: number;

  last_updated_at: string | null;
}
