export interface WorkspaceStateContract {
  workspace_id: string;

  layout_id: string;

  layout_mode:
    | "focused"
    | "split"
    | "quad"
    | "desk"
    | "noc";

  active_view_id: string;

  context_panel_open: boolean;

  bottom_terminal_open: boolean;

  updated_at: string;
}
