export interface DesktopWindowContract {

  /*
  ========================================
  IDENTITY
  ========================================
  */

  template_id: string;

  window_id: string;

  title: string;

  description: string;

  view_id: string;

  icon: string;


  /*
  ========================================
  DEFAULT WINDOW SIZE
  ========================================
  */

  default_width: number;

  default_height: number;

}
