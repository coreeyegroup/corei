export interface PlatformStateContract {
  platform_health:
    | "healthy"
    | "warning"
    | "critical";

  contract_health:
    | "healthy"
    | "warning"
    | "critical";

  replay_health:
    | "healthy"
    | "warning"
    | "critical";

  updated_at: string;
}
