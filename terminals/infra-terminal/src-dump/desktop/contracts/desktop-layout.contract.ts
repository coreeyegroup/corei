export interface DesktopLayoutItemContract {

  window_id: string;

  grid_x: number;

  grid_y: number;

  grid_w: number;

  grid_h: number;

}


export interface DesktopLayoutContract {

  desktop_id: string;

  items:
    DesktopLayoutItemContract[];

}