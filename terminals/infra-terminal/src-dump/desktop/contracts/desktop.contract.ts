import type {
  DesktopWindowContract
}
from "./desktop-window.contract";

export interface DesktopContract {

  desktop_id: string;

  domain_id: string;

  title: string;

  icon: string;

  windows:
    DesktopWindowContract[];
}
