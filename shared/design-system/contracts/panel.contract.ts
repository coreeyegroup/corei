export interface PanelAction {
  action_id: string;

  label: string;
}

export interface PanelContract {
  widget_id: string;

  header: string;

  footer: string | null;

  actions: PanelAction[];

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
}
