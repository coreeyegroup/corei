export interface ResourceContract {
  resource_id: string;

  resource_name: string;

  terminal_scope:
    | "infra"
    | "trading"
    | "risk"
    | "executive"
    | "research"
    | "compliance";

  classification:
    | "internal"
    | "confidential"
    | "restricted";

  resource_type:
    | "terminal"
    | "domain"
    | "workspace"
    | "view"
    | "panel"
    | "widget"
    | "action";
}
