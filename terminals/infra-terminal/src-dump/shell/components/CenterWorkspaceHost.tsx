import {
  DesktopRenderer
}
from "../../desktop/renderers/DesktopRenderer";

import {
  WorkspaceTabs
}
from "../../workspace/components/WorkspaceTabs";

import {
  WorkspaceLauncher
}
from "../../workspace/components/WorkspaceLauncher";

import {
  LayoutRenderer
}
from "../../workspace/renderers/LayoutRenderer";

import {
  useWindowStore
}
from "../../workspace/store/window-store";

export function CenterWorkspaceHost() {

  const {
    windows
  } =
    useWindowStore();

  if (
    windows.length === 0
  ) {

    return (

      <div className="center-workspace-host">

        <DesktopRenderer />

      </div>

    );
  }

  return (

    <div className="center-workspace-host">

      <div className="workspace-tab-layer">

        <WorkspaceTabs />

        <WorkspaceLauncher />

      </div>

      <LayoutRenderer />

    </div>

  );

}