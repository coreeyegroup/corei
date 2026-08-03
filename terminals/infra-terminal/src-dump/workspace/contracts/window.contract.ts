export type WindowType =

  | "desktop"
  | "workspace";


export type WindowMode =

  | "tab"
  | "split"
  | "floating";


export interface WindowPosition {

  x: number;

  y: number;

}


export interface WindowSize {

  width: number;

  height: number;

}


export interface WindowContract {


  /*
  ========================================
  IDENTITY
  ========================================
  */

  window_id: string;

  template_id: string;

  title: string;

  view_id: string;


  /*
  ========================================
  OWNERSHIP
  ========================================
  */

  domain_id: string;

  parent_window_id:
    string | null;


  /*
  ========================================
  WINDOW CLASSIFICATION
  ========================================
  */

  window_type:
    WindowType;


  mode:
    WindowMode;


  /*
  ========================================
  WINDOW STATE
  ========================================
  */

  instance_number: number;

  dirty: boolean;

  pinned: boolean;

  active: boolean;


  /*
  ========================================
  FLOAT / SPLIT SUPPORT
  ========================================
  */

  position:
    WindowPosition;


  size:
    WindowSize;


  z_index:
    number;


  /*
  ========================================
  AUDIT
  ========================================
  */

  created_at:
    string;

  updated_at:
    string;

}
