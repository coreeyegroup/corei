export interface MetricContract {
  widget_id: string;

  resource_id: string;

  title: string;

  value: string | number;

  status:
    | "healthy"
    | "warning"
    | "critical"
    | "unknown";

  trend:
    | "up"
    | "down"
    | "stable"
    | "unknown";

  timestamp: string;

  permissions: string[];

  classification:
    | "internal"
    | "confidential"
    | "restricted";

  refresh_policy:
    | "realtime"
    | "5s"
    | "15s"
    | "30s"
    | "manual";

  deep_link: string | null;
}
