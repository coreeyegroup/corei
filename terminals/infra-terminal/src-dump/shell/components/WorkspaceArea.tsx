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

export function WorkspaceArea() {

  return (

    <main className="workspace-area">

      <WorkspaceTabs />

      <WorkspaceLauncher />

      <LayoutRenderer />

    </main>

  );

}
