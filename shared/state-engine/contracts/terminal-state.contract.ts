export interface TerminalStateContract {
  terminal_id: string;

  terminal_type:
    | "infra"
    | "trading"
    | "risk"
    | "executive"
    | "research"
    | "compliance";

  environment:
    | "development"
    | "staging"
    | "production";

  region: string;

  active_workspace_id: string;

  active_view_id: string;

  density_mode:
    | "compact"
    | "standard"
    | "comfortable";

  updated_at: string;
}
