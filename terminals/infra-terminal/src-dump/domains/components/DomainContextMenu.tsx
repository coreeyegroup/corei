import {
  useDomainContextMenu
}
from "../store/domain-context-menu.store";

import {
  openDomainInTab,
  openDomainInWindow
}
from "../services/domain-launch.service";

import {
  useWindowStore
}
from "../../workspace/store/window-store";

export function DomainContextMenu() {

  const {
    menu,
    closeMenu
  } =
    useDomainContextMenu();

  const {
    openWindow
  } =
    useWindowStore();

  if (!menu.visible) {

    return null;

  }

  return (

    <div

      className="domain-context-menu"

      style={{
        left: menu.x,
        top: menu.y
      }}

      onMouseLeave={
        closeMenu
      }

    >

      <div
        className="domain-context-item"
        onClick={() => {

          openWindow(
            `${menu.domain_id}-desktop`,
            `${menu.domain_id.toUpperCase()} Desktop`,
            `${menu.domain_id}-desktop`,
            menu.domain_id
          );

          closeMenu();

        }}
      >
        Open
      </div>

      <div
        className="domain-context-item"
        onClick={() => {

          openDomainInTab(
            menu.domain_id
          );

          closeMenu();

        }}
      >
        Open in New Tab
      </div>

      <div
        className="domain-context-item"
        onClick={() => {

          openDomainInWindow(
            menu.domain_id
          );

          closeMenu();

        }}
      >
        Open in New Window
      </div>

    </div>

  );

}
