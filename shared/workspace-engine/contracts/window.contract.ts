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
