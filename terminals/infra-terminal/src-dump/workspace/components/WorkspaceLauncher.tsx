import {
  workspaceCatalog
}
from "../catalog/workspace-catalog";

import {
  useLauncher
}
from "../store/launcher-store";

import {
  useWindowStore
}
from "../store/window-store";

export function WorkspaceLauncher() {

  const {
    open,
    hide
  } = useLauncher();

  const {
    openWindow
  } = useWindowStore();

  if (!open) {
    return null;
  }

  return (

    <div className="workspace-launcher">

      {workspaceCatalog.map(
        template => (

          <div
            key={
              template.template_id
            }
            className="launcher-item"
            onClick={() => {

              openWindow(
                template.template_id,
                template.title,
                template.view_id
              );

              hide();
            }}
          >

            {template.icon}
            {" "}
            {template.title}

          </div>

        )
      )}

    </div>

  );
}
