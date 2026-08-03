export interface DataTableContract {
  widget_id: string;

  resource_id: string;

  columns: string[];

  sorting: boolean;

  filtering: boolean;

  selection: boolean;

  export_enabled: boolean;

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
