export interface WindowContract {
  window_id: string;

  title: string;

  workspace_id: string;

  view_id: string;

  resource_id: string | null;

  resource_type: string | null;

  dirty: boolean;

  pinned: boolean;
}

export const windowState = {
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
  ] as WindowContract[]
};

export const layoutRegistry = {
  focused: {
    layout_id: "focused"
  }
};
