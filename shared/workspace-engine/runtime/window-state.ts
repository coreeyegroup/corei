import type { WindowContract }
from "../contracts/window.contract";

export interface WindowState {
  active_window_id: string;

  windows: WindowContract[];
}

export const windowState:
WindowState = {

  active_window_id: "overview",

  windows: [
    {
      window_id: "overview",

      title: "overview.workspace",

      workspace_id: "infra",

      view_id: "cluster-overview",

      resource_id: null,

      resource_type: null,

      dirty: false,

      pinned: true
    }
  ]
};
