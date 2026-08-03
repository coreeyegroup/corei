import type { LayoutMode } from "../types/layout-mode";
import type { ViewContract } from "./view.contract";

export interface LayoutContract {
  layout_id: string;

  layout_mode: LayoutMode;

  terminal_type:
    | "infra"
    | "trading"
    | "risk"
    | "executive"
    | "research"
    | "compliance";

  name: string;

  version: string;

  views: ViewContract[];
}
