export type StatusValue =
  | "healthy"
  | "warning"
  | "critical"
  | "unknown";

export interface StatusBadgeContract {
  status: StatusValue;
  label: string;
}
