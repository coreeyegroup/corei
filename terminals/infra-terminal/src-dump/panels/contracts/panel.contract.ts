export interface PanelContract {

  panel_id: string;

  title: string;

  widget_ids: string[];

  classification?:
    | "internal"
    | "confidential"
    | "restricted";
}
