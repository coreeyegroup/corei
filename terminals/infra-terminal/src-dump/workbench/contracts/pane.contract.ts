export interface PaneContract {

  pane_id: string;

  workspace_id: string;

  title: string;

  detached: boolean;

  floating: boolean;

  dock_zone:
    | "main"
    | "left"
    | "right"
    | "bottom";

  x: number;

  y: number;

  width: number;

  height: number;

}