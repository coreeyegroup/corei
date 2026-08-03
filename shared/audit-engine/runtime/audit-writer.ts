import type { AuditEntryContract } from "../contracts/audit-entry.contract";
import { auditRegistry } from "../registry/audit-registry";

export function writeAudit(
  entry: AuditEntryContract
): void {
  auditRegistry.push(entry);
}
