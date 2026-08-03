import type { WorkspaceType } from "../types/workspace-type";
import type { LayoutContract } from "./layout.contract";

export interface WorkspaceContract {
  workspace_id: string;

  workspace_type: WorkspaceType;

  name: string;

  active_layout_id: string;

  layouts: LayoutContract[];

  user_id: string;

  persona_id: string;

  shared: boolean;

  locked: boolean;

  version: string;

  created_at: string;

  updated_at: string;
}
