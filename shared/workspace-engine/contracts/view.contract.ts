import type { PanelContract } from "./panel.contract";

export interface ViewContract {
  view_id: string;

  domain_id: string;

  title: string;

  route: string;

  icon: string;

  classification:
    | "internal"
    | "confidential"
    | "restricted";

  permissions: string[];

  panels: PanelContract[];
}
